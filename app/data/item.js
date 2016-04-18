System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Item;
    return {
        setters:[],
        execute: function() {
            Item = (function () {
                function Item(name, mpcPrice, vpcPrice, id, externalId, measure, categoryName) {
                    this.name = name;
                    this.mpcPrice = mpcPrice;
                    this.vpcPrice = vpcPrice;
                    this.id = id;
                    this.externalId = externalId;
                    this.measure = measure;
                    this.categoryName = categoryName;
                }
                return Item;
            }());
            exports_1("Item", Item);
        }
    }
});
//# sourceMappingURL=item.js.map