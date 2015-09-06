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
        var Users = (function (_super) {
            __extends(Users, _super);
            function Users() {
                _super.apply(this, arguments);
                this.users = [];
            }
            //#endregion
            Users.prototype.Init = function () {
                // Queue all promises and wait for them to finish before loading the view
                this.activate(this.LoadUsers());
            };
            Users.prototype.Activated = function () {
                var _this = this;
                this.$scope.$watch("$.users", function () { return _this.selectedUser = _this.users.orderBy(function (x) { return x.UserName; }).firstOrDefault(); });
                this.$scope.$watch("$.selectedUser", function () { return _this.UserChanged(); });
            };
            Users.prototype.LoadUsers = function () {
                var _this = this;
                this.users = [];
                return this.$timeout(function () {
                    return _this.samUsers.Load().then(function (res) { return _this.users = res; });
                });
            };
            Users.prototype.AddUser = function () {
                var _this = this;
                this.samUsers.EditModal(null, '_editUser.html').then(function (res) { return _this.users.push(res); });
            };
            Users.prototype.EditUser = function (c) { this.samUsers.EditModal(c, '_editUser.html'); };
            Users.prototype.DeleteUser = function (c) {
                var _this = this;
                this.samUsers.DeleteModal(c).then(function () { return _this.users.Remove(c); });
            };
            Users.prototype.UserChanged = function () {
            };
            return Users;
        })(App.Controller);
        Controllers.Users = Users;
        // Register with angular
        App.app.controller('users', Users.Factory("samUsers"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=users.js.map