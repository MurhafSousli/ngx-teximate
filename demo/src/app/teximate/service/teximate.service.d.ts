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
import { TeximateOptions, Line } from '../helper/teximate.class';
/** This service is not meant to be used outside TeximateModule
 *  Each component instance has service instance
 */
export declare class TeximateService {
    /** The text array coming from text factory */
    arr: Line[];
    /** a worker to teximate the array */
    worker: Subject<{}>;
    /** the teximated text to be displayed on the view */
    text: Subject<{}>;
    constructor();
    run(text: string, options: TeximateOptions, type: string): void;
    runEffect(options: TeximateOptions, type: string): void;
    lettersJob(textArr: any, options: TeximateOptions): Observable<any>;
    wordsJob(textArr: any, options: TeximateOptions): Observable<any>;
}
