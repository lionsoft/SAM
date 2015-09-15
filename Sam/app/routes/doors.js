'use strict';
var App;
(function (App) {
    App.app.config(function () {
        App.Routes.push({
            name: 'doors',
            title: 'Doors',
            url: '/doors',
            auth: true,
            templateUrl: '/app/views/doors/doors.html',
            settings: {
                nav: 4,
                content: 'MENU.DOORS|<i class="fa fa-lock"></i> Doors'
            },
            files: []
        });
    });
})(App || (App = {}));
//# sourceMappingURL=doors.js.map