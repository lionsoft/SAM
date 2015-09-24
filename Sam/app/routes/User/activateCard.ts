'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'activateCard',
            title: 'ActivateMyCard',
            url: '/activateCard',
            auth: true,
            //roles: [UserRole.Normal],
            templateUrl: '/app/views/User/activateCard/activateCard.html',
            settings: {
                topMenu: 'MENU.10.USER',
                nav: 1,
                content: 'MENU.ACTIVATE-MY-CARD'
            },
            files: [
            ]
        }
    );
    });
   
}