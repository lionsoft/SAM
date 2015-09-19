'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Services;
    (function (Services) {
        var CustomersService = (function (_super) {
            __extends(CustomersService, _super);
            function CustomersService() {
                _super.apply(this, arguments);
                this.TypeDescription = "Customer";
            }
            Object.defineProperty(CustomersService.prototype, "ApiService", {
                get: function () { return App.app.api.Customers; },
                enumerable: true,
                configurable: true
            });
            return CustomersService;
        })(Services.CRUDService);
        App.app.service("samCustomers", CustomersService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamCustomersService.js.map