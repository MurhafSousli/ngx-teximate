import {
  Component,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  NgZone,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  style,
  query,
  stagger,
  useAnimation,
  AnimationPlayer,
  AnimationBuilder,
  AnimationFactory
} from '@angular/animations';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { teximateFactory } from './teximate.factory';
import { Paragraph, PlayerConfig, TextAnimation } from './teximate.model';

@Component({
  selector: 'teximate',
  host: {
    'aria-label': 'text'
  },
  templateUrl: './teximate.html',
  styleUrls: ['./teximate.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Teximate implements AfterViewInit, OnDestroy {

  /** Set text */
  @Input('text') set setText(text: string) {
    this._state.next(text);
  }

  /** Animation that triggers on init */
  @Input() enterAnimation: TextAnimation;

  /** Animation that triggers on destroy */
  @Input() leaveAnimation: TextAnimation;

  /** Animation that triggers with the play() function */
  @Input() animation: TextAnimation;

  /** Stream that emits when a paragraph is clicked */
  @Output() paragraphClick = new EventEmitter();

  /** Stream that emits when a word is clicked */
  @Output() wordClick = new EventEmitter();

  /** Stream that emits when a letter is clicked */
  @Output() letterClick = new EventEmitter();

  /** Stream that emits when animation is started */
  @Output() start = new EventEmitter();

  /** Stream that emits when animation is done */
  @Output() done = new EventEmitter();

  /** Text wrapper */
  @ViewChild('textWrapper') textWrapper: ElementRef;

  /** Teximate state */
  private _state = new BehaviorSubject<string>('');
  state: Observable<Paragraph[]>;

  /** Teximate playing state */
  private _isPlaying: boolean;
  get isPlaying() {
    return this._isPlaying;
  }

  /** Teximate animations */
  players = new Map<string, AnimationPlayer>();

  constructor(private animationBuilder: AnimationBuilder, private zone: NgZone) {
    this.state = this._state.pipe(map((text: string) => teximateFactory(text)));
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      if (this.enterAnimation) {
        const enterAnimation = this.registerAnimation({...this.enterAnimation, id: 'enter', isEnter: true});
        enterAnimation.play();
      }
      if (this.leaveAnimation) {
        this.registerAnimation({...this.leaveAnimation, id: 'leave'});
      }
      if (this.animation) {
        this.registerAnimation({id: 'default', ...this.animation});
      }
    });
  }

  ngOnDestroy() {
    this.players.forEach((player: AnimationPlayer) => player.destroy());
  }

  /**
   * Register a new animation
   * @param config
   */
  registerAnimation(config: PlayerConfig): AnimationPlayer {
    const builder = this.buildAnimation(config);
    const player = builder.create(this.textWrapper.nativeElement);
    player.onStart(() => {
      this._isPlaying = true;
      this.start.emit(config.id);
    });
    player.onDone(() => {
      this._isPlaying = false;
      this.done.emit(config.id);
    });
    return this.players.set(config.id, player).get(config.id);
  }

  /**
   * Build animation
   * @param config
   */
  private buildAnimation(config: PlayerConfig): AnimationFactory {
    return this.animationBuilder.build([
      query(
        `.teximate-${config.type}`,
        [
          style({opacity: config.isEnter ? 0 : 1}),
          stagger(config.delay, [useAnimation(config.animation)])
        ],
        {optional: true}
      )
    ]);
  }
}
