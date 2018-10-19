import { Component } from '@angular/core';
import { fadeInDown, slideOutRight } from 'ng-animate';
import { Subject } from 'rxjs';
import { TextAnimation } from './teximate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = 'Everyday I am 1% better than yesterday';
  enterAnimation: TextAnimation = {
    animation: fadeInDown,
    delay: 50,
    type: 'letter'
  };
  leaveAnimation: TextAnimation = {
    animation: slideOutRight,
    delay: 50,
    type: 'letter'
  };
  defaultAnimation: TextAnimation = {
    animation: slideOutRight,
    delay: 50,
    type: 'letter'
  };

  animationStart: string;
  animationDone: string;
  startClass = new Subject<boolean>();
  doneClass = new Subject<boolean>();

  onAnimationStart(e: string) {
    this.startClass.next(true);
    setTimeout(() => {
      this.startClass.next(false);
    }, 800);
    this.animationStart = e;
  }

  onAnimationDone(e) {
    this.doneClass.next(true);
    setTimeout(() => {
      this.doneClass.next(false);
    }, 800);
    this.animationDone = e;
  }

  onAnimationValue(e: TextAnimation) {
    if (e.id === 'enter') {
      this.enterAnimation = e;
    } else if (e.id === 'leave') {
      this.leaveAnimation = e;
    } else {
      this.defaultAnimation = e;
    }
  }

  play() {

  }
}
