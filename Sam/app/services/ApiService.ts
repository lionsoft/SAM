'use strict';

// ReSharper disable InconsistentNaming
module App {

    export interface IAccountApi extends IResourceClass<IUser>  {
        Register(login: string, password: string): IPromise<IUser>;
        Login(login: string, password: string, rememberMe?: boolean): IPromise<IUser>;
        Logout(): IPromise<void>;
    }

    export interface IEmployeeApi extends IResourceClass<IEmployee> {
        ResetPin(id?: string): IPromise<void>;
    }
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
        Activate(cardId: string, employeeId?: string): IPromise<void>;
        LostCardRequest(explanation: string, employeeId?: string): IPromise<void>;
    }
    export interface IDoorListsApi extends IResourceClass<IDoorList> { }
    export interface IDepartmentListsApi extends IResourceClass<IDepartmentList> { }
    export interface ICardAccessApi extends IResourceClass<ICardAccess> {
        RequestAccess(doorIds: string[], note: string, employeeId?: string): IPromise<void>;
    }
    export interface ISystemParametersApi extends IResourceClass<ISystemParameter> { }
    export interface ITimeZonesApi extends IResourceClass<ITimeZone> { }
 

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

        SystemParameters: ISystemParametersApi;
        TimeZones: ITimeZonesApi;
    }                                                 

    export class ApiService extends ApiServiceBase implements IApiService {

        Account: IAccountApi = {
            Register: <any>{ method: "POST", route: "Register", params: { Login: null, Password: null } },
            Login: <any>{ method: "POST", route: "Login", params: { Login: null, Password: null, RememberMe: null } },
            Logout: <any>{ method: "POST", route: "Logout" },
        };

        Employees: IEmployeeApi = {
            ResetPin: <any>{ method: "POST", route: "ResetPin/:id" },
        };
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

        Cards: ICardsApi = {
            Activate: <any>{ method: "POST", route: "Activate", params: { CardId: null, EmployeeId: null } },
            LostCardRequest: <any>{ method: "POST", route: "LostCardRequest", params: { EmployeeId: null, Explanation: null } },
        };


        CardAccess: ICardAccessApi = {
            RequestAccess: <any>{ method: "POST", route: "RequestAccess", params: { DoorIds: null, Note: null, EmployeeId: null } },
        };

        SystemParameters: ISystemParametersApi = {};

        TimeZones: ITimeZonesApi = {};

        Init() {
            super.Init(URL.API);
        }
    }

    app.service("ApiService", ApiService.Factory());
}
