import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgTableOnCustomInit} from 'ng2-table/ng2-table';

@Component({
    selector: 'column-button-order',
    template: '<button (click)="goToDetail(item_id)" class="btn btn-primary btn-xs">Vidi detalje</button>'
})

export class ColumnButtonItem implements NgTableOnCustomInit {
    public item_id: string;

    constructor(private _router: Router) {
    }

    public ngTableOnInit(index: number, row: any) {
        this.item_id = row.id;
    }

    goToDetail(id: string) {
        let link = ['ItemDetails', { itemId: id}];
        this._router.navigate(link);
    }
}