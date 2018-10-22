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
import { TextAnimation } from './teximate.model';

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

  /** Set animated text */
  @Input('text') set setText(text: string) {
    this._state.next(text);
  }

  /** Animation that triggers on init */
  @Input() enter: TextAnimation;

  /** Animation that triggers on destroy */
  @Input() leave: TextAnimation;

  /** Animation that triggers with the play() function */
  @Input() animation: TextAnimation;

  /** Stream that emits when animation is started */
  @Output('play') playEmitter = new EventEmitter();

  /** Stream that emits when animation is done */
  @Output('finish') finishEmitter = new EventEmitter();

  /** Teximate animations */
  players = new Map<string, AnimationPlayer>();

  /** Teximate state */
  private _state = new BehaviorSubject<string>('');
  state: Observable<string[][][]>;

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
    this.updateAnimations(true);
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
  registerAnimation(config: TextAnimation): AnimationPlayer {
    const player = this.buildAnimation(config).create(this.el.nativeElement);
    /** TODO: Investigate why onStart and onDone fire only once */
    player.onStart(() => {
      this._isPlaying = true;
      this.playEmitter.emit(config.id);
    });
    player.onDone(() => {
      this._isPlaying = false;
      this.finishEmitter.emit(config.id);
    });
    return this.players.set(config.id, player).get(config.id);
  }

  private updateAnimations(autoPlayEnter?: boolean) {
    this.zone.runOutsideAngular(() => {
      if (this.enter) {
        const enterPlayer = this.registerAnimation({...this.enter, id: 'enter', isEnter: true});
        if (autoPlayEnter) {
          enterPlayer.play();
        }
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
  private buildAnimation(config: TextAnimation): AnimationFactory {
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

/** Convert text string into a workable text */
export function teximateFactory(text: string): string[][][] {
  const paragraphs: string[][][] = [];
  // Split text into paragraphs
  text.split('\n').map((paragraph: string) => {
    const words: string[][] = [];
    // Split paragraph into words
    paragraph
      .split(' ')
      .filter(word => word !== '')
      .map((word: string) =>
        // Split word into letters
        words.push(word.split(/(?!$)/u))
      );
    paragraphs.push(words);
  });
  return paragraphs;
}
