'use strict';
var App;
(function (App) {
    App.app.config(function () {
        App.Routes.push({
            name: 'lists',
            title: 'Lists',
            url: '/lists',
            auth: true,
            templateUrl: '/app/views/lists/lists.html',
            settings: {
                nav: 5,
                content: 'MENU.LISTS|<i class="fa fa-list"></i> Lists'
            },
            files: [
                'editDoorList'
            ]
        });
    });
})(App || (App = {}));
//# sourceMappingURL=lists.js.map