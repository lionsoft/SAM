'use strict';
var App;
(function (App) {
    App.app.config(function () {
        App.Routes.push({
            name: 'users',
            title: 'Users',
            url: '/users',
            auth: true,
            templateUrl: '/app/views/users/users.html',
            settings: {
                nav: 100,
                content: '<i class="fa fa-user"></i> Users'
            },
            files: []
        });
    });
})(App || (App = {}));
//# sourceMappingURL=users.js.map