'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'customers',
                title: 'Customers',
                url: '/',
                auth: true,
                templateUrl: '/app/views/customers/customers.html',
                settings: {
                    nav: 1,
                    content: 'MENU.CUSTOMERS|<i class="fa fa-dashboard"></i> Customers'
                },
                files: [
                ]
            }
        );
    });
   
}