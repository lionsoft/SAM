'use strict';

module App {
    app.config(() => {
        Routes.push(
            {
                name: 'assignments',
                title: 'Assignments',
                url: '/assignments',
                auth: true,
                templateUrl: '/app/views/assignments/assignments.html',
                settings: {
                    nav: 6,
                    content: 'MENU.ASSIGNMENTS|<i class="fa fa-gg"></i> Assignments'
                },
                files: [
                ]
            }
        );
    });
   
}