'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'lists',
                title: 'Lists',
                url: '/lists',
                auth: true,
                roles: [UserRole.Admin],
                templateUrl: '/app/views/Admin/lists/lists.html',
                settings: {
                    topMenu: 'MENU.20.ADMIN',
                    nav: 5,
                    content: 'MENU.LISTS'
                },
                files: [
                    'editDoorList', 'editDepartmentList'
                ]
            }
            );
    });

} 