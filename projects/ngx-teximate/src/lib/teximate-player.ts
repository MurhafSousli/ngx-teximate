import { AnimationPlayer, AnimationBuilder, AnimationFactory, query, useAnimation, stagger } from '@angular/animations';
import { Observable, Subject } from 'rxjs';
import { TeximateOptions } from './teximate.model';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';

/**
 * This class wraps the animation player
 * We need this class wrapper because of this bug https://github.com/angular/angular/issues/26630
 */
export class TeximatePlayer {

  private _player: AnimationPlayer;

  // Stream that emits the player is started
  onStart = new Subject();

  // Stream that emits the player is finished
  onEnd = new Subject();

  // Stream that emits the player should be created
  private _onCreate = new Subject();

  // Stream that emits the clean up player
  private _cleanUp = new Subject();

  // Get total time
  // get totalTime(): number {
  //   return this._player.totalTime;
  // }

  constructor(private _animationBuilder: AnimationBuilder, private _host: HTMLElement) {
    this._onCreate.pipe(
      switchMap((config: TeximateOptions) => {
        this._cleanUp.next();
        // Create new player
        this._player = this._buildAnimation(config).create(this._host);
        // Player on start event
        this._player.onStart(() => this.onStart.next());
        // Player on done event
        this._player.onDone(() => this.onEnd.next());

        // Player on destroy event
        return new Observable((obs) => {
          this._player.onDestroy(() => {
            obs.next();
            obs.complete();
          });
        }).pipe(
          // Player reset
          finalize(() => this._destroyPlayer()),
          takeUntil(this._cleanUp)
        );
      })
    ).subscribe();
  }

  private _destroyPlayer() {
    if (this._player) {
      this._player.destroy();
      this._player = null;
    }
  }

  /**
   * Build animation
   */
  private _buildAnimation(config: TeximateOptions): AnimationFactory {
    /**
     * ':enter' and ':leave' for enter and leave animations has a bug https://github.com/angular/angular/issues/26612
     */
    return this._animationBuilder.build([
      query(
        `.tx-${config.selector}`,
        [
          // A workaround for enter animation
          // style({ opacity: config.mode === 'enter' ? 0 : 1 }),
          stagger(config.delay, [useAnimation(config.animation)])
        ]
      )
    ]);
  }

  /**
   * Create animation player
   */
  createPlayer(config: TeximateOptions) {
    this._onCreate.next(config);
  }

  play() {
    if (this._player) {
      this._player.play();
    }
  }

  stop() {
    if (this._player) {
      this._player.pause();
    }
  }

  destroy() {
    this._destroyPlayer();
    this._cleanUp.next();
    this._cleanUp.complete();
    this._onCreate.complete();
    this.onEnd.complete();
    this.onStart.complete();
  }

  //
  // getPosition(): number {
  //   return this._player.getPosition();
  // }
  //
  // setPosition(position: number): void {
  //   return this._player.setPosition(position);
  // }
}

