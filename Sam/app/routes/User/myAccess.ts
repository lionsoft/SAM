'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'myAccess',
                title: 'MyAccess',
                url: '/myAccess',
                auth: true,
                //roles: [UserRole.Normal],
                templateUrl: '/app/views/User/MyAccess/myAccess.html',
                settings: {
                    topMenu: 'MENU.10.USER',
                    nav: 8,
                    content: 'MENU.MY-ACCESS'
                },
                files: [
                ]
            }
        );
    });
          
}