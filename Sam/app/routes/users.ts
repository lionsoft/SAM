'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'users',
            title: 'Users',
            url: '/users',
            auth: true,
            templateUrl: '/app/views/users/users.html', // this is default value
            settings: {
                nav: 100,
                content: '<i class="fa fa-user"></i> Users'
            },
            files: [
            ]
        }
    );
    });
   
}