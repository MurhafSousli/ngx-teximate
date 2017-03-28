 <img data-canonical-src="https://www.npmjs.com/package/ng-teximate" src="https://img.shields.io/npm/v/ng-teximate.svg?maxAge=2592000?style=plastic">
<img data-canonical-src="https://travis-ci.org/MurhafSousli/ng-teximate" src="https://travis-ci.org/MurhafSousli/ng-teximate.svg?branch=master">
<img data-canonical-src="https://www.npmjs.com/package/ng-teximate" src="https://img.shields.io/npm/dt/ng-teximate.svg?maxAge=2592000?style=plastic">
     
<p align="center">
  <img height="300px" width="300px" src="https://cdn.rawgit.com/MurhafSousli/ng-teximate/9acbe5dd/assets/logo.svg" style="max-width:100%;">
  </p>

<h1 align="center">Angular Teximate</h1>

<p align="center"><img src="https://cdn.rawgit.com/MurhafSousli/ng-teximate/9acbe5dd/assets/preview.gif" style="max-width:100%;"></a>
  </p>

A simple module for CSS3 text animations | [live demo](https://murhafsousli.github.io/ng-teximate/)


### Teximate does 2 things:

 - Create lines, words and letters elements from a text, so they can be styled individually using their classes.
 - Animate words or letters using animate.css.

## Installation

Install it with npm

`npm install ng-teximate --save`

### SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, `map` needs to tell the System loader where to look for `ng-teximate`:

```js
map: {
  'ng-teximate': 'node_modules/ng-teximate/bundles/ng-teximate.umd.js',
}
```

Here is a working [plunker](https://plnkr.co/edit/DqQ9mUVcNbAc2vOgGZVy?p=preview)

## Add Teximate module

Import **TeximateModule** in your root module

```ts
import {TeximateModule} from "ng-teximate";
@NgModule({
  imports: [
    TeximateModule
  ]
})
```
Teximate uses [animate.css](https://daneden.github.io/animate.css/) to animate words/letters.

install it `npm install animate.css --save` and import it in your global style

```css
/* You can add global styles to this file, and also import other style files */
@import '~animate.css';
```

or import it using the CDN 
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
```

## Usage
 

```ts
<teximate [text]="text" [type]="type" [effect]="options"></teximate>
```

```ts
export class SomeComponent {

  text = 'It’s kind of fun to do the impossible. 👾';

  options: TeximateOptions = {
    animation: { name: 'zoomInLeft', duration: 1000 },
    word: { type: TeximateOrder.SHUFFLE, delay: 100 },
    letter: { type: TeximateOrder.SHUFFLE, delay: 50 }
  };

  type = 'letter';
  
  // Create another effect without

  @ViewChild(TeximateComponent) teximate: TeximateComponent;

  ngOnInit(){

    const diffOptions: TeximateOptions = {
      animation: { name: 'bounce', duration: 1000 },
      word: { type: TeximateOrder.SEQUENCE, delay: 100 },
      letter: { type: TeximateOrder.SEQUENCE, delay: 50 }
    };

    setTimeout(()=>{
      this.teximate.runEffect(diffOptions, 'letter');
    }, 2500);
  }
}  
```

Most often you won't need to use `ViewChild` and call `runEffect` because you can run the effect automatically by changing inputs.

You can also access any line, word or letter by by its class, for example you can apply the following css rules in the global `style.css`

```css
// apply style to all letters
.letter{
  text-shadow: 1px 1px 1px rgba(#000, .5);
}
// apply style to the second letter of a word
.letter2{
   color: blue;
}
.word1{
   background-color: red;
}
```

NOTE that this won't effect if you add the from your component style unless you activate `ViewEncapsulation.None` on it.

## TODO

 - On hover animation
 - On click animation
 
 What else? Support this module by giving it a star, this will help it to get updates and fixes more frequently

## Issues

If you identify any errors in this module, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-teximate/issues). I am excited to see what the community thinks of this project, and I would love your input!

## License

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)