import { Component, OnInit, Input, Renderer, ElementRef } from '@angular/core';
import { Helper } from '../functions.helper';

import {TeximateService} from '../service/teximate.service';

@Component({
  selector: 'teximate',
  templateUrl: './teximate.component.html',
  styleUrls: ['./teximate.component.scss']
})
export class TeximateComponent implements OnInit {

  @Input() text: string;

  constructor(private teximate: TeximateService) { }

  ngOnInit() {

    this.teximate.run(this.text);
  }

}


