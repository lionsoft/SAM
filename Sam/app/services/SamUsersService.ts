'use strict';

module App.Services {

    export interface IUsersService extends ICRUDService<IUser> {
        /**
         * Add property Employee to the user object and fill it with linked employee
         */
        UpdateEmployee(user: IUser): IPromise<IUser>;
        /**
         * Add property Employee to the users in array and fill it with linked employee
         */
        UpdateEmployee(users: IUser[]): IPromise<IUser[]>;
    }

    class UsersService extends CRUDService<IUser> implements IUsersService {
        TypeDescription = "User";
        GetDescription(user: IUser): string { return user.UserName; }
        
        get ApiService() { return app.api.Account; }

        protected prepareQuery(odata: OData, isSmartLoad?: boolean): void {
            // remove default behavior    
        }

/*
        protected afterQuery(query: IPromise<IUser[]>): IPromise<IUser[]> {
            return query.HandleError().then(x => {
                if (angular.isArray(x) && x[0] && angular.isArray(x[0]['Results']))
                    return this.UpdateEmployee(<IUser[]>(x[0]['Results'])).then(() => x);
                else
                    return this.UpdateEmployee(x);
            });
        }
*/

/*
        protected afterGet(query: IPromise<IUser>): IPromise<IUser> {
            return query.then(res => this.UpdateEmployee(res));
        }
*/

        UpdateEmployee(user: IUser): IPromise<IUser>;
        UpdateEmployee(users: IUser[]): IPromise<IUser[]>;
        UpdateEmployee(p): any {
            if (!p)
                return this.promiseFromResult(p);
            if (angular.isArray(p)) {
                var users = p;
                return this.$q.all<IUser>(users.select(u => this.UpdateEmployee(u)).toArray());
            } else {
                var user = p;
                user.Name = user.UserName;
                return App.app.api.Employees.query(OData.create.eq("UserId", user.Id).$top(1)).then(x => {
                    user.Employee = x.firstOrDefault();
                    if (user.Employee && user.Employee.Name)
                        user.Name = user.Employee.Name;
                    return user;
                });
            }
        }
    }

    app.service("samUsers", UsersService.Factory());
} 