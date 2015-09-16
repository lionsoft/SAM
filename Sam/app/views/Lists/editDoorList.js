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
        var EditDoorList = (function (_super) {
            __extends(EditDoorList, _super);
            function EditDoorList() {
                _super.apply(this, arguments);
            }
            EditDoorList.prototype.Init = function () {
            };
            EditDoorList.prototype.prepareEdit = function (doorList) {
                if (!doorList.Id) {
                    doorList.CustomerId = this.$.selectedCustomerId;
                }
                else {
                    return this.samDoorLists.Load(doorList.Id, "Doors").then(function (res) {
                        doorList.Doors = res.Doors;
                    });
                }
            };
            EditDoorList.prototype.IsDoorInList = function (door) {
                this.$item.Doors = this.$item.Doors || [];
                return this.$item.Doors.any(function (d) { return d.Id === door.Id; });
            };
            EditDoorList.prototype.AddDoorToList = function (door) {
                if (!this.IsDoorInList(door))
                    this.$item.Doors.push(door);
            };
            EditDoorList.prototype.RemoveDoorFromList = function (door) {
                if (this.IsDoorInList(door))
                    this.$item.Doors.Remove(door);
            };
            return EditDoorList;
        })(App.Controller);
        // Register with angular
        App.app.controller('editDoorList', EditDoorList.Factory("samDoorLists"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=editDoorList.js.map