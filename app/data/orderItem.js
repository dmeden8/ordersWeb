System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OrderItem;
    return {
        setters:[],
        execute: function() {
            OrderItem = (function () {
                function OrderItem(name, price, amount, id, measure, categoryName) {
                    this.name = name;
                    this.price = price;
                    this.amount = amount;
                    this.id = id;
                    this.measure = measure;
                    this.categoryName = categoryName;
                }
                return OrderItem;
            }());
            exports_1("OrderItem", OrderItem);
        }
    }
});
//# sourceMappingURL=orderItem.js.map