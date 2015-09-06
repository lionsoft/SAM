'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'doors',
                title: 'Doors',
                url: '/doors',
                auth: true,
                templateUrl: '/app/views/doors/doors.html',
                settings: {
                    nav: 1,
                    content: 'MENU.DOORS|<i class="fa fa-lock"></i> Doors'
                },
                files: [
                ]
            }
        );
    });
   
}