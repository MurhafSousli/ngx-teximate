import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeximateComponent } from './component/teximate.component';
import { TeximateService } from './service/teximate.service';
var TeximateModule = (function () {
    function TeximateModule() {
    }
    return TeximateModule;
}());
export { TeximateModule };
TeximateModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [TeximateService],
                declarations: [TeximateComponent],
                exports: [TeximateComponent]
            },] },
];
/** @nocollapse */
TeximateModule.ctorParameters = function () { return []; };
//# sourceMappingURL=teximate.module.js.map