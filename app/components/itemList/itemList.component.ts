import {Component, EventEmitter, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from 'angular2/common';
import {Router} from "angular2/router";
import {Observable} from "rxjs/Observable";

import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import {WrapperCmp} from "../header/header";
import {MyResourcesService} from "../../resources";
import {ItemService} from "../../services/item.service";
import {Item} from "../../data/item";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteParams} from "angular2/router";
import {ColumnButtonItem} from "./columnButtonItem";



@Component({
    selector: 'item-list',
    templateUrl: 'app/components/itemList/itemList.component.html',
    directives: [WrapperCmp,NG_TABLE_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES, PAGINATION_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class ItemList implements OnInit {
    public rows:Array<any> = [];
    public columns:Array<any> = [
        {title: 'Naziv proizvoda', name: 'name'},
        {title: 'Mjera', name: 'measure'},
        {title: 'Cijena MPC', name: 'mpcPrice'},
        {title: 'Detalji', name: 'id', custom: ColumnButtonItem},
    ];
    public page:number = 1;
    public itemsPerPage:number = 10;
    public maxSize:number = 5;
    public numPages:number = 1;
    public length:number = 0;

    public config:any = {
        paging: true,
        sorting: false,
        filtering: {filterString: '', columnName: 'name'}
    };


    public data: Item[];
    tenantId = this.myService.getTenantId();
    categoryName: string;




    constructor(private _itemService: ItemService,
                private myService:MyResourcesService,
                private _routeParams: RouteParams,
                private _router: Router) {

        this.data = [];
    }

    ngOnInit() {
        this.getItemsForCategory(this.tenantId, this._routeParams.get('categoryId'));
    }

    goBack() {
        window.history.back();
    }

    getItemsForCategory(tenantId: string, categoryId: string) {
         return this._itemService.getItemList(tenantId, categoryId)
            .subscribe(
                (response) => {
                    this.data = response;
                    this.categoryName = this.data[0].categoryName;
                    this.length = this.data.length;
                    this.onChangeTableInitial(this.config, null);
                },
                (err) => this._router.navigate(['Login'])
            );
    }

    changePage(page:any, data:any = this.data):Array<any> {
        //console.log(page);
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;

        return data.slice(start, end);
    }

    changeSort(data:any, config:any) {
        if (!config.sorting) {
            return data;
        }

        // simple sorting
        return data.sort((previous:any, current:any) => {
            let columns = this.config.sorting.columns || [];
            for (let i = 0; i < columns.length; i++) {
                let columnName = columns[i].name;

                if (previous[columnName] > current[columnName]) {
                    return columns[i].sort === 'desc' ? -1 : 1;
                }
                if (previous[columnName] < current[columnName]) {
                    return columns[i].sort === 'asc' ? -1 : 1;
                }
            }
            return 0;
        });
    }

    changeFilter(data:any, config:any):any {
        if (!config.filtering) {
            return data;
        }

        let filteredData:any = data.filter((item:any) =>
            item[config.filtering.columnName].match(this.config.filtering.filterString));

        return filteredData;
    }

    onChangeTable(config:any, page:any = config.paging) {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = this.changePage(page, sortedData).slice(0,this.itemsPerPage);
        this.length = sortedData.length;
    }

    onChangeTableInitial(config:any, page:any = config.paging) {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData.slice(0,this.itemsPerPage);
        this.length = sortedData.length;
    }
}