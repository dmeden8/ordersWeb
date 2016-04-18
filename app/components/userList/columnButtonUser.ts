import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgTableOnCustomInit} from 'ng2-table/ng2-table';

@Component({
    selector: 'column-button-user',
    template: '<button (click)="goToDetail(user_id)" class="btn btn-primary btn-xs">Vidi detalje</button>'
})

export class ColumnButtonUser implements NgTableOnCustomInit {
    public user_id: string;

    constructor(private _router: Router) {
    }

    public ngTableOnInit(index: number, row: any) {
        this.user_id = row.id;
    }

    goToDetail(id: string) {
        let link = ['UserDetails', { userId: id}];
        this._router.navigate(link);
    }
}