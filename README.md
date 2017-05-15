<p align="center">
  <img height="150px" width="150px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ng-teximate/9acbe5dd/assets/logo.svg">
  <h1 align="center">Angular Teximate</h1>
  <p align="center">A simple module for CSS3 text animations.</p>
</p>

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ng-teximate)
[![npm](https://img.shields.io/npm/v/ng-teximate.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-teximate) 
[![Travis branch](https://travis-ci.org/MurhafSousli/ng-teximate.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng-teximate) 
[![npm](https://img.shields.io/npm/dt/ng-teximate.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-teximate)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

___

<p align="center"><img src="https://cdn.rawgit.com/MurhafSousli/ng-teximate/9acbe5dd/assets/preview.gif" style="max-width:100%;"></a></p>


### Teximate does 2 things:

 - Creates lines, words and letters elements from a text
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

## Usage

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

Install it `npm install animate.css --save` and import it in your global style

```css
/* You can add global styles to this file, and also import other style files */
@import '~animate.css';
```

another way is to import in `index.html` using the CDN 

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
```

Now you can use **Teximate** component:

```ts
<teximate [text]="text" [effect]="effectOptions" [hover]="hoverOptions"></teximate>
```

```ts
export class SomeComponent {

  text = 'Teximate is working...';

  effectOptions: TeximateOptions = {
    type: 'letter',
    animation: { name: 'zoomInLeft', duration: 1000 },
    word: { type: TeximateOrder.SHUFFLE, delay: 100 },
    letter: { type: TeximateOrder.SHUFFLE, delay: 50 }
  };

  hoverOptions: TeximateHover = {
    type: 'letter',
    in: 'zoomOutUp',
    out: 'bounceInDown'
  };
}  
```

Teximate animates the text automatically by changing the inputs. 

Moreover, You can manually run an animation using the component reference and then call `teximate.runEffect(options)`.

**Example:**

```ts
@ViewChild(TeximateComponent) teximate: TeximateComponent;

ngOnInit(){

  const diffOptions: TeximateOptions = {
    type: 'letter',
    animation: { name: 'jello', duration: 1000 },
    word: { type: TeximateOrder.SEQUENCE, delay: 100 },
    letter: { type: TeximateOrder.SEQUENCE, delay: 50 }
  };

  // run a different animation after 2 seconds
  setTimeout(()=>{
    this.teximate.runEffect(diffOptions, 'letter');
  }, 2000);
}
```

### Styling:

Add styles to lines, words and letters of the text by using the classes `.line` `.word` `.letter`
 
for example:

```css
/** Add the custom css in the global style, not in the component stylesheet */
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

### Teximate Inputs:


  - `text: string`                        text to be displayed

  - `effect: TeximateOptions`             choose animation class and its duration
 
```
options: {                                
    type: string                          either `'word'` or `'letter'`
    animation: { 
        name: string                      animation class name (animate.css)
        duration: number                  animation duration in ms (setting css animation-duration)
    },
    word: { 
        type: string                      order (SEQUENCE, REVERSE, SHUFFLE, SYNC)
        delay: number                     delay between each word and the next one in ms
    },
    letter: { 
        type: :string                     order (SEQUENCE, REVERSE, SHUFFLE, SYNC)
        delay: number                     delay after each letter and the next one in ms
    }
};
```

 - `hover: TeximateHover`                 choose hover animation classes

```
options: {                                
    type: string                          'word' or 'letter' or 'off'
    in: string                            mouseover in animation class name
    out: string                           mouseover out animation class name
};
```

When mouse is over an animated element it the `in` animation starts, the `out` animtion starts after the animation duration.


 ******
 
What else? If you find this module helpful support it with a star ⭐, this will help me to push updates more frequently.

## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

## Issues

If you identify any errors in this module, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng-teximate/issues). I am excited to see what the community thinks of this project, and I would love your input!
