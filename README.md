<p align="center">
  <img height="150px" width="150px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ng-teximate/9acbe5dd/assets/logo.svg">
  <h1 align="center">Angular text animation plugin</h1>
</p>

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-teximate)
[![npm](https://img.shields.io/npm/v/ngx-teximate.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-teximate) 
[![Travis branch](https://travis-ci.org/MurhafSousli/ngx-teximate.svg?branch=master)](https://travis-ci.org/MurhafSousli/ngx-teximate) 
[![npm](https://img.shields.io/npm/dt/ngx-teximate.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-teximate)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-teximate.svg)](https://bundlephobia.com/result?p=ngx-teximate)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](https://github.com/MurhafSousli/ngx-teximate/blob/master/LICENSE)

___

A text animation plugin built on top of Angular animation engine

## Installation

**NPM**

```
npm install -S ngx-teximate ng-animate
```

**YARN**

```
yarn add ngx-teximate ng-animate
```

 > **NOTE:** `ng-animate` package is just a collection of reusable animations and it is not required for Teximate to work


## Usage

Import **TeximateModule** in your root module

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeximateModule } from 'ngx-teximate';

@NgModule({
  imports: [
    BrowserAnimationsModule,  // Add this only in the root module
    TeximateModule
  ]
})
```

1. Add `<teximate>` component into your template
2. Create a `TextAnimation` object and pass it to on of these inputs `[enter]` `[leave]` `[animation]`.
3. Pick the animation you like from `ng-animate` and set it in the `TextAnimation` object

#### Example:

```ts
import { Component } from '@angular/core';
import { TextAnimation } from 'ngx-teximate';
import { fadeInDown } from 'ng-animate';

@Component({
  selector: 'app-root',
  template: `
    <teximate [text]="text" [enter]="enterAnimation"></teximate>
  `
})
export class AppComponent {

  text = 'Lorem ipsum dolor sit amet.';
 
  enterAnimation: TextAnimation = {
    animation: fadeInDown,
    delay: 50,
    type: 'letter'
  };
}  
```

There are 3 main animations inputs `[enter]`, `[leave]` and `[animation]`, but you can still register more animations

#### Example:

```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TextAnimation } from 'ngx-teximate';
import { fadeInDown } from 'ng-animate';

@Component({
  selector: 'app-root',
  template: `
    <teximate [text]="text"></teximate>
    <button (click)="play()"></button>
  `
})
export class AppComponent implements AfterViewInit {

  @ViewChild(Teximate): teximate: Teximate;

  text = 'Lorem ipsum dolor sit amet.';
  
  ngAfterViewInit() {
    const customAnimation: TextAnimation = {
      id: 'custom',
      animation: fadeInDown,
      delay: 50,
      type: 'letter'
    };
    this.teximate.registerAnimation(customAnimation);
  }
  
  play() {
    if (this.teximate.players.has('custom')) {
      this.teximate.players.get('custom').play();
    }
  }
}   
```

## API

| Name                     | type          | Description                                                      |
| ------------------------ |-------------- | ---------------------------------------------------------------- |
| **[text]**               | string        | Text to animate                                                  |
| **[animation]**          | TextAnimation | Default animation, played using `teximate.defaultPlayer.play()`  |
| **[enter]**              | TextAnimation | Enter animation, played on init                                  |
| **[leave]**              | TextAnimation | Leave animation, played on destroy (WIP)                         |
| **(play)**               | string        | Stream that emits when text animation is played                  |
| **(finish)**             | string        | Stream that emits when text animation is finished                |
| **(paragraphClick)**     | MouseEvent    | Stream that emits when a paragraph is clicked                    |
| **(wordClick)**          | MouseEvent    | Stream that emits when a word is clicked                         |
| **(letterClick)**        | MouseEvent    | Stream that emits when a letter is clicked                       |
| **(paragraphHover)**     | MouseEvent    | Stream that emits when a paragraph is hovered                    |
| **(wordHover)**          | MouseEvent    | Stream that emits when a word is hovered                         |
| **(letterHover)**        | MouseEvent    | Stream that emits when a letter is hovered                       |

See the [stackblitz demo](https://stackblitz.com/edit/ngx-teximate).

## Issues

If you identify any errors in this module, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ngx-teximate/issues).

## Support

Please give **Teximate** a :star: 

[![npm](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/bePatron?u=5594898)

## Author

 **Murhaf Sousli**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)
