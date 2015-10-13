'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Services;
    (function (Services) {
        var EmployeesService = (function (_super) {
            __extends(EmployeesService, _super);
            function EmployeesService() {
                _super.apply(this, arguments);
                this.TypeDescription = "Employee";
            }
            EmployeesService.prototype.GetDescription = function (employee) { return employee.Name; };
            Object.defineProperty(EmployeesService.prototype, "ApiService", {
                get: function () { return App.app.api.Employees; },
                enumerable: true,
                configurable: true
            });
            EmployeesService.prototype.LoadByCustomer = function (customerId) {
                var expands = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    expands[_i - 1] = arguments[_i];
                }
                return _super.prototype.Load.call(this, (_a = Services.OData.create).$expand.apply(_a, expands).eq("Department.Company.CustomerId", customerId));
                var _a;
            };
            return EmployeesService;
        })(Services.CRUDService);
        App.app.service("samEmployees", EmployeesService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamEmployeesService.js.map