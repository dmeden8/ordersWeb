System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserFilter;
    return {
        setters:[],
        execute: function() {
            UserFilter = (function () {
                function UserFilter() {
                }
                UserFilter.prototype.setStatus = function (status) {
                    this.status = status;
                };
                UserFilter.prototype.getStatus = function () {
                    return this.status;
                };
                return UserFilter;
            }());
            exports_1("UserFilter", UserFilter);
        }
    }
});
//# sourceMappingURL=userFilter.js.map