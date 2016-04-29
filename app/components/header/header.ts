import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Router} from "angular2/router";
import {OnInit} from "angular2/core";
import {MyResourcesService} from "../../resources";
import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {OrderService} from "../../services/order.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'header-notification',
  templateUrl: 'app/components/header/header-notification.html',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})

export class HeaderNotification {

  logout(){
    localStorage.removeItem('id_token');
  }
}

@Component({
  selector: 'sidebar-search',
  templateUrl: 'app/components/header/sidebar-search.html',
  directives: []
})
export class SidebarSearch {
}

@Component({
  selector: 'sidebar',
  templateUrl: 'app/components/header/sidebar.html',
  directives: [ROUTER_DIRECTIVES, SidebarSearch],
})

export class Sidebar implements OnInit {

  public numOfNewOrders: any;
  public numOfNewUsers: any;
  rootCategoryId = this.myService.getRootCategoryId;

  constructor(private myService:MyResourcesService,
              private _orderService: OrderService,
              private _userService: UserService
  ) {}

  ngOnInit() {
    this.countNewOrderByStatus();
    this.countNewUserByStatus();
  }

  countNewOrderByStatus() {
      this.countNewOrderByStatusInterval()
        .subscribe(
            (response) => {
              this.numOfNewOrders = response;
            }
            //(err) => this._router.navigate(['Login'])
        );
  }

  countNewOrderByStatusInterval() {
    return Observable
        .interval(this.myService.getOrdersIntervalRefresh())
        .startWith(0)
        .switchMap(() => {
          return this._orderService.countByStatus('N');
        });

  }

  countNewUserByStatus() {
    this.countNewUserByStatusInterval()
        .subscribe(
            (response) => {
              this.numOfNewUsers = response;
            }
            //(err) => this._router.navigate(['Login'])
        );
  }

  countNewUserByStatusInterval() {
    return Observable
        .interval(this.myService.getOrdersIntervalRefresh())
        .startWith(0)
        .switchMap(() => {
          return this._userService.countByStatus('N');
        });

  }

}

@Component({
  selector: 'header',
  templateUrl: 'app/components/header/header.html',
  directives: [Sidebar, HeaderNotification]
})
export class Header implements OnInit {

  username = '';

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

}

@Component({
  selector: 'wrapper',
  template: `<div id="wrapper">
      <header></header>
      <div id="page-wrapper" style="min-height: 561px;">
        <ng-content></ng-content>
      </div>
    </div>`,
  directives: [Header, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class WrapperCmp {
}
