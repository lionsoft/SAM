'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'lostCard',
            title: 'LostMyCardTitle',
            url: '/lostCard',
            auth: true,
            //roles: [UserRole.Normal],
            templateUrl: '/app/views/User/lostCard/lostCard.html',
            settings: {
                topMenu: 'MENU.10.USER',
                nav: 3,
                content: 'MENU.LOST-MY-CARD'
            },
            files: [
            ]
        }
    );
    });
   
}