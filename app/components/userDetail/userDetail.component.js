System.register(['angular2/core', 'angular2/common', 'ng2-table/ng2-table', 'ng2-bootstrap/ng2-bootstrap', "../header/header", "angular2/router", "../../services/order.service", "../orderList/columnButtonOrder", "../orderList/columnStatusOrder", "../../services/user.service", "../../data/user", "../../data/orderFilter"], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_table_1, ng2_bootstrap_1, header_1, router_1, order_service_1, router_2, columnButtonOrder_1, columnStatusOrder_1, user_service_1, user_1, orderFilter_1;
    var UserDetail;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_table_1_1) {
                ng2_table_1 = ng2_table_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (header_1_1) {
                header_1 = header_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (order_service_1_1) {
                order_service_1 = order_service_1_1;
            },
            function (columnButtonOrder_1_1) {
                columnButtonOrder_1 = columnButtonOrder_1_1;
            },
            function (columnStatusOrder_1_1) {
                columnStatusOrder_1 = columnStatusOrder_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (orderFilter_1_1) {
                orderFilter_1 = orderFilter_1_1;
            }],
        execute: function() {
            UserDetail = (function () {
                function UserDetail(_orderService, _userService, _routeParams, _router) {
                    this._orderService = _orderService;
                    this._userService = _userService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.rows = [];
                    this.columns = [
                        { title: 'Status', name: 'status', custom: columnStatusOrder_1.ColumnStatusOrder },
                        { title: 'Vrijeme', name: 'creationTime', sort: 'desc' },
                        { title: 'Ukupna cijena', name: 'totalPrice', sort: 'desc' },
                        { title: 'Detalji', name: 'id', custom: columnButtonOrder_1.ColumnButtonOrder },
                    ];
                    this.page = 1;
                    this.itemsPerPage = 10;
                    this.maxSize = 5;
                    this.numPages = 1;
                    this.length = 0;
                    this.config = {
                        paging: true,
                        sorting: false,
                        filtering: false
                    };
                    this.user = new user_1.User('', '', '', '', '', '', '', '', '', '', '');
                    this.orderFilter = new orderFilter_1.OrderFilter();
                    this.data = [];
                }
                UserDetail.prototype.goBack = function () {
                    window.history.back();
                };
                UserDetail.prototype.ngOnInit = function () {
                    this.getUserDetails(this._routeParams.get('userId'));
                    this.getOrdersForUserAndTenant(this._routeParams.get('userId'));
                };
                UserDetail.prototype.getOrdersForUserAndTenant = function (userId) {
                    var _this = this;
                    this.orderFilter.setStatus(null);
                    this.orderFilter.setUserId(userId);
                    return this._orderService.getOrderList(this.orderFilter)
                        .subscribe(function (response) {
                        _this.data = response;
                        _this.length = _this.data.length;
                        _this.onChangeTableInitial(_this.config, null);
                    }, function (err) { return _this._router.navigate(['Login']); });
                };
                UserDetail.prototype.getUserDetails = function (userId) {
                    var _this = this;
                    return this._userService.getUserDetails(userId)
                        .subscribe(function (response) {
                        _this.user = response;
                    }, function (err) { return _this._router.navigate(['Login']); });
                };
                UserDetail.prototype.changeUserStatus = function (userStatus) {
                    var _this = this;
                    return this._userService.changeUserStatus(this._routeParams.get('userId'), userStatus)
                        .subscribe(function (response) {
                        _this.getUserDetails(_this._routeParams.get('userId'));
                    }, function (err) { return _this._router.navigate(['Login']); });
                };
                UserDetail.prototype.changePage = function (page, data) {
                    if (data === void 0) { data = this.data; }
                    //console.log(page);
                    var start = (page.page - 1) * page.itemsPerPage;
                    var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
                    return data.slice(start, end);
                };
                UserDetail.prototype.changeSort = function (data, config) {
                    var _this = this;
                    if (!config.sorting) {
                        return data;
                    }
                    // simple sorting
                    return data.sort(function (previous, current) {
                        var columns = _this.config.sorting.columns || [];
                        for (var i = 0; i < columns.length; i++) {
                            var columnName = columns[i].name;
                            if (previous[columnName] > current[columnName]) {
                                return columns[i].sort === 'desc' ? -1 : 1;
                            }
                            if (previous[columnName] < current[columnName]) {
                                return columns[i].sort === 'asc' ? -1 : 1;
                            }
                        }
                        return 0;
                    });
                };
                UserDetail.prototype.changeFilter = function (data, config) {
                    var _this = this;
                    if (!config.filtering) {
                        return data;
                    }
                    var filteredData = data.filter(function (item) {
                        return item[config.filtering.columnName].toLowerCase().match(_this.config.filtering.filterString.toLowerCase());
                    });
                    return filteredData;
                };
                UserDetail.prototype.onChangeTable = function (config, page) {
                    if (page === void 0) { page = config.paging; }
                    if (config.filtering) {
                        Object.assign(this.config.filtering, config.filtering);
                    }
                    if (config.sorting) {
                        Object.assign(this.config.sorting, config.sorting);
                    }
                    var filteredData = this.changeFilter(this.data, this.config);
                    var sortedData = this.changeSort(filteredData, this.config);
                    this.rows = this.changePage(page, sortedData).slice(0, this.itemsPerPage);
                    this.length = sortedData.length;
                };
                UserDetail.prototype.onChangeTableInitial = function (config, page) {
                    if (page === void 0) { page = config.paging; }
                    if (config.filtering) {
                        Object.assign(this.config.filtering, config.filtering);
                    }
                    if (config.sorting) {
                        Object.assign(this.config.sorting, config.sorting);
                    }
                    var filteredData = this.changeFilter(this.data, this.config);
                    var sortedData = this.changeSort(filteredData, this.config);
                    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData.slice(0, this.itemsPerPage);
                    this.length = sortedData.length;
                };
                UserDetail = __decorate([
                    core_1.Component({
                        selector: 'user-detail',
                        templateUrl: 'app/components/userDetail/userDetail.component.html',
                        directives: [header_1.WrapperCmp, ng2_table_1.NG_TABLE_DIRECTIVES, common_1.NgClass, common_1.NgIf, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [order_service_1.OrderService, user_service_1.UserService, router_2.RouteParams, router_1.Router])
                ], UserDetail);
                return UserDetail;
            }());
            exports_1("UserDetail", UserDetail);
        }
    }
});
//# sourceMappingURL=userDetail.component.js.map