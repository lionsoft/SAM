'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'myDelegation',
                title: 'MyDelegation',
                url: '/myDelegation',
                auth: true,
                //roles: [UserRole.Normal],
                templateUrl: '/app/views/User/MyDelegation/myDelegation.html',
                settings: {
                    topMenu: 'MENU.10.USER',
                    nav: 7,
                    content: 'MENU.MY-DELEGATION'
                },
                files: [
                ]
            }
        );
    });

}