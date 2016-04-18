import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgTableOnCustomInit} from 'ng2-table/ng2-table';

@Component({
    selector: 'column-button-order',
    template: '<button (click)="goToDetail(order_id)" class="btn btn-primary btn-xs">Vidi detalje</button>'
})

export class ColumnButtonOrder implements NgTableOnCustomInit {
    public order_id: string;

    constructor(private _router: Router) {
    }

    public ngTableOnInit(index: number, row: any) {
        this.order_id = row.id;
    }

    goToDetail(id: string) {
        let link = ['OrderDetails', { orderId: id}];
        this._router.navigate(link);
    }
}