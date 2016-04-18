System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OrderStatus;
    return {
        setters:[],
        execute: function() {
            OrderStatus = (function () {
                function OrderStatus(orderId, status) {
                    this.orderId = orderId;
                    this.status = status;
                }
                return OrderStatus;
            }());
            exports_1("OrderStatus", OrderStatus);
        }
    }
});
//# sourceMappingURL=orderStatus.js.map