System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/toPromise', 'rxjs/add/operator/map', 'rxjs/Rx', "../resources"], function(exports_1, context_1) {
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
    var core_1, http_1, resources_1;
    var ItemService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (resources_1_1) {
                resources_1 = resources_1_1;
            }],
        execute: function() {
            ItemService = (function () {
                function ItemService(http, myService) {
                    this.http = http;
                    this.myService = myService;
                }
                ItemService.prototype.getItemList = function (tenantId, categoryId) {
                    var body = JSON.stringify({ categoryId: categoryId, tenantId: tenantId });
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('id_token') });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.myService.getRestEndpoint() + 'item/list', body, options)
                        .map(function (res) { return res.json(); });
                };
                ItemService.prototype.getItemDetails = function (itemId) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('id_token') });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.myService.getRestEndpoint() + 'item/details', itemId, options)
                        .map(function (res) { return res.json(); });
                };
                ItemService.prototype.handleError = function (error) {
                    console.error(error);
                    return Promise.reject(error.message || error.json().error || 'Server error');
                };
                ItemService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, resources_1.MyResourcesService])
                ], ItemService);
                return ItemService;
            }());
            exports_1("ItemService", ItemService);
        }
    }
});
//# sourceMappingURL=item.service.js.map