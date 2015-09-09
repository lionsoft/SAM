'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'employees',
                title: 'Employees',
                url: '/employees',
                auth: true,
                templateUrl: '/app/views/employees/employees.html',
                settings: {
                    nav: 2,
                    content: 'MENU.EMPLOYEES|<i class="fa fa-users"></i> Employees'
                },
                files: [
                ]
            }
        );
    });
   
}