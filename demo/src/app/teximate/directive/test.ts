import { Directive, Input, Renderer, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Helper } from '../functions.helper';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

// import 'rxjs/add/operator/merge';

import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';

import 'rxjs/add/observable/merge';

@Directive({
    selector: '[teximate]'
})
export class TeximateDirective {

    itemsArr = [];

    /** Text input */
    textArr: string[] = [];
    @Input() teximate;

    /** The delay used for displaying elements */
    @Input('tmInterval') interval = 0;

    job: Observable<any>;

    @Input() set tmRun(flag) {
        if (flag) {
            this.job.subscribe();
        }
    }

    constructor(private renderer: Renderer, private el: ElementRef) { }

    ngOnInit() {
        this.prepareHost().subscribe();
    }

    prepareHost(): Observable<any> {
        //Check if text is valid
        if (typeof this.teximate !== 'string') {
            console.warn('[texilate]: invalid input');
            return;
        }

        //Prepare host content
        this.renderer.setElementAttribute(this.el.nativeElement, 'aria-label', 'text');
        this.renderer.setElementProperty(this.el.nativeElement, 'innerText', '');

        //Create array of string element
        return this.textFactory(this.teximate);

        // this.sequence();
    }

    textFactory(text) {
        console.log('executed');
        let lines: string[] = text.split('\n');

        return Observable.merge(
            return Observable.from(lines)
                .map((line) => {
                    let wordArr = [];

                    let words = line.split(' ');

                    return Observable.zip(
                        Observable.from(words)
                            .map((word) => {
                                /** Loop over words */
                                let letters: string[] = word.split('');

                                /** Loop over letters */
                                return Observable.zip(
                                    Observable.from(letters)
                                        .map((letter, i) => {
                                            let item = this.createItem(letter, i, ' ', 'char');
                                            this.itemsArr.push(item);
                                        }),

                                    Observable.timer(0, this.interval), (item, i) => {
                                        console.log('letter');
                                        this.showItem(this.itemsArr[i]);
                                    });

                            }),
                        Observable.timer(0, this.interval), (item, i) => {
                            // console.log(item);

                            console.log('word');
                            item.subscribe();
                            // this.showItem(this.itemsArr[i]);
                        });

                }),
            Observable.timer(0, this.interval), (item, i) => {
                item.subscribe();
                // console.log(item);
                // this.showItem(this.itemsArr[i]);
            });

    }

    // /** Sequence mode */
    // sequence(): Observable<any> {
    //     return Observable.zip(
    //         Observable.from(this.textArr)
    //             .map((text, i) => {
    //                 let item = this.createItem(text, i, ' ', 'char');
    //                 this.itemsArr.push(item);
    //             }),

    //         Observable.timer(0, this.interval), (item, i) => {
    //             this.showItem(this.itemsArr[i]);
    //         });
    // }

    /** Create and return DOM element from the text input */
    createItem(text: string, i: number, splitter: string, className: string): HTMLElement {

        let item = this.renderer.createElement(this.el.nativeElement, 'span');
        this.renderer.setElementAttribute(item, 'aria-hidden', 'true');
        this.renderer.setElementStyle(item, 'visibility', 'hidden');
        /** Set element text */
        this.renderer.setElementProperty(item, 'innerText', text + splitter);
        /** Set element class e.g. "char char1" */
        this.renderer.setElementClass(item, className, true);
        this.renderer.setElementClass(item, className + i, true);

        return item;
    }

    /** Display DOM element */
    showItem(item: HTMLElement) {
        this.renderer.setElementStyle(item, 'visibility', 'visible');
    }

}
