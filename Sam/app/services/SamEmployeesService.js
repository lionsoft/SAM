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
                return _super.prototype.Load.call(this, Services.OData.create.eq("Department.Company.CustomerId", customerId));
            };
            return EmployeesService;
        })(Services.CRUDService);
        App.app.service("samEmployees", EmployeesService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamEmployeesService.js.map