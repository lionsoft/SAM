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
        var UsersService = (function (_super) {
            __extends(UsersService, _super);
            function UsersService() {
                _super.apply(this, arguments);
            }
            Object.defineProperty(UsersService.prototype, "ApiService", {
                get: function () {
                    return App.app.api.Account;
                },
                enumerable: true,
                configurable: true
            });
            UsersService.prototype.prepareQuery = function (odata) {
                odata.clear();
            };
            return UsersService;
        })(Services.CRUDService);
        App.app.service("samUsers", UsersService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamUsersService.js.map