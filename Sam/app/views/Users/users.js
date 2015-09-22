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
            }
            /*
                    public selectedUser: IUser;
                    public users: IUser[] = [];
            */
            //#endregion
            Users.prototype.Init = function () {
                // Queue all promises and wait for them to finish before loading the view
                //this.activate(this.LoadUsers());
            };
            Users.prototype.Activated = function () {
                /*
                            this.$scope.$watch("$.users", () => this.selectedUser = this.users.orderBy(x => x.UserName).firstOrDefault());
                
                            this.$scope.$watch("$.selectedUser", () => this.UserChanged());
                */
            };
            return Users;
        })(App.PageController);
        // Register with angular
        App.app.controller('users', Users.Factory("samUsers"));
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=users.js.map