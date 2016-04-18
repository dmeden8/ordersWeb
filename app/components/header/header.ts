import {Component, ElementRef} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Dropdown, DropdownMenu, DropdownToggle, Accordion} from 'ng2-bootstrap/ng2-bootstrap';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Router} from "angular2/router";
import {OnInit} from "angular2/core";
import {MyResourcesService} from "../../resources";

@Component({
  selector: 'header-notification',
  templateUrl: 'app/components/header/header-notification.html',
  directives: [Dropdown, DropdownMenu, DropdownToggle, ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  viewProviders: [Dropdown, DropdownMenu, DropdownToggle, ElementRef]
})
export class HeaderNotification {

  constructor(private _router: Router) {}

  toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

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
  directives: [ROUTER_DIRECTIVES, SidebarSearch, Accordion],
})
export class Sidebar {

  constructor(private myService:MyResourcesService) {}

  rootCategoryId = this.myService.getRootCategoryId;

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
