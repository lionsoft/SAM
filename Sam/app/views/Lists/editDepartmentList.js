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
            EditDepartmentList.prototype.prepareEdit = function (doorList) {
                if (!doorList.Id) {
                    doorList.CustomerId = this.$.selectedCustomerId;
                }
                else {
                    return this.samDoorLists.Load(doorList.Id, "Doors").then(function (res) {
                        doorList.Doors = res.Doors;
                    });
                }
            };
            EditDepartmentList.prototype.IsDoorInList = function (door) {
                this.$item.Doors = this.$item.Doors || [];
                return this.$item.Doors.any(function (d) { return d.Id === door.Id; });
            };
            EditDepartmentList.prototype.AddDoorToList = function (door) {
                if (!this.IsDoorInList(door))
                    this.$item.Doors.push(door);
            };
            EditDepartmentList.prototype.RemoveDoorFromList = function (door) {
                if (this.IsDoorInList(door))
                    this.$item.Doors.Remove(door);
            };
            return EditDepartmentList;
        })(App.Controller);
        // Register with angular
        App.app.controller('editDepartmentList', EditDepartmentList.Factory("samDoorLists"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=editDepartmentList.js.map