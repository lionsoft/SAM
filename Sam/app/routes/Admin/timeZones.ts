'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'timeZones',
            title: 'TimeZones',
            url: '/timeZones',
            auth: true,
            roles: [UserRole.Admin],
            templateUrl: '/app/views/Admin/timeZones/timeZones.html',
            settings: {
                topMenu: 'MENU.20.ADMIN',
                nav: 110,
                content: 'MENU.TIME-ZONES'
            },
            files: [
            ]
        }
    );
    });
   
}