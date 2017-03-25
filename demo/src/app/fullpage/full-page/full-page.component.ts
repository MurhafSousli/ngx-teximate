import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'full-page',
  templateUrl: './full-page.component.html',
  styleUrls: ['./full-page.component.scss']
})
export class FullPageComponent implements OnInit {

  @Input() active: boolean = false;
  @Input() name: string;

  nativeElement: HTMLElement;

  constructor(el: ElementRef, renderer: Renderer) {
      this.nativeElement = el.nativeElement;
      console.log(window.innerHeight);
      renderer.setElementStyle(el.nativeElement, 'height', window.innerHeight + 'px');
  }

  ngOnInit() {
  }

}
