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
        var EditDepartmentList = (function (_super) {
            __extends(EditDepartmentList, _super);
            function EditDepartmentList() {
                _super.apply(this, arguments);
            }
            EditDepartmentList.prototype.Init = function () {
            };
            EditDepartmentList.prototype.prepareEdit = function (departmentList) {
                if (!departmentList.Id) {
                    departmentList.DepartmentId = this.$.selectedDepartmentId;
                }
                else {
                    return this.samDepartmentLists.Load(departmentList.Id, "DoorLists").then(function (res) {
                        departmentList.DoorLists = res.DoorLists;
                    });
                }
            };
            EditDepartmentList.prototype.IsDoorListInList = function (doorList) {
                this.$item.DoorLists = this.$item.DoorLists || [];
                return this.$item.DoorLists.any(function (d) { return d.Id === doorList.Id; });
            };
            EditDepartmentList.prototype.AddDoorListToList = function (doorList) {
                if (!this.IsDoorListInList(doorList))
                    this.$item.DoorLists.push(doorList);
            };
            EditDepartmentList.prototype.RemoveDoorListFromList = function (doorList) {
                if (this.IsDoorListInList(doorList))
                    this.$item.DoorLists.Remove(doorList);
            };
            return EditDepartmentList;
        })(App.Controller);
        // Register with angular
        App.app.controller('editDepartmentList', EditDepartmentList.Factory("samDepartmentLists"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=editDepartmentList.js.map