'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'employees',
                title: 'Employees',
                url: '/employees',
                auth: true,
                roles: [UserRole.Admin],
                templateUrl: '/app/views/Admin/employees/employees.html',
                settings: {
                    topMenu: 'MENU.20.ADMIN',
                    nav: 2,
                    content: 'MENU.EMPLOYEES'
                },
                files: [
                ]
            }
        );
    });
   
}