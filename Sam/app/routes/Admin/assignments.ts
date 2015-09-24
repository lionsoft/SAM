'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'assignments',
                title: 'Assignments',
                url: '/assignments',
                auth: true,
                roles: [UserRole.Admin],
                templateUrl: '/app/views/Admin/assignments/assignments.html',
                settings: {
                    topMenu: 'MENU.20.ADMIN',
                    nav: 6,
                    content: 'MENU.ASSIGNMENTS'
                },
                files: [
                ]
            }
        );
    });
   
}