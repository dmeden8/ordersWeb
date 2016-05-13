import {Component, EventEmitter, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from 'angular2/common';

import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import {WrapperCmp} from "../header/header";
import {Order} from "../../data/order";
import {Router} from "angular2/router";
import {MyResourcesService} from "../../resources";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs/Observable";
import {OrderService} from "../../services/order.service";
import {User} from "../../data/user";
import {ColumnButtonUser} from "./columnButtonUser";
import {ColumnStatusUser} from "./columnStatusUser";
import {UserFilter} from "../../data/userFilter";


@Component({
    selector: 'user-list',
    templateUrl: 'app/components/userList/userList.component.html',
    directives: [WrapperCmp,NG_TABLE_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES,PAGINATION_DIRECTIVES]
})
export class UserList implements OnInit {
    public rows:Array<any> = [];
    public columns:Array<any> = [
        {title: 'Status', name: 'status', custom: ColumnStatusUser},
        {title: 'Ime obrta', name: 'name'},
        {title: 'E-mail', name: 'email', sort: 'desc'},
        {title: 'Adresa', name: 'address', sort: 'desc'},
        {title: 'Detalji', name: 'id', custom: ColumnButtonUser},
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


    public data: any;

    userFilter = new UserFilter();

    constructor(private _userService: UserService,
                private myService:MyResourcesService,
                private _router: Router) {

        this.data = [];
    }

    ngOnInit() {
        this.getUsers();
    }

    refresh() {
        this.getUsers();
        let link = ['Users'];
        this._router.navigate(link);
    }

    filterByStatus(userStatus: string) {
        this.getUsersForStatus(userStatus);
        let link = ['Users'];
        this._router.navigate(link);
    }

    getUsers() {
         this.getUsersInterval()
            .subscribe(
                (response) => {
                    this.data = response;
                    this.length = this.data.length;
                    this.onChangeTableInitial(this.config, null);
                },
                (err) => this._router.navigate(['Login'])
            );
    }

    getUsersForStatus(userStatus: string) {

        this.userFilter.setStatus(userStatus);

        return this._userService.getUsers(this.userFilter)
            .subscribe(
                (response) => {
                    this.data = response;
                    this.length = this.data.length;
                    this.onChangeTableInitial(this.config, null);
                },
                (err) => this._router.navigate(['Login'])
            );
    }

    getUsersInterval() {

        this.userFilter.setStatus(null);

        return Observable
            .interval(this.myService.getUsersIntervalRefresh())
            .startWith(0)
            .switchMap(() => {
                return this._userService.getUsers(this.userFilter);
            });

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
            item[config.filtering.columnName].toLowerCase().match(this.config.filtering.filterString.toLowerCase()));

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