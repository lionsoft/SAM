'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'customers',
                title: 'Customers',
                url: '/customers',
                auth: true,
                roles: [UserRole.Admin],
                templateUrl: '/app/views/Admin/customers/customers.html',
                settings: {
                    topMenu: 'MENU.20.ADMIN',
                    nav: 1,
                    content: 'MENU.CUSTOMERS|<i class="fa fa-briefcase"></i> Customers'
                },
                files: [
                ]
            }
        );
    });
   
}