<p align="center">
  <img height="150px" width="150px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ng-teximate/9acbe5dd/assets/logo.svg">
  <h1 align="center">Angular text animation plugin</h1>
</p>

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-teximate)
[![npm](https://img.shields.io/npm/v/ngx-teximate.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-teximate) 
[![Travis branch](https://travis-ci.org/MurhafSousli/ngx-teximate.svg?branch=master)](https://travis-ci.org/MurhafSousli/ngx-teximate) 
[![npm](https://img.shields.io/npm/dt/ngx-teximate.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-teximate)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

___

Text animation plugin built on top of Angular animation engine

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

Now you can use **Teximate** component:

```xml
<teximate [text]="text" [enter]="enterAnimation"></teximate>
```

```ts
import { fadeInDown } from 'ng-animate';
import { TextAnimation } from 'ngx-teximate';

export class AppComponent {

 text = 'Lorem ipsum dolor sit amet.';
 
  enterAnimation: TextAnimation = {
    animation: fadeInDown,
    delay: 50,
    type: 'letter'
  };
}  
```

See [stackblitz demo]()

## Issues

If you identify any errors in this module, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ngx-teximate/issues).


## Author

 **Murhaf Sousli**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)
