// import {
//   Component,
//   Output,
//   OnDestroy,
//   ElementRef,
//   EventEmitter,
//   ContentChildren,
//   QueryList,
//   AfterContentInit,
//   OnInit
// } from '@angular/core';
// import { AnimationBuilder } from '@angular/animations';
// import { switchMap, mergeAll, takeUntil, tap } from 'rxjs/operators';
// import { TeximateContent, TeximateDirective } from './teximate-content';
// import { TeximateBuilder } from './teximate-builder';
// import { TeximatePlayer } from './teximate-player';

// @Component({
//   selector: 'teximate-group',
//   template: `
//     <p *ngFor="let paragraph of (player.state | async).content; index as i"
//        class="teximate-paragraph teximate-paragraph-{{i}}">

//     <span *ngFor="let word of paragraph; index as j"
//           class="teximate-word teximate-word-{{j}}">

//      <span *ngFor="let letter of word; index as k"
//            class="teximate-letter teximate-letter-{{k}}">
//         {{letter}}
//       </span>
//     </span>
//     </p>
//   `,
//   styles: [`
//     .teximate-word,
//     .teximate-letter {
//       display: inline-block;
//     }

//     .teximate-word {
//       margin-right: 8px;
//     }
//   `]
// })
// export class Teximate implements OnInit, AfterContentInit, OnDestroy {

//   /** Stream that emits when animation is started */
//   @Output('play') playEmitter = new EventEmitter();

//   /** Stream that emits when animation is done */
//   @Output('finish') finishEmitter = new EventEmitter();

//   @ContentChildren(TeximateContent) children: QueryList<TeximateContent>;

//   player: TeximatePlayer;

//   constructor(private animationBuilder: AnimationBuilder, private el: ElementRef) {
//   }

//   ngOnInit() {
//     this.player = new TeximatePlayer(this.animationBuilder, this.el.nativeElement);

//     this.player.onStart.pipe(
//       tap((e) => this.playEmitter.emit(e)),
//       takeUntil(this.player.onDestroy)
//     ).subscribe();

//     this.player.onEnd.pipe(
//       tap((e) => this.finishEmitter.emit(e)),
//       takeUntil(this.player.onDestroy)
//     ).subscribe();
//   }

//   ngAfterContentInit() {
//     console.log('ngAfterContentInit');
//     // Observe content changes
//     this.children.changes.pipe(
//       tap((x) => console.log(x)),
//       switchMap((list: QueryList<TeximateContent>) =>
//         list.map((element: TeximateContent) => element.contentChanges)
//       ),
//       tap((x) => console.log(x)),
//       mergeAll(),
//       switchMap((x: TeximateDirective) => new TeximateBuilder().pipe(
//         tap(() => console.log(x)),
//         // animate(x.content, x.animation, x.animationDelay),
//         // pause(1000)
//       )),
//       takeUntil(this.player.onDestroy),
//     ).subscribe();

//     this.children.notifyOnChanges();
//   }

//   ngOnDestroy() {
//     console.log(this.player);
//     this.player.destroy();
//   }
// }
