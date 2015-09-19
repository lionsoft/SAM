'use strict';
var App;
(function (App) {
    App.app.config(function () {
        App.Routes.push({
            name: 'employees',
            title: 'Employees',
            url: '/employees',
            auth: true,
            templateUrl: '/app/views/employees/employees.html',
            settings: {
                nav: 2,
                content: 'MENU.EMPLOYEES|<i class="fa fa-users"></i> Employees'
            },
            files: []
        });
    });
})(App || (App = {}));
//# sourceMappingURL=employees.js.map