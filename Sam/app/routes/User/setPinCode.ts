'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'setPinCode',
            title: 'SetPinCodeTitle',
            url: '/setPinCode',
            auth: true,
            //roles: [UserRole.Normal],
            templateUrl: '/app/views/User/SetPinCode/setPinCode.html',
            settings: {
                topMenu: 'MENU.10.USER',
                nav: 4,
                content: 'MENU.SET-PIN-CODE'
            },
            files: [
            ]
        }
    );
    });
   
}