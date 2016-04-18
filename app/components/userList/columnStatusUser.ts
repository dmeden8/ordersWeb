import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgTableOnCustomInit} from 'ng2-table/ng2-table';
import {CORE_DIRECTIVES} from 'angular2/common'

@Component({
    directives: [CORE_DIRECTIVES],
    selector: 'column-status-user',
    template: `<div *ngIf="status == 'N'">
                    <div class="alert alert-warning">ČEKA NA ODOBRENJE</div>
               </div>
               <div *ngIf="status == 'A'">
                    <div class="alert alert-success">AKTIVAN</div>
               </div>
               <div *ngIf="status == 'S'">
                    <div class="alert alert-danger">SUSPENDIRAN</div>
               </div>`
})

export class ColumnStatusUser implements NgTableOnCustomInit {
    public status: string;

    constructor(private _router: Router) {
    }

    public ngTableOnInit(index: number, row: any) {
        this.status = row.status;
    }

}