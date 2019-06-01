import {AnimationReferenceMetadata} from '@angular/animations';
import {BehaviorSubject, Observable, OperatorFunction, Subject} from 'rxjs';
import {delay as delayTime, tap, catchError, take} from 'rxjs/operators';
import {pipeFromArray} from 'rxjs/internal/util/pipe';

import {TeximateBuilderState} from './teximate.model';
import {teximateFactory} from './utilities';

export class TeximateBuilder {

  readonly state = new BehaviorSubject<TeximateBuilderState>({
    content: null,
    animation: null,
    animationDelay: 0,
    selector: 'letter'
  });

  pipe(...operators: OperatorFunction<any, any>[]): Observable<TeximateBuilderState> {
    // pipeFromArray is a workaround to pipe operators into an observable, bug: https://github.com/ReactiveX/rxjs/issues/3989
    return pipeFromArray([
      // Start with current state value, take(1) is used before the operators to avoid infinity loop
      take(1),
      // Run the animation
      ...operators,
      // Catch any error
      catchError((e, caught) => {
        console.log('Teximate:', e, caught);
        return null;
      })
    ])(this.state);
  }

  animate(text: string, animation: AnimationReferenceMetadata, delay: number, type: 'letter' | 'word' | 'paragraph') {
    return tap((state: TeximateBuilderState) => {
      this.state.next({
        ...state,
        ...{
          animation,
          content: teximateFactory(text),
          animationDelay: delay,
          type: 'letter'
        }
      });
    });
  }

  exec = (func: () => void) => tap(() => func());

  pause = (time: number) => delayTime(time);
}

