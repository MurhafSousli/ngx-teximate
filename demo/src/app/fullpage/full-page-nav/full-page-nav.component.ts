import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FullPageComponent } from '../full-page/full-page.component';

@Component({
    selector: 'full-page-nav',
    templateUrl: './full-page-nav.component.html',
    styleUrls: ['./full-page-nav.component.scss']
})
export class FullPageNavComponent implements OnInit {

    @Input() buttons = [];
    @Output() clicked = new EventEmitter<any>();


    ngOnInit() {
    }

}
