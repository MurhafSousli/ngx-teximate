// import { Directive, Input, OnInit, ElementRef } from '@angular/core';

// import * as $ from 'jquery';
// import 'fullpage.js';

// import { FullpageOptions } from './fullpage.class';

// @Directive({
//     selector: `[fullPage]`
// })
// export class FullpageDirective implements OnInit {

//     @Input(`fullPage`) options: FullpageOptions;

//     [key: string]: any;

//     @Input() fullpageMenu: string;
//     @Input() fullpageLockAnchors: boolean;
//     @Input() fullpageAnchors: Array<string>;
//     @Input() fullpageNavigation: boolean;
//     @Input() fullpageNavigationPosition: string;
//     @Input() fullpageNavigationTooltips: Array<string>;
//     @Input() fullpageShowActiveTooltip: boolean;
//     @Input() fullpageSlidesNavigation: boolean;
//     @Input() fullpageSlidesNavPosition: string;

//     @Input() fullpageCss3: boolean;
//     @Input() fullpageScrollingSpeed: number;
//     @Input() fullpageAutoScrolling: boolean;
//     @Input() fullpageFitToSection: boolean;
//     @Input() fullpageFitToSectionDelay: number;
//     @Input() fullpageScrollBar: boolean;
//     @Input() fullpageEasing: string;
//     @Input() fullpageEasingcss3: string;
//     @Input() fullpageLoopBottom: boolean;
//     @Input() fullpageLoopTop: boolean;
//     @Input() fullpageLoopHorizontal: boolean;
//     @Input() fullpageContinuousVertical: boolean;
//     @Input() fullpageNormalScrollElements: string;
//     @Input() fullpageScrollOverflow: boolean;
//     @Input() fullpageTouchSensitivity: number;
//     @Input() fullpageNormalScrollElementTouchThreshold: number;

//     @Input() fullpageKeyboardScrolling: boolean;
//     @Input() fullpageAnimateAnchor: boolean;
//     @Input() fullpageRecordHistory: boolean;

//     @Input() fullpageControlArrows: boolean;
//     @Input() fullpageVerticalCentered: boolean;
//     @Input() fullpageResize: boolean;
//     @Input() fullpageSectionsColor: Array<string>;
//     @Input() fullpagePaddingTop: string;
//     @Input() fullpagePaddingBottom: string;
//     @Input() fullpageFixedElements: string;
//     @Input() fullpageResponsiveWidth: number;
//     @Input() fullpageResponsiveHeight: number;
//     @Input() fullpageSectionSelector: string;
//     @Input() fullpageSlideSelector: string;


//     @Input() fullpageAfterLoad: (anchorLink: string, index: number) => void;
//     @Input() fullpageOnLeave: (index: number, nextIndex: number,
//         direction: string) => void;
//     @Input() fullpageAfterRender: () => void;
//     @Input() fullpageAfterResize: () => void;
//     @Input() fullpageAfterSlideLoad: (anchorLink: string, index: number,
//         slideAnchor: string, slideIndex: number) => void;
//     @Input() fullpageOnSlideLeave: (anchorLink: string,
//         index: number, slideIndex: number, direction: string,
//         nextSlideIndex: number) => void;

//     constructor(private el: ElementRef) {
//     }

//     ngOnInit() {

//         if (!this.options) {
//             this.options = new FullpageOptions();
//         }

//         (<any>$)(this.el.nativeElement).fullpage(this.options);
//     }

// }
