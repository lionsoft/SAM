'use strict';

module App.Controllers {

    class Users extends PageController {

        samUsers: Services.IUsersService;

        Init() {
        }

        Activated() {
        }

    }

    // Register with angular
    app.controller('users', Users.Factory("samUsers"));
}