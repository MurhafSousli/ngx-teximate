import { Line } from './teximate.class';
export declare module Helper {
    /** Shuffle Array */
    const shuffle: (array: any) => any;
    /** Return 3d array from the text */
    const textFactory: (text: any) => Line[];
    const processWord: (options: any, arr: any, i: any, prevWordLength: any) => {
        letters: any;
        delay: any;
    };
    const processLetter: (options: any, arr: any, i: any) => {
        item: any;
        delay: any;
    };
}
