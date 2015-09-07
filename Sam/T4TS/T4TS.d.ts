/****************************************************************************
  Generated by T4TS.tt - don't make any changes in this file
****************************************************************************/

declare module App {
    /** Generated from Sam.DbContext.EmployeeStatus **/
    const enum EmployeeStatus {
        New = 0,
        Normal = 1,
        Resigned = 2,
    }
    /** Generated from Sam.DbContext.UserRole **/
    const enum UserRole {
        Normal = 1,
        BuildingOwner = 2,
        AreaOwner = 4,
        DoorOwner = 8,
        Manager = 16,
        Admin = 32,
    }
    /** Generated from Sam.DbContext.Area **/
    export interface IArea extends App.IEntityObjectBaseId {
        Name: string;
        BuildingId: string;
        Building: App.IBuilding;
        OwnerId: string;
        Owner: App.IEmployee;
    }
    /** Generated from Sam.DbContext.Building **/
    export interface IBuilding extends App.IEntityObjectBaseId {
        Name: string;
        Address1: string;
        Address2: string;
        CityId: string;
        City: App.ICity;
        CustomerId: string;
        Customer: App.ICustomer;
        OwnerId: string;
        Owner: App.IEmployee;
    }
    /** Generated from Sam.DbContext.City **/
    export interface ICity extends App.IEntityObjectBaseId {
        Name: string;
        ZipCode: string;
        CountryId: string;
        Country: App.ICountry;
    }
    /** Generated from Sam.DbContext.Country **/
    export interface ICountry extends App.IEntityObjectBaseId {
        Name: string;
    }
    /** Generated from Sam.DbContext.EntityObjectId<TKey> **/
    export interface IEntityObjectBaseId {
        Id: any;
        CreatedDate: string;
        CreatedById: string;
        CreatedBy: App.IUser;
        ModifiedDate: string;
        ModifiedById: string;
        ModifiedBy: App.IUser;
    }
    /** Generated from Sam.DbContext.EntityObjectId **/
    export interface IEntityObjectId extends App.IEntityObjectBaseId {
    }
    /** Generated from Sam.DbContext.Company **/
    export interface ICompany extends App.IEntityObjectBaseId {
        Name: string;
        ZipCode: string;
        Address1: string;
        Address2: string;
        CustomerId: string;
        Customer: App.ICustomer;
    }
    /** Generated from Sam.DbContext.Customer **/
    export interface ICustomer extends App.IEntityObjectBaseId {
        Name: string;
    }
    /** Generated from Sam.DbContext.Department **/
    export interface IDepartment extends App.IEntityObjectBaseId {
        Name: string;
        CompanyId: string;
        Company: App.ICompany;
    }
    /** Generated from Sam.DbContext.Employee **/
    export interface IEmployee {
        Id: string;
        Name: string;
        Email?: string;
        PinCode?: number;
        Status: App.EmployeeStatus;
        Image?: string;
        UserRole: App.UserRole;
        DepartmentId?: string;
        Department: App.IDepartment;
        ManagerId?: string;
        Manager: App.IEmployee;
        UserId?: string;
        User: App.IUser;
    }
    /** Generated from Sam.DbContext.TypeScriptUser **/
    export interface IUser {
        Id: string;
        UserName?: string;
        PasswordHash?: string;
        Email?: string;
    }
}
