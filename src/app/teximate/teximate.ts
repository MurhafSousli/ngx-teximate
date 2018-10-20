import {
  Component,
  Input,
  Output,
  AfterViewInit,
  OnChanges,
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
export class Teximate implements AfterViewInit, OnChanges, OnDestroy {

  /** Set text */
  @Input('text') set setText(text: string) {
    this._state.next(text);
  }

  /** Animation that triggers on init */
  @Input() enter: TextAnimation;

  /** Animation that triggers on destroy */
  @Input() leave: TextAnimation;

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

  /** Teximate animations */
  players = new Map<string, AnimationPlayer>();

  /** Teximate state */
  private _state = new BehaviorSubject<string>('');
  state: Observable<Paragraph[]>;

  /** Teximate playing state */
  private _isPlaying: boolean;
  private _isViewInit: boolean;

  get isPlaying() {
    return this._isPlaying;
  }

  get enterPlayer(): AnimationPlayer {
    return this.players.get('enter');
  }

  get leavePlayer(): AnimationPlayer {
    return this.players.get('leave');
  }

  get defaultPlayer(): AnimationPlayer {
    return this.players.get('default');
  }

  constructor(private animationBuilder: AnimationBuilder, private zone: NgZone, private el: ElementRef) {
    this.state = this._state.pipe(map((text: string) => teximateFactory(text)));
  }

  ngAfterViewInit() {
    this._isViewInit = true;
    this.updateAnimations();
  }

  ngOnChanges() {
    if (this._isViewInit) {
      this.updateAnimations();
    }
  }

  ngOnDestroy() {
    // TODO: Use players.forEach to destroy players
    if (this.players.has('enter')) {
      this.players.get('enter').destroy();
    }
    if (this.players.has('leave')) {
      this.players.get('leave').destroy();
    }
    if (this.players.has('default')) {
      this.players.get('default').destroy();
    }
  }

  /**
   * Register a new animation
   */
  registerAnimation(config: PlayerConfig): AnimationPlayer {
    const player = this.buildAnimation(config).create(this.el.nativeElement);
    /** TODO: Investigate why onStart and onDone fire only once */
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

  private updateAnimations() {
    this.zone.runOutsideAngular(() => {
      if (this.enter) {
        const enterPlayer = this.registerAnimation({...this.enter, id: 'enter', isEnter: true});
        enterPlayer.play();
      }
      if (this.leave) {
        this.registerAnimation({...this.leave, id: 'leave'});
      }
      if (this.animation) {
        this.registerAnimation({id: 'default', ...this.animation});
      }
    });
  }

  /**
   * Build animation
   */
  private buildAnimation(config: PlayerConfig): AnimationFactory {
    /** TODO: Use ':enter' and ':leave' for enter and leave animations */
    return this.animationBuilder.build([
      query(
        `.teximate-${config.type}`,
        [
          // This is a workaround for enter animation to work
          style({opacity: config.isEnter ? 0 : 1}),
          stagger(config.delay, [useAnimation(config.animation)])
        ]
      )
    ]);
  }
}
