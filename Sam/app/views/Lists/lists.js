'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var Lists = (function (_super) {
            __extends(Lists, _super);
            function Lists() {
                _super.apply(this, arguments);
                this.customers = [];
                this.departments = [];
            }
            Lists.prototype.Init = function () {
                var _this = this;
                // Queue all promises and wait for them to finish before loading the view
                this.activate(this.samCustomers.Load().then(function (res) { return _this.customers = res; }));
            };
            Lists.prototype.Activated = function () {
                var _this = this;
                this.$scope.$watch("$.customers", function () { return _this.selectedCustomerId = _this.customers.select(function (x) { return x.Id; }).firstOrDefault(); });
                this.$scope.$watch("$.selectedCustomerId", function () { return _this.samDepartments.LoadByCustomer(_this.selectedCustomerId).then(function (res) { return _this.departments = res; }); });
                this.$scope.$watch("$.departments", function () { return _this.selectedDepartmentId = _this.departments.select(function (x) { return x.Id; }).firstOrDefault(); });
            };
            Lists.prototype.prepareDoorListQuery = function (odata) {
                odata.eq("CustomerId", this.selectedCustomerId);
                return "selectedCustomerId";
            };
            Lists.prototype.prepareDepartmentListQuery = function (odata) {
                odata.eq("DepartmentId", this.selectedDepartmentId).$expand("ApprovedBy");
                return "selectedDepartmentId";
            };
            return Lists;
        })(App.Controller);
        // Register with angular
        App.app.controller('lists', Lists.Factory("samCustomers", "samDepartments"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=lists.js.map