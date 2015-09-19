'use strict';
var App;
(function (App) {
    App.app.config(function () {
        App.Routes.push({
            name: 'cards',
            title: 'Cards',
            url: '/cards',
            auth: true,
            templateUrl: '/app/views/cards/cards.html',
            settings: {
                nav: 3,
                content: 'MENU.CARDS|<i class="fa fa-credit-card"></i> Cards'
            },
            files: []
        });
    });
})(App || (App = {}));
//# sourceMappingURL=cards.js.map