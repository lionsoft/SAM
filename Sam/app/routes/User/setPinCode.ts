'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'setPinCode',
            title: 'SetPinCode',
            url: '/setPinCode',
            auth: true,
            //roles: [UserRole.Normal],
            templateUrl: '/app/views/User/SetPinCode/setPinCode.html',
            settings: {
                topMenu: 'MENU.10.USER',
                nav: 2,
                content: 'MENU.SET-PIN-CODE'
            },
            files: [
            ]
        }
    );
    });
   
}