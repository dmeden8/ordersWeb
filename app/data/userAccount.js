System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserAccount;
    return {
        setters:[],
        execute: function() {
            UserAccount = (function () {
                function UserAccount(username, password) {
                    this.username = username;
                    this.password = password;
                }
                ;
                return UserAccount;
            }());
            exports_1("UserAccount", UserAccount);
        }
    }
});
//# sourceMappingURL=userAccount.js.map