import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgTableOnCustomInit} from 'ng2-table/ng2-table';
import {CORE_DIRECTIVES} from 'angular2/common'

@Component({
    directives: [CORE_DIRECTIVES],
    selector: 'column-status-order',
    template: `<div *ngIf="status == 'N'">
                    <div class="alert alert-danger">NOVO</div>
               </div>
               <div *ngIf="status == 'I'">
                    <div class="alert alert-warning">PREGLEDANO</div>
               </div>
               <div *ngIf="status == 'P'">
                    <div class="alert alert-info">U OBRADI</div>
               </div>
               <div *ngIf="status == 'F'">
                    <div class="alert alert-success">ZAVRŠENO</div>
               </div>`
})

export class ColumnStatusOrder implements NgTableOnCustomInit {
    public status: string;

    constructor(private _router: Router) {
    }

    public ngTableOnInit(index: number, row: any) {
        this.status = row.status;
    }

}