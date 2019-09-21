import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { fadeIn } from 'ng-animate';
import { Teximate } from 'projects/ngx-teximate/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // toggleTeximate = true;
  animation = fadeIn;

  show = true;
  text = 'Everyday I am 1% better than yesterday';
  enterAnimation: any = {
    type: 'letter',
    delay: 50,
    animation: fadeIn
  };
  leaveAnimation: any;
  defaultAnimation: any;
  startClass = new Subject<boolean>();
  doneClass = new Subject<boolean>();

  title = 'xxx';

  @ViewChild(Teximate, { static: true }) teximate: Teximate;

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

  onAnimationValue(e: any) {
    if (e.id === 'enter') {
      this.enterAnimation = e;
    } else if (e.id === 'leave') {
      this.leaveAnimation = e;
    } else {
      this.defaultAnimation = e;
    }
  }

  play(e) {
    // if (this.teximate.isPlaying) {
    //   this.teximate.players.get(e.id).finish();
    // } else {
    //   this.teximate.players.get(e.id).play();
    // }
  }

  onClick(x, e) {
    console.log(`${x} click`, e);
  }
  onHover(x, e) {
    console.log(`${x} hover`, e);
  }
}
