'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Services;
    (function (Services) {
        var DoorListsService = (function (_super) {
            __extends(DoorListsService, _super);
            function DoorListsService() {
                _super.apply(this, arguments);
                this.TypeDescription = "DoorList";
            }
            Object.defineProperty(DoorListsService.prototype, "ApiService", {
                get: function () { return App.app.api.DoorLists; },
                enumerable: true,
                configurable: true
            });
            DoorListsService.prototype.prepareSave = function (entity) {
                var _this = this;
                var doors = entity.Doors;
                _super.prototype.prepareSave.call(this, entity);
                doors.forEach(function (d) { return _this.samDoors.prepareSave(d); });
                entity.Doors = doors;
            };
            return DoorListsService;
        })(Services.CRUDService);
        App.app.service("samDoorLists", DoorListsService.Factory("samDoors"));
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamDoorListsService.js.map