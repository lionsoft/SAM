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
        var Employees = (function (_super) {
            __extends(Employees, _super);
            function Employees() {
                _super.apply(this, arguments);
                this.customers = [];
                this.customerDepartments = [];
                this.employees = [];
                this.users = [];
            }
            Employees.prototype.Init = function () {
                var _this = this;
                // Queue all promises and wait for them to finish before loading the view
                this.activate(this.LoadCustomers());
                this.samUsers.Load().then(function (res) { return _this.users = res; });
                this.uploader = new this.FileUploader();
                this.uploader.onAfterAddingFile = function (item) {
                    _this.uploader.queue.Remove(function (x) { return x !== item; });
                };
                // Add submit hook to the scope - it will be executed before saving
                this.$scope['$submit'] = function (item) { return _this.$submit(item); };
            };
            Employees.prototype.LoadCustomers = function () {
                var _this = this;
                return this.samCustomers.Load().then(function (res) { return _this.customers = res.orderBy(function (x) { return x.Name; }).toArray(); });
            };
            Employees.prototype.Activated = function () {
                var _this = this;
                this.$scope.$watch("$.customers", function () { return _this.selectedCustomerId = _this.customers.select(function (x) { return x.Id; }).firstOrDefault(); });
                this.$scope.$watch("$.selectedCustomerId", function () { return _this.LoadEmployees(); });
            };
            Employees.prototype.LoadEmployees = function () {
                var _this = this;
                this.employees = [];
                this.customerDepartments = [];
                this.samDepartments.LoadByCustomer(this.selectedCustomerId).then(function (res) { return _this.customerDepartments = res; });
                return this.$timeout(function () { return _this.samEmployees
                    .LoadByCustomer(_this.selectedCustomerId, "Manager", "Department", "User")
                    .then(function (res) { return _this.employees = res; }); });
            };
            Employees.prototype.$submit = function (item) {
                var _this = this;
                if (this.uploader.queue.length > 0) {
                    var d = this.defer();
                    this.uploader.onSuccessItem = function () { return d.resolve(true); };
                    this.uploader.onErrorItem = function (item, response) {
                        App.ApiServiceBase.HandleError(response);
                        d.reject();
                        //d.reject(ApiServiceBase.ExctractError(response));
                    };
                    this.uploader.onCompleteItem = function () {
                        _this.uploader.onSuccessItem = undefined;
                        _this.uploader.onErrorItem = undefined;
                    };
                    this.uploader.queue[0].url = "/api/Employees/UploadImage/" + item.Id;
                    this.uploader.queue[0].upload();
                    return d.promise;
                }
                return this.promiseFromResult(true);
            };
            Employees.prototype.AddEmployee = function () {
                var _this = this;
                //this.uploader.queue = [];
                this.samEmployees
                    .EditModal({ Status: 0 /* New */, UserRole: 1 /* Normal */ }, '_editEmployee.html', this.$scope)
                    .then(function (res) { return _this.employees.push(res); });
            };
            Employees.prototype.EditEmployee = function (c) {
                //this.uploader.queue = [];
                this.samEmployees.EditModal(c, '_editEmployee.html', this.$scope);
            };
            Employees.prototype.DeleteEmployee = function (c) {
                var _this = this;
                this.samEmployees.DeleteModal(c).then(function () { return _this.employees.Remove(c); });
            };
            return Employees;
        })(App.Controller);
        // Register with angular
        App.app.controller('employees', Employees.Factory("samCustomers", "samEmployees", "samDepartments", "FileUploader", "samUsers"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=employees.js.map