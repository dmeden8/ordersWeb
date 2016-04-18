System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(username, email, name, oib, address, ownerName, telNumber, status, registerTime, activationTime, id) {
                    this.username = username;
                    this.email = email;
                    this.name = name;
                    this.oib = oib;
                    this.address = address;
                    this.ownerName = ownerName;
                    this.telNumber = telNumber;
                    this.status = status;
                    this.registerTime = registerTime;
                    this.activationTime = activationTime;
                    this.id = id;
                }
                ;
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map