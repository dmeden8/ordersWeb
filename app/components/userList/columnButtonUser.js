System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var ColumnButtonUser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ColumnButtonUser = (function () {
                function ColumnButtonUser(_router) {
                    this._router = _router;
                }
                ColumnButtonUser.prototype.ngTableOnInit = function (index, row) {
                    this.user_id = row.id;
                };
                ColumnButtonUser.prototype.goToDetail = function (id) {
                    var link = ['UserDetails', { userId: id }];
                    this._router.navigate(link);
                };
                ColumnButtonUser = __decorate([
                    core_1.Component({
                        selector: 'column-button-user',
                        template: '<button (click)="goToDetail(user_id)" class="btn btn-primary btn-xs">Vidi detalje</button>'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], ColumnButtonUser);
                return ColumnButtonUser;
            }());
            exports_1("ColumnButtonUser", ColumnButtonUser);
        }
    }
});
//# sourceMappingURL=columnButtonUser.js.map