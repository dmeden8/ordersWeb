System.register(['angular2/core', 'angular2/common', 'ng2-bootstrap/ng2-bootstrap', 'angular2/router', "../../resources"], function(exports_1, context_1) {
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
    var core_1, common_1, ng2_bootstrap_1, router_1, router_2, resources_1;
    var HeaderNotification, SidebarSearch, Sidebar, Header, WrapperCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (resources_1_1) {
                resources_1 = resources_1_1;
            }],
        execute: function() {
            HeaderNotification = (function () {
                function HeaderNotification(_router) {
                    this._router = _router;
                }
                HeaderNotification.prototype.toggled = function (open) {
                    console.log('Dropdown is now: ', open);
                };
                HeaderNotification.prototype.logout = function () {
                    localStorage.removeItem('id_token');
                };
                HeaderNotification = __decorate([
                    core_1.Component({
                        selector: 'header-notification',
                        templateUrl: 'app/components/header/header-notification.html',
                        directives: [ng2_bootstrap_1.Dropdown, ng2_bootstrap_1.DropdownMenu, ng2_bootstrap_1.DropdownToggle, router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES],
                        viewProviders: [ng2_bootstrap_1.Dropdown, ng2_bootstrap_1.DropdownMenu, ng2_bootstrap_1.DropdownToggle, core_1.ElementRef]
                    }), 
                    __metadata('design:paramtypes', [router_2.Router])
                ], HeaderNotification);
                return HeaderNotification;
            }());
            exports_1("HeaderNotification", HeaderNotification);
            SidebarSearch = (function () {
                function SidebarSearch() {
                }
                SidebarSearch = __decorate([
                    core_1.Component({
                        selector: 'sidebar-search',
                        templateUrl: 'app/components/header/sidebar-search.html',
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], SidebarSearch);
                return SidebarSearch;
            }());
            exports_1("SidebarSearch", SidebarSearch);
            Sidebar = (function () {
                function Sidebar(myService) {
                    this.myService = myService;
                    this.rootCategoryId = this.myService.getRootCategoryId;
                }
                Sidebar = __decorate([
                    core_1.Component({
                        selector: 'sidebar',
                        templateUrl: 'app/components/header/sidebar.html',
                        directives: [router_1.ROUTER_DIRECTIVES, SidebarSearch, ng2_bootstrap_1.Accordion],
                    }), 
                    __metadata('design:paramtypes', [resources_1.MyResourcesService])
                ], Sidebar);
                return Sidebar;
            }());
            exports_1("Sidebar", Sidebar);
            Header = (function () {
                function Header() {
                    this.username = '';
                }
                Header.prototype.ngOnInit = function () {
                    this.username = localStorage.getItem('username');
                };
                Header = __decorate([
                    core_1.Component({
                        selector: 'header',
                        templateUrl: 'app/components/header/header.html',
                        directives: [Sidebar, HeaderNotification]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Header);
                return Header;
            }());
            exports_1("Header", Header);
            WrapperCmp = (function () {
                function WrapperCmp() {
                }
                WrapperCmp = __decorate([
                    core_1.Component({
                        selector: 'wrapper',
                        template: "<div id=\"wrapper\">\n      <header></header>\n      <div id=\"page-wrapper\" style=\"min-height: 561px;\">\n        <ng-content></ng-content>\n      </div>\n    </div>",
                        directives: [Header, common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], WrapperCmp);
                return WrapperCmp;
            }());
            exports_1("WrapperCmp", WrapperCmp);
        }
    }
});
//# sourceMappingURL=header.js.map