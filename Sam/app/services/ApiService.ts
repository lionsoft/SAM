'use strict';

// ReSharper disable InconsistentNaming
module App {

    export interface IAccountApi extends IResourceClass<IUser>  {
        Register(login: string, password: string): IPromise<IUser>;
        Login(login: string, password: string, rememberMe?: boolean): IPromise<IUser>;
        Logout(): IPromise<void>;
    }

    export interface IEmployeeApi extends IResourceClass<IEmployee> { }
    export interface IEmployeeCardApi extends IResourceClass<IEmployeeCard> { }

    export interface ICustomersApi extends IResourceClass<ICustomer> { }
    export interface ICompaniesApi extends IResourceClass<ICompany> { }
    export interface IDepartmentsApi extends IResourceClass<IDepartment> { }

    export interface ICountriesApi extends IResourceClass<ICountry> { }
    export interface ICitiesApi extends IResourceClass<ICity> { }
    export interface IBuildingsApi extends IResourceClass<IBuilding> { }
    export interface IAreasApi extends IResourceClass<IArea> { }
    export interface IDoorsApi extends IResourceClass<IDoor> { }
    export interface ICardsApi extends IResourceClass<ICard> {
        Activate(cardId: string, employeeId: string): IPromise<void>;
    }
    export interface IDoorListsApi extends IResourceClass<IDoorList> { }
    export interface IDepartmentListsApi extends IResourceClass<IDepartmentList> { }
    export interface ICardAccessApi extends IResourceClass<ICardAccess> { }
 

    export interface IApiService {

        Account: IAccountApi;
        Employees: IEmployeeApi;
        EmployeeCards: IEmployeeCardApi;

        Customers: ICustomersApi;
        Companies: ICompaniesApi;
        Departments: IDepartmentsApi;
        DepartmentLists: IDepartmentListsApi;

        Countries: ICountriesApi;
        Cities: ICitiesApi;
        Buildings: IBuildingsApi;
        Areas: IAreasApi;
        Doors: IDoorsApi;
        DoorLists: IDoorListsApi;

        Cards: ICardsApi;
        CardAccess: ICardAccessApi;
    }                                                 

    export class ApiService extends ApiServiceBase implements IApiService {

        Cards: ICardsApi = {
            Activate: <any>{ method: "POST", route: "Activate/:cardId/:employeeId" },
        };

        Account: IAccountApi = {
            Register: <any>{ method: "POST", route: "Register", params: { Login: null, Password: null } },
            Login: <any>{ method: "POST", route: "Login", params: { Login: null, Password: null, RememberMe: null } },
            Logout: <any>{ method: "POST", route: "Logout" },
        };

        Employees: IEmployeeApi = {};
        EmployeeCards: IEmployeeCardApi = {};

        Customers: ICustomersApi = {};
        Companies: ICompaniesApi = {};
        Departments: IDepartmentsApi = {};
        DepartmentLists: IDepartmentListsApi = {};

        Countries: ICountriesApi = {};
        Cities: ICitiesApi = {};
        Buildings: IBuildingsApi = {};
        Areas: IAreasApi = {};
        Doors: IDoorsApi = {};
        DoorLists: IDoorListsApi = {};

        CardAccess: ICardAccessApi = {};

        Init() {
            super.Init(URL.API);
        }
    }

    app.service("ApiService", ApiService.Factory());
}
