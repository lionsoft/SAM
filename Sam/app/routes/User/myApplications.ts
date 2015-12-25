'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'myApplications',
            title: 'MyApplicationsTitle',
            url: '/myApplications',
            auth: true,
            //roles: [UserRole.Normal],
            templateUrl: '/app/views/User/MyApplications/myApplications.html',
            settings: {
                topMenu: 'MENU.10.USER',
                nav: 5,
                content: 'MENU.MY-APPLICATIONS'
            },
            files: [
            ]
        }
    );
    });
   
}