System.register(['angular2/core', 'angular2/router', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1;
    var ColumnStatusOrder;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ColumnStatusOrder = (function () {
                function ColumnStatusOrder(_router) {
                    this._router = _router;
                }
                ColumnStatusOrder.prototype.ngTableOnInit = function (index, row) {
                    this.status = row.status;
                };
                ColumnStatusOrder = __decorate([
                    core_1.Component({
                        directives: [common_1.CORE_DIRECTIVES],
                        selector: 'column-status-order',
                        template: "<div *ngIf=\"status == 'N'\">\n                    <div class=\"alert alert-danger\">NOVO</div>\n               </div>\n               <div *ngIf=\"status == 'I'\">\n                    <div class=\"alert alert-warning\">PREGLEDANO</div>\n               </div>\n               <div *ngIf=\"status == 'P'\">\n                    <div class=\"alert alert-info\">U OBRADI</div>\n               </div>\n               <div *ngIf=\"status == 'F'\">\n                    <div class=\"alert alert-success\">ZAVR\u0160ENO</div>\n               </div>"
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], ColumnStatusOrder);
                return ColumnStatusOrder;
            }());
            exports_1("ColumnStatusOrder", ColumnStatusOrder);
        }
    }
});
//# sourceMappingURL=columnStatusOrder.js.map