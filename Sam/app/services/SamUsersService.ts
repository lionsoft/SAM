'use strict';

declare module App {
    export interface IUser extends IEntityObjectId { }
}

module App.Services {



    export interface IUsersService extends ICRUDService<IUser> {
    }

    class UsersService extends CRUDService<IUser> implements IUsersService {

        get ApiService(): IResourceClass<IUser> {
            return app.api.Account;
        }

    }

    app.service("samUsers", UsersService.Factory());
} 