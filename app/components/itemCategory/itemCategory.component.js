System.register(['angular2/core', 'angular2/common', "angular2/router", 'ng2-table/ng2-table', 'ng2-bootstrap/ng2-bootstrap', "../header/header", "../../services/item.service", "../../services/category.service", "../itemList/columnButtonItem"], function(exports_1, context_1) {
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
    var core_1, common_1, router_1, ng2_table_1, ng2_bootstrap_1, header_1, item_service_1, category_service_1, router_2, router_3, columnButtonItem_1;
    var ItemCategory;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
                router_3 = router_1_1;
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
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (category_service_1_1) {
                category_service_1 = category_service_1_1;
            },
            function (columnButtonItem_1_1) {
                columnButtonItem_1 = columnButtonItem_1_1;
            }],
        execute: function() {
            ItemCategory = (function () {
                function ItemCategory(_itemService, _categoryService, _routeParams, _router) {
                    this._itemService = _itemService;
                    this._categoryService = _categoryService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.rows = [];
                    this.columns = [
                        { title: 'Naziv proizvoda', name: 'name' },
                        { title: 'Mjera', name: 'measure' },
                        { title: 'Kategorija', name: 'categoryName' },
                        { title: 'Cijena MPC', name: 'mpcPrice' },
                        { title: 'Detalji', name: 'id', custom: columnButtonItem_1.ColumnButtonItem },
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
                    this.categoryId = this._routeParams.get('categoryId');
                    this.data = [];
                }
                ItemCategory.prototype.ngOnInit = function () {
                    this.getItems();
                    this.getChildCategories(this._routeParams.get('categoryId'));
                };
                ItemCategory.prototype.goBack = function () {
                    window.history.back();
                };
                ItemCategory.prototype.enter = function (id, hasChildren) {
                    if (!hasChildren) {
                        var link = ['ItemList', { categoryId: id }];
                        this._router.navigate(link);
                    }
                    else {
                        var link = ['ItemCategory', { categoryId: id }];
                        this._router.navigate(link);
                    }
                };
                ItemCategory.prototype.getItems = function () {
                    var _this = this;
                    return this._itemService.getItemList(null)
                        .subscribe(function (response) {
                        _this.data = response;
                        _this.length = _this.data.length;
                        _this.onChangeTableInitial(_this.config, null);
                    }, function (err) { return _this._router.navigate(['Login']); });
                };
                ItemCategory.prototype.getChildCategories = function (categoryId) {
                    var _this = this;
                    return this._categoryService.getChildCategories(categoryId)
                        .subscribe(function (response) {
                        _this.childCategories = response;
                        _this.onChangeTableInitial(_this.config, null);
                    }, function (err) { return _this._router.navigate(['Login']); });
                };
                ItemCategory.prototype.changePage = function (page, data) {
                    if (data === void 0) { data = this.data; }
                    //console.log(page);
                    var start = (page.page - 1) * page.itemsPerPage;
                    var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
                    return data.slice(start, end);
                };
                ItemCategory.prototype.changeSort = function (data, config) {
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
                ItemCategory.prototype.changeFilter = function (data, config) {
                    var _this = this;
                    if (!config.filtering) {
                        return data;
                    }
                    var filteredData = data.filter(function (item) {
                        return item[config.filtering.columnName].toLowerCase().match(_this.config.filtering.filterString.toLowerCase());
                    });
                    return filteredData;
                };
                ItemCategory.prototype.onChangeTable = function (config, page) {
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
                ItemCategory.prototype.onChangeTableInitial = function (config, page) {
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
                ItemCategory = __decorate([
                    core_1.Component({
                        selector: 'item-list',
                        templateUrl: 'app/components/itemCategory/itemCategory.component.html',
                        directives: [header_1.WrapperCmp, ng2_table_1.NG_TABLE_DIRECTIVES, common_1.NgClass, common_1.NgIf, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES, router_3.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, category_service_1.CategoryService, router_2.RouteParams, router_1.Router])
                ], ItemCategory);
                return ItemCategory;
            }());
            exports_1("ItemCategory", ItemCategory);
        }
    }
});
//# sourceMappingURL=itemCategory.component.js.map