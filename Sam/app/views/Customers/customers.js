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
                this.$scope.$watch("$.customers", function () { return _this.selectedCustomer = _this.customers[0]; });
                this.$scope.$watch("$.companies", function () { return _this.selectedCompany = _this.companies[0]; });
                this.$scope.$watch("$.departments", function () { return _this.selectedDepartment = _this.departments[0]; });
                this.$scope.$watch("$.selectedCustomer", function () { return _this.LoadCompanies(); });
                this.$scope.$watch("$.selectedCompany", function () { return _this.LoadDepartments(); });
                this.$scope.$watch("$.selectedDepartment", function () { return _this.DepartmentChanged(); });
            };
            Customers.prototype.LoadCustomers = function () {
                var _this = this;
                this.customers = [];
                return this.$timeout(function () {
                    return _this.samCustomers.Load().then(function (res) {
                        _this.customers = res;
                    });
                });
            };
            Customers.prototype.LoadCompanies = function () {
                var _this = this;
                this.companies = [];
                this.$timeout(function () {
                    if (_this.selectedCustomer)
                        _this.samCompanies.Load(App.Services.OData.create.eq("CustomerId", _this.selectedCustomer.Id)).then(function (res) {
                            _this.companies = res;
                        });
                    /*
                                    var tableHeader0 = $($(".dataTables_scrollHeadInner")[0]);
                                    var tableHeader = $($(".dataTables_scrollHeadInner table")[0]);
                                    var tableHeaderWrapper = $($(".dataTables_scrollBody table")[0]);
                                    Utils.ResizeListener.Attach(tableHeaderWrapper, () => {
                                        tableHeader0.width(tableHeaderWrapper.width());
                                        tableHeader.width(tableHeaderWrapper.width());
                                    });
                    */
                });
            };
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
            Customers.prototype.DepartmentChanged = function () {
            };
            Customers.prototype.AddCustomer = function () {
                alert('add customer');
            };
            Customers.prototype.EditCustomer = function (c) {
                alert('edit customer' + c.Name);
                var scope = this.$scope.$new();
                scope.$item = c;
                App.app.popup.popup('_edit.html', scope);
            };
            Customers.prototype.DeleteCustomer = function (c) {
                var _this = this;
                if (!c)
                    return;
                App.app.popup.ask(this.Translate("ASK.DELETE.CUSTOMER|{0}: Delete customer?").format(c.Name), false)
                    .then(function (r) {
                    if (r)
                        return _this.samCustomers.Delete(c.Id);
                    else
                        return false;
                }).then(function (r) {
                    if (r) {
                        _this.customers.Remove(c);
                    }
                });
                ;
            };
            Customers.prototype.DeleteCompany = function (c) {
            };
            Customers.prototype.DeleteDepartment = function (d) {
            };
            return Customers;
        })(App.Controller);
        // register controller with angular
        App.app.controller('customers', Customers.Factory("samCustomers", "samCompanies", "samDepartments"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=customers.js.map