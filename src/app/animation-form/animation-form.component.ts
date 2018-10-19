import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
  fadeInRight
} from 'ng-animate';
import { TextAnimation } from '../teximate';

@Component({
  selector: 'app-animation-form',
  templateUrl: './animation-form.component.html',
  styleUrls: ['./animation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimationFormComponent implements OnInit {

  enterAnimations = enterAnimations;
  form = new FormGroup({
    id: new FormControl('enter'),
    type: new FormControl('letter'),
    delay: new FormControl(0),
    animation: new FormControl(fadeIn)
  });

  @Output() value = new EventEmitter<TextAnimation>();

  ngOnInit() {
    this.form.valueChanges.subscribe((e: TextAnimation) => this.value.emit(e));
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
  }
];
