import {Component, OnInit}       from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {UserService} from "./services/user.service";
import {OrderService} from "./services/order.service";
import {MyResourcesService} from "./resources";
import {OrderList} from "./components/orderList/orderList.component";
import {UserList} from "./components/userList/userList.component";
import {ItemList} from "./components/itemList/itemList.component";
import {LoginComponent} from './components/login/login.component';
import {ItemService} from "./services/item.service";
import {OrderDetail} from "./components/orderDetail/orderDetail.component";
import {UserDetail} from "./components/userDetail/userDetail.component";
import {ItemCategory} from "./components/itemCategory/itemCategory.component";
import {CategoryService} from "./services/category.service";
import {ItemDetail} from "./components/itemDetail/itemDetail.component";
//import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
    selector: 'app',
    template: `
        <router-outlet></router-outlet>
      `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        UserService,
        OrderService,
        ItemService,
        CategoryService
    ]
    //bindings: [TranslateService],
    //pipes: [TranslatePipe]
})

@RouteConfig([
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
        useAsDefault: true
    },
    {
        path: '/orders',
        name: 'Orders',
        component: OrderList
    },
    {
        path: '/users',
        name: 'Users',
        component: UserList
    },
    {
        path: '/items/:categoryId',
        name: 'ItemList',
        component: ItemList
    },
    {
        path: '/order/:orderId',
        name: 'OrderDetails',
        component: OrderDetail
    },
    {
        path: '/user/:userId',
        name: 'UserDetails',
        component: UserDetail
    },
    {
        path: '/item/:itemId',
        name: 'ItemDetails',
        component: ItemDetail
    },
    {
        path: '/category/:categoryId',
        name: 'ItemCategory',
        component: ItemCategory
    },

])

export class AppComponent {
    title = 'Narudžbe Grga';

    userLang = 'en'

    /*
    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use(this.userLang );
        translate.getTranslation(this.userLang );
    }
    */

}
