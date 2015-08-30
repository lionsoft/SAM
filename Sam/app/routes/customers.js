'use strict';
var App;
(function (App) {
    App.app.config(function () {
        App.Routes.push({
            name: 'customers',
            title: 'Customers',
            url: '/',
            auth: true,
            templateUrl: '/app/views/customers/customers.html',
            settings: {
                nav: 1,
                content: 'MENU.CUSTOMERS|<i class="fa fa-dashboard"></i> Customers'
            },
            files: []
        });
    });
})(App || (App = {}));
//# sourceMappingURL=customers.js.map