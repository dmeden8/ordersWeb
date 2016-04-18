import {Component, EventEmitter, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from 'angular2/common';

import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import {WrapperCmp} from "../header/header";
import {OrderItem} from "../../data/orderItem";
import {Router} from "angular2/router";
import {MyResourcesService} from "../../resources";
import {OrderService} from "../../services/order.service";
import {Observable} from "rxjs/Observable";
import {RouteParams} from "angular2/router";
import {Order} from "../../data/order";
import {ItemService} from "../../services/item.service";
import {Item} from "../../data/item";


@Component({
    selector: 'item-detail',
    templateUrl: 'app/components/itemDetail/itemDetail.component.html',
    directives: [WrapperCmp,NG_TABLE_DIRECTIVES, NgClass, NgIf, CORE_DIRECTIVES, FORM_DIRECTIVES,PAGINATION_DIRECTIVES]
})
export class ItemDetail implements OnInit {


    public item = new Item('','','','','','','');

    constructor(private _itemService: ItemService,
                private _routeParams: RouteParams,
                private _router: Router) {
    }

    goBack() {
        window.history.back();
    }

    ngOnInit() {
        this.getItemDetails(this._routeParams.get('itemId'));
    }

    getItemDetails(itemId: string) {
        return this._itemService.getItemDetails(itemId)
            .subscribe(
                (response) => {
                    this.item = response;
                },
                (err) => this._router.navigate(['Login'])
            );
    }

}