import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Subject } from 'rxjs';

import { Teximate, TextAnimation } from '../../projects/teximate/src/public_api';
// import { Teximate, TextAnimation } from 'ngx-teximate';
import { fadeIn } from 'ng-animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // toggleTeximate = true;
  text = 'Everyday I am 1% better than yesterday';
  enterAnimation: TextAnimation = {
    type: 'letter',
    delay: 50,
    animation: fadeIn
  };
  leaveAnimation: TextAnimation;
  defaultAnimation: TextAnimation;
  startClass = new Subject<boolean>();
  doneClass = new Subject<boolean>();

  @ViewChild(Teximate) teximate: Teximate;

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    const safeURL = this.sanitizer.bypassSecurityTrustResourceUrl('assets/logo.svg');
    this.iconRegistry.addSvgIcon('logo', safeURL);
  }

  onAnimationPlay() {
    this.startClass.next(true);
    setTimeout(() => {
      this.startClass.next(false);
    }, 800);
  }

  onAnimationFinish() {
    this.doneClass.next(true);
    setTimeout(() => {
      this.doneClass.next(false);
    }, 800);
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

  onClick(x, e) {
    console.log(`${x} click`, e);
  }
  onHover(x, e) {
    console.log(`${x} hover`, e);
  }
}
