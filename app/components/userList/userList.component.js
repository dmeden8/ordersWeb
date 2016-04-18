System.register(['angular2/core', 'angular2/common', 'ng2-table/ng2-table', 'ng2-bootstrap/ng2-bootstrap', "../header/header", "angular2/router", "../../resources", "../../services/user.service", "rxjs/Observable", "./columnButtonUser", "./columnStatusUser"], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_table_1, ng2_bootstrap_1, header_1, router_1, resources_1, user_service_1, Observable_1, columnButtonUser_1, columnStatusUser_1;
    var UserList;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (columnButtonUser_1_1) {
                columnButtonUser_1 = columnButtonUser_1_1;
            },
            function (columnStatusUser_1_1) {
                columnStatusUser_1 = columnStatusUser_1_1;
            }],
        execute: function() {
            UserList = (function () {
                function UserList(_userService, myService, _router) {
                    this._userService = _userService;
                    this.myService = myService;
                    this._router = _router;
                    this.rows = [];
                    this.columns = [
                        { title: 'Status', name: 'status', custom: columnStatusUser_1.ColumnStatusUser },
                        { title: 'Ime obrta', name: 'name' },
                        { title: 'E-mail', name: 'email', sort: 'desc' },
                        { title: 'Adresa', name: 'address', sort: 'desc' },
                        { title: 'Detalji', name: 'id', custom: columnButtonUser_1.ColumnButtonUser },
                    ];
                    this.page = 1;
                    this.itemsPerPage = 10;
                    this.maxSize = 5;
                    this.numPages = 1;
                    this.length = 0;
                    this.config = {
                        paging: true,
                        sorting: false,
                        filtering: { filterString: '', columnName: 'name' }
                    };
                    this.tenantId = this.myService.getTenantId();
                    this.data = [];
                }
                UserList.prototype.ngOnInit = function () {
                    this.getUsersForTenant(this.tenantId);
                };
                UserList.prototype.refresh = function () {
                    this.getUsersForTenant(this.tenantId);
                    var link = ['Users'];
                    this._router.navigate(link);
                };
                UserList.prototype.getUsersForTenant = function (tenantId) {
                    var _this = this;
                    this.getUsersForTenantInterval(tenantId)
                        .subscribe(function (response) {
                        _this.data = response;
                        _this.length = _this.data.length;
                        _this.onChangeTableInitial(_this.config, null);
                    }, function (err) { return _this._router.navigate(['Login']); });
                };
                UserList.prototype.getUsersForTenantInterval = function (tenantId) {
                    var _this = this;
                    return Observable_1.Observable
                        .interval(this.myService.getUsersIntervalRefresh())
                        .startWith(0)
                        .switchMap(function () {
                        return _this._userService.getUsersForTenant(tenantId);
                    });
                };
                UserList.prototype.changePage = function (page, data) {
                    if (data === void 0) { data = this.data; }
                    //console.log(page);
                    var start = (page.page - 1) * page.itemsPerPage;
                    var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
                    return data.slice(start, end);
                };
                UserList.prototype.changeSort = function (data, config) {
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
                UserList.prototype.changeFilter = function (data, config) {
                    var _this = this;
                    if (!config.filtering) {
                        return data;
                    }
                    var filteredData = data.filter(function (item) {
                        return item[config.filtering.columnName].match(_this.config.filtering.filterString);
                    });
                    return filteredData;
                };
                UserList.prototype.onChangeTable = function (config, page) {
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
                UserList.prototype.onChangeTableInitial = function (config, page) {
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
                UserList = __decorate([
                    core_1.Component({
                        selector: 'user-list',
                        templateUrl: 'app/components/userList/userList.component.html',
                        directives: [header_1.WrapperCmp, ng2_table_1.NG_TABLE_DIRECTIVES, common_1.NgClass, common_1.NgIf, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, resources_1.MyResourcesService, router_1.Router])
                ], UserList);
                return UserList;
            }());
            exports_1("UserList", UserList);
        }
    }
});
//# sourceMappingURL=userList.component.js.map