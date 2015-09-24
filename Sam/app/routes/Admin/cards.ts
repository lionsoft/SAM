'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'cards',
                title: 'Cards',
                url: '/cards',
                auth: true,
                roles: [UserRole.Admin],
                templateUrl: '/app/views/Admin/cards/cards.html',
                settings: {
                    topMenu: 'MENU.20.ADMIN',
                    nav: 3,
                    content: 'MENU.CARDS'
                },
                files: [
                ]
            }
        );
    });
   
}