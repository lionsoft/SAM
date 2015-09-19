'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'cards',
                title: 'Cards',
                url: '/cards',
                auth: true,
                templateUrl: '/app/views/cards/cards.html',
                settings: {
                    nav: 3,
                    content: 'MENU.CARDS|<i class="fa fa-credit-card"></i> Cards'
                },
                files: [
                ]
            }
        );
    });
   
}