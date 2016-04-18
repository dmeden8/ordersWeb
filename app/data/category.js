System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Category;
    return {
        setters:[],
        execute: function() {
            Category = (function () {
                function Category(name, imageUrl, categoryId, hasChildren) {
                    this.name = name;
                    this.imageUrl = imageUrl;
                    this.categoryId = categoryId;
                    this.hasChildren = hasChildren;
                }
                return Category;
            }());
            exports_1("Category", Category);
        }
    }
});
//# sourceMappingURL=category.js.map