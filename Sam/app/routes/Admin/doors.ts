'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'doors',
                title: 'Doors',
                url: '/doors',
                auth: true,
                roles: [UserRole.Admin],
                templateUrl: '/app/views/Admin/doors/doors.html',
                settings: {
                    topMenu: 'MENU.20.ADMIN',
                    nav: 4,
                    content: 'MENU.DOORS'
                },
                files: [
                ]
            }
        );
    });
   
}