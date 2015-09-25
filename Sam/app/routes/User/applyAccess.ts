'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'applyAccess',
            title: 'ApplyToGetAccess',
            url: '/applyAccess',
            auth: true,
            //roles: [UserRole.Normal],
            templateUrl: '/app/views/User/ApplyAccess/applyAccess.html',
            settings: {
                topMenu: 'MENU.10.USER',
                nav: 2,
                content: 'MENU.APPLY-TO-GET-ACCESS'
            },
            files: [
            ]
        }
    );
    });
   
}