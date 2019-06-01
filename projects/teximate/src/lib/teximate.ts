import {
  Component,
  Output,
  OnDestroy,
  ElementRef,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnInit, Input, OnChanges
} from '@angular/core';
import {AnimationBuilder} from '@angular/animations';
import {Subject} from 'rxjs';
import {switchMap, mergeAll, takeUntil, tap, map} from 'rxjs/operators';
import {fadeIn} from 'ng-animate';
import {TeximateContent, TeximateDirective} from './teximate-content';
import {TeximateBuilder} from './teximate-builder';
import {TeximatePlayer} from './teximate-player';

@Component({
  selector: 'teximate',
  template: `
    <p *ngFor="let paragraph of (builder.state | async).content; index as i"
       class="teximate-paragraph teximate-paragraph-{{i}}">

    <span *ngFor="let word of paragraph; index as j"
          class="teximate-word teximate-word-{{j}}">

     <span *ngFor="let letter of word; index as k"
           class="teximate-letter teximate-letter-{{k}}">
        {{letter}}
      </span>
    </span>
    </p>
  `,
  styles: [`
    .teximate-word,
    .teximate-letter {
      display: inline-block;
    }

    .teximate-word {
      margin-right: 8px;
    }
  `]
})
export class Teximate implements OnInit, OnChanges, OnDestroy {

  /** Stream that emits when animation is started */
  @Output('play') playEmitter = new EventEmitter();

  /** Stream that emits when animation is done */
  @Output('finish') finishEmitter = new EventEmitter();

  @Input() content: string;

  player: TeximatePlayer;

  builder = new TeximateBuilder();

  state = new Subject();

  constructor(private animationBuilder: AnimationBuilder, private el: ElementRef) {

    this.builder.state.subscribe(x => console.log('builder state', x));

    this.state.pipe(
      switchMap((content: string) => {
        const operators = [
          this.builder.exec(() => console.log('It starts!', content)),
          this.builder.animate(content, fadeIn, 50, 'letter'),
          this.builder.pause(1000),
          this.builder.exec(() => console.log('It works after pause!'))
        ];
        return this.builder.pipe(...operators);
      })
    ).subscribe(() => console.log('FINIShED!'));
  }

  ngOnInit() {

    this.player = new TeximatePlayer(this.animationBuilder, this.el.nativeElement);

    this.player.onStart.pipe(
      tap((e) => this.playEmitter.emit(e)),
      takeUntil(this.player.onDestroy)
    ).subscribe();

    this.player.onEnd.pipe(
      tap((e) => this.finishEmitter.emit(e)),
      takeUntil(this.player.onDestroy)
    ).subscribe();
  }

  ngOnChanges() {
    this.state.next(this.content);
  }

  // ngAfterContentInit() {
  // Observe content changes
  // this.children.changes.pipe(
  // switchMap((list: QueryList<TeximateContent>) =>
  //   list.map((element: TeximateContent) => element.contentChanges)
  // ),
  // tap((x) => console.log(x)),
  // mergeAll(),
  // map(() => {
  //   return {
  //     content: 'Hello World',
  //     animation: fadeIn,
  //     animationDelay: 50
  //   };
  // }),
  // switchMap((x: TeximateDirective) => new TeximateBuilder().pipe(...operators)),
  //   takeUntil(this.player.onDestroy),
  // ).subscribe();

  // this.children.notifyOnChanges();
  // }

  ngOnDestroy() {
    console.log(this.player);
    this.player.destroy();
  }
}
