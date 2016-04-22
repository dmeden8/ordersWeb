System.register(['angular2/core', 'angular2/common', 'ng2-table/ng2-table', 'ng2-bootstrap/ng2-bootstrap', "../header/header", "angular2/router", "../../resources", "../../services/order.service", "rxjs/Observable", "./columnButtonOrder", "./columnStatusOrder"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, ng2_table_1, ng2_bootstrap_1, header_1, router_1, resources_1, order_service_1, Observable_1, columnButtonOrder_1, columnStatusOrder_1;
    var OrderList;
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
            },
            function (resources_1_1) {
                resources_1 = resources_1_1;
            },
            function (order_service_1_1) {
                order_service_1 = order_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (columnButtonOrder_1_1) {
                columnButtonOrder_1 = columnButtonOrder_1_1;
            },
            function (columnStatusOrder_1_1) {
                columnStatusOrder_1 = columnStatusOrder_1_1;
            }],
        execute: function() {
            OrderList = (function () {
                function OrderList(_orderService, myService, _router) {
                    this._orderService = _orderService;
                    this.myService = myService;
                    this._router = _router;
                    this.rows = [];
                    this.columns = [
                        { title: 'Status', name: 'status', custom: columnStatusOrder_1.ColumnStatusOrder },
                        { title: 'Korisnik', name: 'userName' },
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
                        filtering: { filterString: '', columnName: 'userName' }
                    };
                    this.tenantId = this.myService.getTenantId();
                    this.data = [];
                }
                OrderList.prototype.ngOnInit = function () {
                    this.getOrdersForTenant(this.tenantId);
                };
                OrderList.prototype.refresh = function () {
                    this.getOrdersForTenant(this.tenantId);
                    var link = ['Orders'];
                    this._router.navigate(link);
                };
                OrderList.prototype.filterByStatus = function (orderStatus) {
                    this.getOrdersForStatus(this.tenantId, orderStatus);
                    var link = ['Orders'];
                    this._router.navigate(link);
                };
                OrderList.prototype.getOrdersForTenant = function (tenantId) {
                    var _this = this;
                    this.getOrdersForTenantInterval(tenantId).
                        subscribe(function (response) {
                        _this.data = response;
                        _this.length = _this.data.length;
                        _this.onChangeTableInitial(_this.config, null);
                    }, function (err) { return _this._router.navigate(['Login']); });
                };
                OrderList.prototype.getOrdersForStatus = function (tenantId, orderStatus) {
                    var _this = this;
                    return this._orderService.getOrdersForStatus(tenantId, orderStatus)
                        .subscribe(function (response) {
                        _this.data = response;
                        _this.length = _this.data.length;
                        _this.onChangeTableInitial(_this.config, null);
                    }, function (err) { return _this._router.navigate(['Login']); });
                };
                OrderList.prototype.getOrdersForTenantInterval = function (tenantId) {
                    var _this = this;
                    return Observable_1.Observable
                        .interval(this.myService.getOrdersIntervalRefresh())
                        .startWith(0)
                        .switchMap(function () {
                        return _this._orderService.getOrderList(tenantId, null);
                    });
                };
                OrderList.prototype.changePage = function (page, data) {
                    if (data === void 0) { data = this.data; }
                    //console.log(page);
                    var start = (page.page - 1) * page.itemsPerPage;
                    var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
                    return data.slice(start, end);
                };
                OrderList.prototype.changeSort = function (data, config) {
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
                OrderList.prototype.changeFilter = function (data, config) {
                    var _this = this;
                    if (!config.filtering) {
                        return data;
                    }
                    var filteredData = data.filter(function (item) {
                        return item[config.filtering.columnName].match(_this.config.filtering.filterString);
                    });
                    return filteredData;
                };
                OrderList.prototype.onChangeTable = function (config, page) {
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
                OrderList.prototype.onChangeTableInitial = function (config, page) {
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
                OrderList = __decorate([
                    core_1.Component({
                        selector: 'order-list',
                        templateUrl: 'app/components/orderList/orderList.component.html',
                        directives: [header_1.WrapperCmp, ng2_table_1.NG_TABLE_DIRECTIVES, common_1.NgClass, common_1.NgIf, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES, columnButtonOrder_1.ColumnButtonOrder]
                    }), 
                    __metadata('design:paramtypes', [order_service_1.OrderService, resources_1.MyResourcesService, router_1.Router])
                ], OrderList);
                return OrderList;
            })();
            exports_1("OrderList", OrderList);
        }
    }
});
//# sourceMappingURL=orderList.component.js.map