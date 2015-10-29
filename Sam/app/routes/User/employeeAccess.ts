'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'employeeAccess',
                title: 'EmployeeAccess',
                url: '/employeeAccess',
                auth: true,
                roles: [UserRole.Manager, UserRole.Admin],
                templateUrl: '/app/views/User/EmployeeAccess/employeeAccess.html',
                settings: {
                    topMenu: 'MENU.10.USER',
                    nav: 9,
                    content: 'MENU.EMPLOYEE-ACCESS'
                },
                files: [
                ]
            }
        );
    });

}