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
            }
            Customers.prototype.Init = function () {
            };
            //#region - Customer -
            Customers.prototype.CustomersLoaded = function (list) {
                this.selectedCustomerId = list.select(function (x) { return x.Id; }).firstOrDefault();
            };
            //#endregion 
            //#region - Company -
            Customers.prototype.prepareCompaniesQuery = function (odata) {
                odata.eq("CustomerId", this.selectedCustomerId);
                return "selectedCustomerId";
            };
            Customers.prototype.prepareCompanyEdit = function (c) {
                if (!c.Id)
                    c.CustomerId = this.selectedCustomerId;
            };
            Customers.prototype.CompaniesLoaded = function (list) {
                this.selectedCompanyId = list.select(function (x) { return x.Id; }).firstOrDefault();
            };
            //#endregion 
            //#region - Department -
            Customers.prototype.prepareDepartmentsQuery = function (odata) {
                odata.eq("CompanyId", this.selectedCompanyId);
                return "selectedCompanyId";
            };
            Customers.prototype.prepareDepartmentEdit = function (c) {
                if (!c.Id)
                    c.CompanyId = this.selectedCompanyId;
            };
            return Customers;
        })(App.PageController);
        // register controller with angular
        App.app.controller('customers', Customers.Factory());
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=customers.js.map