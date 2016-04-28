System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OrderFilter;
    return {
        setters:[],
        execute: function() {
            OrderFilter = (function () {
                function OrderFilter() {
                }
                OrderFilter.prototype.setUserId = function (userId) {
                    this.userId = userId;
                };
                OrderFilter.prototype.setStatus = function (status) {
                    this.status = status;
                };
                OrderFilter.prototype.getUserId = function () {
                    return this.userId;
                };
                OrderFilter.prototype.getStatus = function () {
                    return this.status;
                };
                return OrderFilter;
            }());
            exports_1("OrderFilter", OrderFilter);
        }
    }
});
//# sourceMappingURL=orderFilter.js.map