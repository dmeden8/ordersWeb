System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Order;
    return {
        setters:[],
        execute: function() {
            Order = (function () {
                function Order(creationTime, status, totalPrice, userName, id) {
                    this.creationTime = creationTime;
                    this.status = status;
                    this.totalPrice = totalPrice;
                    this.userName = userName;
                    this.id = id;
                }
                return Order;
            }());
            exports_1("Order", Order);
        }
    }
});
//# sourceMappingURL=order.js.map