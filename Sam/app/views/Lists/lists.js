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
            }
            Lists.prototype.Init = function () {
                // Queue all promises and wait for them to finish before loading the view
                this.activate(this.LoadCustomers());
            };
            Lists.prototype.LoadCustomers = function () {
                var _this = this;
                return this.samCustomers.Load().then(function (res) { return _this.customers = res; });
            };
            Lists.prototype.Activated = function () {
                var _this = this;
                this.$scope.$watch("$.customers", function () { return _this.selectedCustomerId = _this.customers.select(function (x) { return x.Id; }).firstOrDefault(); });
            };
            Lists.prototype.prepareDoorsQuery = function (odata) {
                /*
                            odata.eq("CustomerId", this.selectedCustomerId);
                            return "selectedCustomerId";
                */
            };
            Lists.prototype.prepareDoorListQuery = function (odata) {
                odata.eq("CustomerId", this.selectedCustomerId);
                return "selectedCustomerId";
            };
            Lists.prototype.prepareDoorListEdit = function (doorList) {
                alert('1');
                /*
                            if (!doorList.Id) {
                                doorList.CustomerId = this.selectedCustomerId;
                            }
                */
            };
            return Lists;
        })(App.Controller);
        // Register with angular
        App.app.controller('lists', Lists.Factory("samCustomers", "samDoorLists", "samDepartmentLists"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=lists.js.map