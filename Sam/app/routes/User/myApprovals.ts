'use strict';

module App {
    app.config(() => {
    Routes.push(
        {
            name: 'myApprovals',
            title: 'MyApprovals',
            url: '/myApprovals',
            auth: true,
            roles: [UserRole.Admin, UserRole.AreaOwner, UserRole.BuildingOwner, UserRole.DoorOwner, UserRole.Manager],
            templateUrl: '/app/views/User/MyApprovals/myApprovals.html',
            settings: {
                topMenu: 'MENU.10.USER',
                nav: 6,
                content: 'MENU.MY-APPROVALS'
            },
            files: [
            ]
        }
    );
    });
   
}