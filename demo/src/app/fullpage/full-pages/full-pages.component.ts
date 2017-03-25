import { Component, ContentChildren, QueryList, AfterViewInit, ElementRef, Renderer, ViewChild } from '@angular/core';
import { FullPageComponent } from '../full-page/full-page.component';
import { FullPageNavComponent } from '../full-page-nav/full-page-nav.component';

@Component({
    selector: 'full-pages',
    templateUrl: './full-pages.component.html',
    styleUrls: ['./full-pages.component.scss']
})
export class FullPagesComponent implements AfterViewInit {

  @ContentChildren(FullPageComponent) sections: QueryList<ElementRef>;


  @ContentChildren(FullPageNavComponent) navigation: QueryList<FullPageNavComponent>;

  // @ViewChild(FullPageNavComponent) navigation: FullPageNavComponent;
  @ViewChild('container') container: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngAfterViewInit() {

    this.sections.map((section) => {
      this.navigation.map((nav) => {
        nav.buttons.push(section);
      });
      this.renderer.setElementStyle(section.nativeElement, 'height', `${this.el.nativeElement.style.height}px`);
      // this.navigation.buttons.push(section);
    })

     this.navigation.map((nav) => {
      nav.clicked.subscribe((section) => {
        let top = section.nativeElement.offsetTop;
        console.log(section);
        this.renderer.setElementStyle(this.container.nativeElement, 'transform', `translate3d(0px, ${-top}px, 0px)`);
      });
    });

    // this.navigation.map((nav) => {
      // this.navigation.clicked.subscribe((section) => {
      //   let top = section.nativeElement.offsetTop;
      //   console.log(section);
      //   this.renderer.setElementStyle(this.container.nativeElement, 'transform', `translate3d(0px, ${-top}px, 0px)`);
      // });
    // });
  }
}
