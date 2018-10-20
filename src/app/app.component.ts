import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Subject } from 'rxjs';

import { fadeInDown, slideOutRight } from 'ng-animate';
import { Teximate, TextAnimation } from './teximate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // toggleTeximate = true;
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

  @ViewChild(Teximate) teximate: Teximate;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    const safeURL = this.sanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg');
    this.iconRegistry.addSvgIcon('logo', safeURL);
  }

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

  play(e) {
    if (this.teximate.isPlaying) {
      this.teximate.players.get(e.id).finish();
    } else {
      this.teximate.players.get(e.id).play();
    }
  }
}
