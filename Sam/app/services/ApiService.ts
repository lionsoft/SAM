'use strict';

// ReSharper disable InconsistentNaming
module App {

    export interface IAccountApi {
        Register(login: string, password: string): IPromise<IUser>;
        Login(login: string, password: string, rememberMe?: boolean): IPromise<IUser>;
        Logout(): IPromise<void>;
    }


    export interface ICustomersApi extends IResourceClass<ICustomer> { }
    export interface ICompaniesApi extends IResourceClass<ICompany> { }
    export interface IDepartmentsApi extends IResourceClass<IDepartment> { }

    export interface IApiService {

        Account: IAccountApi;

        Customers: ICustomersApi;
    }

    export class ApiService extends ApiServiceBase implements IApiService {

        Account: IAccountApi = {
            Register: <any>{ method: "POST", route: "Register", params: { Login: null, Password: null } },
            Login: <any>{ method: "POST", route: "Login", params: { Login: null, Password: null, RememberMe: null } },
            Logout: <any>{ method: "POST", route: "Logout" },
        };

        Customers: ICustomersApi = {};
        Companies: ICompaniesApi = {};
        Departments: IDepartmentsApi = {};

        Init() {
            super.Init(URL.API);
        }
    }

    app.service("ApiService", ApiService.Factory());
}
