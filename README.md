[![npm](https://img.shields.io/npm/v/ng-teximate.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-teximate) [![Travis branch](https://travis-ci.org/MurhafSousli/ng-teximate.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng-teximate) [![npm](https://img.shields.io/npm/dt/ng-teximate.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-teximate)
     
<p align="center">
  <img height="300px" width="300px" src="https://cdn.rawgit.com/MurhafSousli/ng-teximate/9acbe5dd/assets/logo.svg" style="max-width:100%;">
  </p>

<h1 align="center">Angular Teximate</h1>

<p align="center"><img src="https://cdn.rawgit.com/MurhafSousli/ng-teximate/9acbe5dd/assets/preview.gif" style="max-width:100%;"></a>
  </p>

A simple module for CSS3 text animations | [live demo](https://murhafsousli.github.io/ng-teximate/)


### Teximate does 2 things:

 - Creates lines, words and letters elements from a text, so they can be styled individually using their classes.
 - Animates words or letters using animate.css

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
Teximate uses [animate.css](https://daneden.github.io/animate.css/) to animate the words/letters.

install it `npm install animate.css --save` and in your global style import it

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
  
  // another way to apply an effect using component reference

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

Run an effect automatically by changing the inputs. another way is to use the component reference and call `runEffect(options, type)`.

Add styles to lines, words and letters of the text by using the classes `.line` `.word` `.letter`
 
for example:

```css
.letter{
  text-shadow: 1px 1px 1px rgba(#000, .5);
}
.word1{
   background-color: red;
}
.letter2{
   color: blue;
}
```

Note that the css rules should be in the global `style.css`. otherwise the style won't effect the text if you add them from your component style unless you use `encapsulation: ViewEncapsulation.None` on it.

### Teximate Options:


  - `text: string`                          text to be displayed

  - `type: string`                          either `'word'` or `'letter'`, play animation on your words/letters

  - `options: TeximateOptions`               choose animation class and its duration
 
```
  - options:                                effect options
      animation: { 
        name: string                        animation class name (animate.css)
        duration: number                    animation duration in ms (setting css animation-duration)
      },
      word: { 
        type: string                        (SEQUENCE, REVERSE, SHUFFLE, SYNC)
        delay: number                       delay between each word and the next one in ms
      },
      letter: { 
        type: :string                       (SEQUENCE, REVERSE, SHUFFLE, SYNC)
        delay: number                       delay after each letter and the next one in ms
      }
    };

  type = 'letter';
```


## TODO

 - On hover animation
 - On click animation
 
 What else? If you find this module helpful, support it with a star ⭐, this will help me to push updates more frequently.

## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

## Issues

If you identify any errors in this module, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-teximate/issues). I am excited to see what the community thinks of this project, and I would love your input!

## License

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)