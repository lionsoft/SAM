'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'users',
            title: 'Users',
            url: '/users',
            auth: true,
            roles: [UserRole.Admin],
            templateUrl: '/app/views/Admin/users/users.html',
            settings: {
                topMenu: 'MENU.20.ADMIN',
                nav: 100,
                content: 'MENU.USERS'
            },
            files: [
            ]
        }
    );
    });
   
}