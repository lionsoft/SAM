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

        protected prepareQuery(odata: OData): void {
            odata.clear();
        }


    }

    app.service("samUsers", UsersService.Factory());
} 