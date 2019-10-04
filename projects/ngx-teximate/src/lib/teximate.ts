import {
  Component,
  Input,
  Output,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TeximatePlayer } from './teximate-player';
import { TeximateAnimationSelector, TeximateTimeline } from './teximate.model';
import { teximateFactory } from './utilities';
import { TeximateManager } from './teximate-manager';

@Component({
  selector: 'teximate',
  host: {
    '[class.playing]': 'isPlaying'
  },
  template: `
    <p #text *ngFor="let paragraph of (state | async).content; index as i" class="tx-paragraph tx-paragraph-{{i}}">
      <span *ngFor="let word of paragraph; index as j" class="tx-word tx-word-{{j}}">
        <span *ngFor="let letter of word; index as k" class="tx-letter tx-letter-{{k}}">{{letter}}</span>
      </span>
    </p>
  `,
  styles: [`
    :host {
      overflow: hidden;
    }
    .tx-word,
    .tx-letter {
      display: inline-block;
    }

    .tx-word {
      margin-right: 8px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Teximate implements AfterViewInit, OnChanges, OnDestroy {

  @Input() content: string;

  @Input() animation = this.manager.globalOptions.animation;
  @Input() selector: TeximateAnimationSelector = this.manager.globalOptions.selector;
  @Input() type: 'enter' | 'leave' | 'default' = this.manager.globalOptions.type;
  @Input() delay: number = this.manager.globalOptions.delay;
  @Input() autoPlay: boolean = this.manager.globalOptions.autoPlay;

  // Stream that emits when animation is started
  @Output('play') playEmitter = new EventEmitter();

  // Stream that emits when animation is done
  @Output('finish') finishEmitter = new EventEmitter();

  // Text changes
  @ViewChildren('content') private _contentQueryList !: QueryList<ElementRef>;

  // Teximate player: initialized right before playing and destroyed after its done
  private _player = new TeximatePlayer(this._animationBuilder, this._el.nativeElement);

  // Stream that emits when teximate state changes
  private readonly _state = new BehaviorSubject<TeximateTimeline>({
    content: [],
    type: 'letter',
    isPlaying: false
  });
  readonly state: Observable<TeximateTimeline> = this._state.asObservable();

  private _destroy = new Subject();

  // Teximate playing state
  get isPlaying(): boolean {
    return this._state.value.isPlaying;
  }

  // get totalTime(): number {
  //   return this._player.totalTime;
  // }

  constructor(private manager: TeximateManager, private _animationBuilder: AnimationBuilder, private _el: ElementRef) {
  }

  ngAfterViewInit() {
    // Notify when a new text has rendered to is ready to play
    this._contentQueryList.notifyOnChanges();
    this._contentQueryList.changes.pipe(takeUntil(this._destroy)).subscribe(() => this.onContentChanges());

    // Update state for the first time
    this.updateState({
      type: this.selector,
      isPlaying: false,
      content: teximateFactory(this.content, this.selector)
    });

    this._player.onStart.pipe(takeUntil(this._destroy)).subscribe(() => this.playEmitter.emit());
    this._player.onEnd.pipe(takeUntil(this._destroy)).subscribe(() => this.finishEmitter.emit());
  }

  ngOnChanges() {
    /**
     * When inputs changes, we update the state, but we don't play the animation yet.
     * We use _teximateContent.changes stream to make sure the text has been rendered in the view before playing the animation.
     */
    if (this._player) {
      this.updateState({
        type: this.selector,
        isPlaying: false,
        content: teximateFactory(this.content, this.selector)
      });
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
    this._player.destroy();
    this._state.complete();
  }

  private updateState(state: TeximateTimeline) {
    this._state.next({ ...this._state.value, ...state });
  }

  private onContentChanges() {
    this._player.createPlayer({
      delay: this.delay,
      selector: this.selector,
      animation: this.animation
    });
    if (this.autoPlay) {
      this.play();
    }
  }

  play() {
    this._player.createPlayer({
      delay: this.delay,
      selector: this.selector,
      animation: this.animation
    });
    this._player.play();
  }

  stop() {
    this._player.stop();
  }

  //
  // getPosition(): number {
  //   return this._player.getPosition();
  // }
  //
  // setPosition(position: number): void {
  //   this._player.setPosition(position);
  // }
}
