import { AnimationPlayer, AnimationBuilder, AnimationFactory, query, useAnimation, stagger } from '@angular/animations';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { TeximateTimeline, TeximateAnimation, TeximateBuilderState } from './teximate.model';
import { TeximateDirective } from './teximate-content';
import { TeximateBuilder } from './teximate-builder';
import { tap } from 'rxjs/operators';

export class TeximatePlayer {

  private readonly _state = new BehaviorSubject<TeximateTimeline>({
    isPlaying: false,
    player: null,
    content: null,
    type: 'word'
  });

  readonly state: Observable<TeximateTimeline> = this._state.asObservable();

  // Stream that emits a playing animation is started
  onStart = new Subject();

  // Stream that emits a playing animation is ended
  onEnd = new Subject();

  // Stream that emits when instance is destroyed
  onDestroy = new Subject();

  private player: AnimationPlayer;

  constructor(private _animationBuilder: AnimationBuilder,
    private host: HTMLElement) {
    // this.builder.state.pipe(
    //   tap((state: TeximateBuilderState) => this._state.next({
    //     content: state.content,
    //     isPlaying: true,
    //     player: {
    //       animation: state.animation,
    //       delay: state.animationDelay,
    //       selector: state.selector
    //     }
    //   }))
    // );
    // this.player.state.pipe(
    //   tap((x) => console.log('player', x))
    // );
  }

  play() {
    this.player.play();
  }

  destroy() {
    if (this.player) {
      this.player.destroy();
    }

    this.onEnd.complete();
    this.onStart.complete();
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  /**
   * Create animation player
   * @param config
   */
  createPlayer(config: TeximateBuilderState): Observable<any> {
    const initialState: TeximateTimeline = {
      content: config.content,
      isPlaying: false,
      player: null,
      type: 'word'
    };
    console.log('createPlayer', initialState, config);
    this.player = this.buildAnimation(initialState.player).create(this.host);
    /** TODO: Investigate why onStart and onDone fire only once */
    this.player.onStart(() => {
      // TODO: Update state
      this.onStart.next();
    });
    this.player.onDone(() => {
      // TODO: Update state
      this.player.destroy();
      this.onEnd.next();
    });
    return of();
  }

  /**
   * Build animation
   */
  private buildAnimation(config: TeximateAnimation): AnimationFactory {
    /** TODO: Use ':enter' and ':leave' for enter and leave animations */
    return this._animationBuilder.build([
      query(
        `.teximate-${config.selector}`,
        [
          // This is a workaround for enter animation to work
          // style({ opacity: config.mode === 'enter' ? 0 : 1 }),
          stagger(config.delay, [useAnimation(config.animation)])
        ]
      )
    ]);
  }
}

