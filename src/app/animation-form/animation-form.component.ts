import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  bounceIn,
  bounceInUp,
  bounceInDown,
  bounceInLeft,
  bounceInRight,
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeOut,
  fadeOutUp,
  fadeOutDown,
  fadeOutLeft,
  fadeOutRight,
  bounceOut,
  bounceOutUp,
  bounceOutDown,
  bounceOutLeft,
  bounceOutRight,
  lightSpeedIn,
  lightSpeedOut,
  flipInX,
  flipInY,
  flipOutX,
  flipOutY,
  rotateIn,
  rotateInDownLeft,
  rotateInDownRight,
  rotateInUpLeft,
  rotateInUpRight,
  rotateOutUpLeft,
  rotateOutUpRight,
  rotateOutDownLeft,
  rotateOutDownRight
} from 'ng-animate';
// import { TextAnimation } from 'ngx-teximate';

// import { TextAnimation } from '../../../projects/teximate/src/public_api';

@Component({
  selector: 'app-animation-form',
  templateUrl: './animation-form.component.html',
  styleUrls: ['./animation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimationFormComponent implements OnInit {
  animations = {
    enter: enterAnimations,
    leave: leaveAnimations
  };
  form = new FormGroup({
    id: new FormControl('enter'),
    type: new FormControl('letter'),
    delay: new FormControl(50),
    animation: new FormControl(fadeIn)
  });

  @Input() isPlaying: boolean;
  @Output() value = new EventEmitter<any>();
  @Output() play = new EventEmitter<any>();

  ngOnInit() {
    this.form.valueChanges.subscribe((e: any) => this.value.emit(e));
  }

}

const enterAnimations = [
  {
    name: 'bounceIn',
    value: bounceIn
  },
  {
    name: 'bounceInUp',
    value: bounceInUp
  },
  {
    name: 'bounceInDown',
    value: bounceInDown
  },
  {
    name: 'bounceInLeft',
    value: bounceInLeft
  },
  {
    name: 'bounceInRight',
    value: bounceInRight
  },
  {
    name: 'fadeIn',
    value: fadeIn
  },
  {
    name: 'fadeInUp',
    value: fadeInUp
  },
  {
    name: 'fadeInDown',
    value: fadeInDown
  },
  {
    name: 'fadeInLeft',
    value: fadeInLeft
  },
  {
    name: 'fadeInRight',
    value: fadeInRight
  },
  {
    name: 'lightSpeedIn',
    value: lightSpeedIn
  },
  {
    name: 'flipInX',
    value: flipInX
  },
  {
    name: 'flipInY',
    value: flipInY
  },
  {
    name: 'rotateIn',
    value: rotateIn
  },
  {
    name: 'rotateInUpLeft',
    value: rotateInUpLeft
  },
  {
    name: 'rotateInUpRight',
    value: rotateInUpRight
  },
  {
    name: 'rotateInDownLeft',
    value: rotateInDownLeft
  },
  {
    name: 'rotateInDownRight',
    value: rotateInDownRight
  }
];

const leaveAnimations = [
  {
    name: 'bounceOut',
    value: bounceOut
  },
  {
    name: 'bounceOutUp',
    value: bounceOutUp
  },
  {
    name: 'bounceOutDown',
    value: bounceOutDown
  },
  {
    name: 'bounceOutLeft',
    value: bounceOutLeft
  },
  {
    name: 'bounceOutRight',
    value: bounceOutRight
  },
  {
    name: 'fadeOut',
    value: fadeOut
  },
  {
    name: 'fadeOutUp',
    value: fadeOutUp
  },
  {
    name: 'fadeOutDown',
    value: fadeOutDown
  },
  {
    name: 'fadeOutLeft',
    value: fadeOutLeft
  },
  {
    name: 'fadeOutRight',
    value: fadeOutRight
  },
  {
    name: 'lightSpeedOut',
    value: lightSpeedOut
  },
  {
    name: 'flipOutX',
    value: flipOutX
  },
  {
    name: 'flipOutY',
    value: flipOutY
  },
  {
    name: 'rotateIn',
    value: rotateIn
  },
  {
    name: 'rotateOutUpLeft',
    value: rotateOutUpLeft
  },
  {
    name: 'rotateOutUpRight',
    value: rotateOutUpRight
  },
  {
    name: 'rotateOutDownLeft',
    value: rotateOutDownLeft
  },
  {
    name: 'rotateOutDownRight',
    value: rotateOutDownRight
  }
];
