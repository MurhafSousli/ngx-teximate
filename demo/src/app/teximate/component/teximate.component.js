import { Component, Input, Renderer2, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { TeximateOrder } from '../helper/teximate.class';
import { TeximateService } from '../service/teximate.service';
var TeximateComponent = (function () {
    // @Input() hoverEffect;
    // @Input() clickEffect;
    function TeximateComponent(teximate, renderer, el) {
        this.teximate = teximate;
        this.renderer = renderer;
        this.jobText = 'Teximate is working';
        this.jobType = 'letter';
        /** Default effect */
        this.jobEffect = {
            animation: { name: 'fadeIn', duration: 300 },
            word: { type: TeximateOrder.SEQUENCE, delay: 100 },
            letter: { type: TeximateOrder.SHUFFLE, delay: 50 }
        };
        /** create dynamic style (to avoid applying css rules' vendors for each element in the template) */
        this.style = this.renderer.createElement('style');
        this.renderer.appendChild(el.nativeElement, this.style);
    }
    TeximateComponent.prototype.ngOnChanges = function (changes) {
        // console.log(changes['type'])
        var reloadText = changes['text'] && changes['text'].firstChange;
        if (changes['text'] && changes['text'].currentValue) {
            this.jobText = changes['text'].currentValue;
            reloadText = true;
        }
        if (changes['type'] && changes['type'].currentValue) {
            this.jobType = changes['type'].currentValue;
        }
        if (changes['effect']) {
            this.jobEffect = Object.assign({}, this.jobEffect, changes['effect'].currentValue);
            this.setAnimationDuration(changes['effect'].currentValue.animation.duration);
        }
        if (reloadText) {
            this.teximate.run(this.jobText, this.jobEffect, this.jobType);
        }
        else {
            this.teximate.runEffect(this.jobEffect, this.jobType);
        }
    };
    TeximateComponent.prototype.runEffect = function (options, type) {
        /** Run effect to the existing text (should be used from component ref
         * e.g. :
         * ViewChild(TeximateComponent) tx;
         * tx.runEffect(options);
         * */
        this.teximate.runEffect(options, type);
    };
    TeximateComponent.prototype.setAnimationDuration = function (duration) {
        this.renderer.setProperty(this.style, 'innerHTML', "\n      .animated {\n        animation-duration: " + duration + "ms;\n        -webkit-animation-duration: " + duration + "ms;\n        -moz-animation-duration: " + duration + "ms;\n        -o-animation-duration: " + duration + "ms;\n        -ms-animation-duration: " + duration + "ms;\n      }\n    ");
    };
    TeximateComponent.prototype.ngOnDestroy = function () {
        this.teximate.text.unsubscribe();
        this.teximate.worker.unsubscribe();
    };
    return TeximateComponent;
}());
export { TeximateComponent };
TeximateComponent.decorators = [
    { type: Component, args: [{
                selector: 'teximate',
                template: "\n    <span aria-label=\"text\">\n\n      <div *ngFor=\"let line of teximate.text | async\" [class]=\"'line' + line.class\" [style.visibility]=\"line.visibility\">\n\n        <span *ngFor=\"let word of line.words\" [class]=\"'word' + word.class + word.animateClass\" [style.visibility]=\"word.visibility\">\n\n          <span *ngFor=\"let letter of word.letters\" [class]=\"'letter' + letter.class + letter.animateClass\"\n           [style.visibility]=\"letter.visibility\">\n            {{letter.text}}\n          </span>\n\n        </span>\n      </div>\n\n    </span>\n  ",
                styles: ["\n    .word, .letter{\n        display: inline-block;\n        //  fix for poor ios performance \n        transform: translate3d(0,0,0);\n        -moz-transform: translate3d(0,0,0);\n        -o-transform: translate3d(0,0,0);\n        -webkit-transform: translate3d(0,0,0);\n    }\n    .word{ \n        margin-right: 8px;\n    }\n  "],
                changeDetection: ChangeDetectionStrategy.OnPush,
                viewProviders: [TeximateService]
            },] },
];
/** @nocollapse */
TeximateComponent.ctorParameters = function () { return [
    { type: TeximateService, },
    { type: Renderer2, },
    { type: ElementRef, },
]; };
TeximateComponent.propDecorators = {
    'text': [{ type: Input },],
    'type': [{ type: Input },],
    'effect': [{ type: Input },],
};
//# sourceMappingURL=teximate.component.js.map