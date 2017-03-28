import { OnChanges, Renderer2, ElementRef, SimpleChanges, OnDestroy } from '@angular/core';
import { TeximateOptions } from '../helper/teximate.class';
import { TeximateService } from '../service/teximate.service';
export declare class TeximateComponent implements OnChanges, OnDestroy {
    teximate: TeximateService;
    private renderer;
    style: HTMLElement;
    jobText: string;
    jobType: string;
    /** Default effect */
    jobEffect: TeximateOptions;
    text: string;
    type: string;
    effect: any;
    constructor(teximate: TeximateService, renderer: Renderer2, el: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    runEffect(options: TeximateOptions, type: string): void;
    setAnimationDuration(duration: any): void;
    ngOnDestroy(): void;
}
