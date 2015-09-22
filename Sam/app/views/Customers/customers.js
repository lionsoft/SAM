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
        var Customers = (function (_super) {
            __extends(Customers, _super);
            function Customers() {
                _super.apply(this, arguments);
                this.customers = [];
                this.companies = [];
                this.departments = [];
            }
            //#endregion
            Customers.prototype.Init = function () {
                // Queue all promises and wait for them to finish before loading the view
                this.activate(this.LoadCustomers());
            };
            Customers.prototype.Activated = function () {
                var _this = this;
                this.$scope.$watch("$.customers", function () { return _this.selectedCustomer = _this.customers.orderBy(function (x) { return x.Name; }).firstOrDefault(); });
                this.$scope.$watch("$.companies", function () { return _this.selectedCompany = _this.companies.orderBy(function (x) { return x.Name; }).firstOrDefault(); });
                this.$scope.$watch("$.departments", function () { return _this.selectedDepartment = _this.departments.orderBy(function (x) { return x.Name; }).firstOrDefault(); });
                this.$scope.$watch("$.selectedCustomer", function () { return _this.LoadCompanies(); });
                this.$scope.$watch("$.selectedCompany", function () { return _this.LoadDepartments(); });
                this.$scope.$watch("$.selectedDepartment", function () { return _this.DepartmentChanged(); });
            };
            //#region - Customer -
            Customers.prototype.LoadCustomers = function () {
                var _this = this;
                this.customers = [];
                return this.$timeout(function () {
                    return _this.samCustomers.Load().then(function (res) { return _this.customers = res; });
                });
            };
            Customers.prototype.AddCustomer = function () {
                var _this = this;
                this.samCustomers.EditModal(null, '_editCustomer.html').then(function (res) { return _this.customers.push(res); });
            };
            Customers.prototype.EditCustomer = function (c) { this.samCustomers.EditModal(c, '_editCustomer.html'); };
            Customers.prototype.DeleteCustomer = function (c) {
                var _this = this;
                this.samCustomers.DeleteModal(c).then(function () { return _this.customers.Remove(c); });
            };
            //#endregion 
            //#region - Company -
            Customers.prototype.LoadCompanies = function () {
                var _this = this;
                this.companies = [];
                this.$timeout(function () {
                    if (_this.selectedCustomer)
                        _this.samCompanies.Load(App.Services.OData.create.eq("CustomerId", _this.selectedCustomer.Id)).then(function (res) {
                            _this.companies = res;
                        });
                });
            };
            Customers.prototype.AddCompany = function () {
                var _this = this;
                this.samCompanies.EditModal(null, '_editCompany.html').then(function (res) { return _this.companies.push(res); });
            };
            Customers.prototype.EditCompany = function (c) { this.samCompanies.EditModal(c, '_editCompany.html'); };
            Customers.prototype.DeleteCompany = function (c) {
                var _this = this;
                this.samCompanies.DeleteModal(c).then(function () { return _this.companies.Remove(c); });
            };
            //#endregion 
            //#region - Department -
            Customers.prototype.LoadDepartments = function () {
                var _this = this;
                this.departments = [];
                this.$timeout(function () {
                    if (_this.selectedCompany)
                        _this.samDepartments.Load(App.Services.OData.create.eq("CompanyId", _this.selectedCompany.Id)).then(function (res) {
                            _this.departments = res;
                        });
                });
            };
            Customers.prototype.AddDepartment = function () {
                var _this = this;
                if (this.selectedCompany)
                    this.samDepartments.EditModal({ CompanyId: this.selectedCompany.Id }, '_editDepartment.html').then(function (res) { return _this.departments.push(res); });
            };
            Customers.prototype.EditDepartment = function (d) { this.samDepartments.EditModal(d, '_editDepartment.html'); };
            Customers.prototype.DeleteDepartment = function (d) {
                var _this = this;
                this.samDepartments.DeleteModal(d).then(function () { return _this.departments.Remove(d); });
            };
            Customers.prototype.DepartmentChanged = function () {
            };
            return Customers;
        })(App.PageController);
        // register controller with angular
        App.app.controller('customers', Customers.Factory("samCustomers", "samCompanies", "samDepartments"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=customers.js.map