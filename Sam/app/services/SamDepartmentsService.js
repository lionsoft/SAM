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
        var DepartmentsService = (function (_super) {
            __extends(DepartmentsService, _super);
            function DepartmentsService() {
                _super.apply(this, arguments);
                this.TypeDescription = "Department";
            }
            Object.defineProperty(DepartmentsService.prototype, "ApiService", {
                get: function () { return App.app.api.Departments; },
                enumerable: true,
                configurable: true
            });
            /**
             * Load departments for the specified customer only
             * @param customerId customer Id
             */
            DepartmentsService.prototype.LoadByCustomer = function (customerId) {
                var expands = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    expands[_i - 1] = arguments[_i];
                }
                return _super.prototype.Load.call(this, (_a = Services.OData.create).$expand.apply(_a, expands).eq("Company.CustomerId", customerId));
                var _a;
            };
            return DepartmentsService;
        }(Services.CRUDService));
        App.app.service("samDepartments", DepartmentsService.Factory());
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamDepartmentsService.js.map