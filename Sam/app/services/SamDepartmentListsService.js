'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Services;
    (function (Services) {
        var DepartmentListsService = (function (_super) {
            __extends(DepartmentListsService, _super);
            function DepartmentListsService() {
                _super.apply(this, arguments);
                this.TypeDescription = "DepartmentList";
            }
            Object.defineProperty(DepartmentListsService.prototype, "ApiService", {
                get: function () { return App.app.api.DepartmentLists; },
                enumerable: true,
                configurable: true
            });
            DepartmentListsService.prototype.prepareSave = function (entity) {
                var _this = this;
                var doorLists = entity.DoorLists;
                _super.prototype.prepareSave.call(this, entity);
                if (doorLists) {
                    doorLists.forEach(function (d) { return _this.samDoorLists.prepareSave(d); });
                    entity.DoorLists = doorLists;
                }
            };
            return DepartmentListsService;
        }(Services.CRUDService));
        App.app.service("samDepartmentLists", DepartmentListsService.Factory("samDoorLists"));
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=SamDepartmentListsService.js.map