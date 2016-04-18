System.register(['angular2/core', 'angular2/common', 'ng2-table/ng2-table', 'ng2-bootstrap/ng2-bootstrap', "../header/header", "angular2/router", "../../services/item.service", "../../data/item"], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_table_1, ng2_bootstrap_1, header_1, router_1, router_2, item_service_1, item_1;
    var ItemDetail;
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
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            },
            function (item_1_1) {
                item_1 = item_1_1;
            }],
        execute: function() {
            ItemDetail = (function () {
                function ItemDetail(_itemService, _routeParams, _router) {
                    this._itemService = _itemService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.item = new item_1.Item('', '', '', '', '', '', '');
                }
                ItemDetail.prototype.goBack = function () {
                    window.history.back();
                };
                ItemDetail.prototype.ngOnInit = function () {
                    this.getItemDetails(this._routeParams.get('itemId'));
                };
                ItemDetail.prototype.getItemDetails = function (itemId) {
                    var _this = this;
                    return this._itemService.getItemDetails(itemId)
                        .subscribe(function (response) {
                        _this.item = response;
                    }, function (err) { return _this._router.navigate(['Login']); });
                };
                ItemDetail = __decorate([
                    core_1.Component({
                        selector: 'item-detail',
                        templateUrl: 'app/components/itemDetail/itemDetail.component.html',
                        directives: [header_1.WrapperCmp, ng2_table_1.NG_TABLE_DIRECTIVES, common_1.NgClass, common_1.NgIf, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_bootstrap_1.PAGINATION_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [item_service_1.ItemService, router_2.RouteParams, router_1.Router])
                ], ItemDetail);
                return ItemDetail;
            }());
            exports_1("ItemDetail", ItemDetail);
        }
    }
});
//# sourceMappingURL=itemDetail.component.js.map