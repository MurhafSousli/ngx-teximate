import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { Helper } from '../helper/teximate.helper';
import { TeximateOrder } from '../helper/teximate.class';
/** This service is not meant to be used outside TeximateModule
 *  Each component instance has service instance
 */
var TeximateService = (function () {
    function TeximateService() {
        var _this = this;
        /** The text array coming from text factory */
        this.arr = [];
        /** a worker to teximate the array */
        this.worker = new Subject();
        /** the teximated text to be displayed on the view */
        this.text = new Subject();
        this.worker.switchMap(function (job) {
            // console.log('worker execute:', job.type);
            return (job.type === 'word') ?
                _this.wordsJob(job.textArr, job.options) :
                _this.lettersJob(job.textArr, job.options);
        }).subscribe();
    }
    TeximateService.prototype.run = function (text, options, type) {
        this.arr = Helper.textFactory(text);
        this.worker.next({ textArr: this.arr, options: options, type: type });
    };
    TeximateService.prototype.runEffect = function (options, type) {
        this.worker.next({ textArr: this.arr, options: options, type: type });
    };
    TeximateService.prototype.lettersJob = function (textArr, options) {
        var _this = this;
        return Observable.from(textArr)
            .mergeMap(function (line) {
            /** To calculate a word's delay */
            var prevWordLength = 0;
            return Observable.of(line.words)
                .mergeAll()
                .mergeMap(function (wordItem, j) {
                /** Process word (calculate index & delay according to word's type) */
                var word = Helper.processWord(options, line.words, j, prevWordLength);
                /** To calculate next word's delay */
                prevWordLength = prevWordLength + word.letters.length;
                /** Shuffle word's letter if letter type is shuffle */
                var wordLetters;
                if (options.letter.type === TeximateOrder.SHUFFLE) {
                    wordLetters = Helper.shuffle(word.letters.slice());
                }
                else {
                    wordLetters = word.letters;
                }
                return Observable.of(wordLetters).delay(word.delay)
                    .mergeAll()
                    .mergeMap(function (letterItem, k) {
                    /** Process letter (calculate index & delay according to letter's type) */
                    var letter = Helper.processLetter(options, wordLetters, k);
                    return Observable.of(letter.item).delay(letter.delay)
                        .do(function (letterItem) {
                        /** Apply changes to the letter then update the view */
                        letterItem.visibility = 'visible';
                        /** Set animation and custom classes */
                        letterItem.animateClass = " animated " + options.animation.name;
                        /** Update the array */
                        _this.text.next(textArr);
                    });
                });
            });
        });
    };
    TeximateService.prototype.wordsJob = function (textArr, options) {
        var _this = this;
        return Observable.from(textArr)
            .mergeMap(function (line, i) {
            return Observable.of(line.words)
                .mergeAll()
                .mergeMap(function (wordItem, j) {
                /** Process word (calculate index & delay according to word's type)
                 *  in this case `options.letter.delay` must be 0 */
                var word = Helper.processWord(options, line.words, j, 0);
                return Observable.of(word)
                    .delay(word.delay)
                    .do(function () {
                    /** Apply changes to the letter then update the view */
                    wordItem.visibility = 'visible';
                    /** Set animation and custom classes */
                    wordItem.animateClass = " animated " + options.animation.name;
                    /** Update the array */
                    _this.text.next(textArr);
                });
            });
        });
    };
    return TeximateService;
}());
export { TeximateService };
TeximateService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TeximateService.ctorParameters = function () { return []; };
//# sourceMappingURL=teximate.service.js.map