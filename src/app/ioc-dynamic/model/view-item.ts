import { Type } from '@angular/core';

export class ViewItem {
    constructor( public component: Type<any>, public data: any = null ) {

    }
}
