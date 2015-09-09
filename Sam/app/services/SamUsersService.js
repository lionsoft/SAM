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
                this.TypeDescription = "User";
            }
            UsersService.prototype.GetDescription = function (user) { return user.UserName; };
            Object.defineProperty(UsersService.prototype, "ApiService", {
                get: function () { return App.app.api.Account; },
                enumerable: true,
                configurable: true
            });
            UsersService.prototype.prepareQuery = function (odata) {
                odata.clear();
            };
            UsersService.prototype.afterQuery = function (query) {
                var _this = this;
                return query.HandleError().then(function (x) { return _this.UpdateEmployee(x); });
            };
            UsersService.prototype.afterGet = function (query) {
                var _this = this;
                return query.then(function (res) { return _this.UpdateEmployee(res); });
            };
            UsersService.prototype.UpdateEmployee = function (p) {
                var _this = this;
                if (!p)
                    return this.promiseFromResult(p);
                if (angular.isArray(p)) {
                    var users = p;
                    return this.$q.all(users.select(function (u) { return _this.UpdateEmployee(u); }).toArray());
                }
                else {
                    var user = p;
                    user.Name = user.UserName;
                    return App.app.api.Employees.query(Services.OData.create.eq("UserId", user.Id).$top(1)).then(function (x) {
                        user.Employee = x.firstOrDefault();
                        if (user.Employee && user.Employee.Name)
                            user.Name = user.Employee.Name;
                        return user;
                    });
                }
            };
            return UsersService;
        })(Services.CRUDService);
        App.app.service("samUsers", UsersService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamUsersService.js.map