'use strict';
// ReSharper disable InconsistentNaming
var App;
(function (App) {
    var AutenticationService = (function () {
        function AutenticationService($rootScope, $location, $route, samUsers) {
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.$route = $route;
            this.samUsers = samUsers;
            this.LoggedUser = App.app['__loggedUser'];
            App.app['__loggedUser'] = undefined;
            samUsers.Update(this.LoggedUser);
            App.app.$auth = this;
            $rootScope.$auth = this;
        }
        Object.defineProperty(AutenticationService.prototype, "IsLoggedIn", {
            get: function () { return !!this.LoggedUser; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutenticationService.prototype, "LoggedUserId", {
            get: function () { return this.LoggedUser ? this.LoggedUser.Id : undefined; },
            enumerable: true,
            configurable: true
        });
        AutenticationService.prototype.Login = function (login, password, rememberMe) {
            var _this = this;
            return App.app.api.Account
                .Login(login, password, rememberMe)
                .ExtractError()
                .then(function (user) {
                _this.LoggedUser = user;
                _this.samUsers.Update(_this.LoggedUser);
            });
        };
        AutenticationService.prototype.Logout = function () {
            var _this = this;
            var res = App.app.api.Account
                .Logout()
                .HandleError()
                .then(function () { return _this.LoggedUser = undefined; });
            res.then(function () { return location.reload(); });
            return res;
        };
        AutenticationService.$inject = ['$rootScope', '$location', '$route', 'samUsers'];
        return AutenticationService;
    }());
    App.Shared.commonModule.service('$auth', AutenticationService);
})(App || (App = {}));
//# sourceMappingURL=AutenticationService.js.map