System.register(['angular2/core', 'angular2/http', 'angular2/router', "./services/user.service", "./services/order.service", "./components/orderList/orderList.component", "./components/userList/userList.component", "./components/itemList/itemList.component", './components/login/login.component', "./services/item.service", "./components/orderDetail/orderDetail.component", "./components/userDetail/userDetail.component", "./components/itemCategory/itemCategory.component", "./services/category.service", "./components/itemDetail/itemDetail.component", "./components/discountItemList/discountItemList.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, user_service_1, order_service_1, orderList_component_1, userList_component_1, itemList_component_1, login_component_1, item_service_1, orderDetail_component_1, userDetail_component_1, itemCategory_component_1, category_service_1, itemDetail_component_1, discountItemList_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (order_service_1_1) {
                order_service_1 = order_service_1_1;
            },
            function (orderList_component_1_1) {
                orderList_component_1 = orderList_component_1_1;
            },
            function (userList_component_1_1) {
                userList_component_1 = userList_component_1_1;
            },
            function (itemList_component_1_1) {
                itemList_component_1 = itemList_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (orderDetail_component_1_1) {
                orderDetail_component_1 = orderDetail_component_1_1;
            },
            function (userDetail_component_1_1) {
                userDetail_component_1 = userDetail_component_1_1;
            },
            function (itemCategory_component_1_1) {
                itemCategory_component_1 = itemCategory_component_1_1;
            },
            function (category_service_1_1) {
                category_service_1 = category_service_1_1;
            },
            function (itemDetail_component_1_1) {
                itemDetail_component_1 = itemDetail_component_1_1;
            },
            function (discountItemList_component_1_1) {
                discountItemList_component_1 = discountItemList_component_1_1;
            }],
        execute: function() {
            //import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Narudžbe Grga';
                    this.userLang = 'en';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        template: "\n        <router-outlet></router-outlet>\n      ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS,
                            user_service_1.UserService,
                            order_service_1.OrderService,
                            item_service_1.ItemService,
                            category_service_1.CategoryService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_component_1.LoginComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/orders',
                            name: 'Orders',
                            component: orderList_component_1.OrderList
                        },
                        {
                            path: '/users',
                            name: 'Users',
                            component: userList_component_1.UserList
                        },
                        {
                            path: '/items/:categoryId',
                            name: 'ItemList',
                            component: itemList_component_1.ItemList
                        },
                        {
                            path: '/order/:orderId',
                            name: 'OrderDetails',
                            component: orderDetail_component_1.OrderDetail
                        },
                        {
                            path: '/user/:userId',
                            name: 'UserDetails',
                            component: userDetail_component_1.UserDetail
                        },
                        {
                            path: '/item/:itemId',
                            name: 'ItemDetails',
                            component: itemDetail_component_1.ItemDetail
                        },
                        {
                            path: '/category/:categoryId',
                            name: 'ItemCategory',
                            component: itemCategory_component_1.ItemCategory
                        },
                        {
                            path: '/discount',
                            name: 'DiscountItems',
                            component: discountItemList_component_1.DiscountItemList
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map