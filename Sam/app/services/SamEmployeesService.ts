'use strict';

module App.Services {

    export interface IEmployeesService extends ICRUDService<IEmployee> {
        /**
         * Load employees for the specified customer only
         * @param customerId customer Id
         */
        LoadByCustomer(customerId: string): IPromise<IEmployee[]>;
    }

    class EmployeesService extends CRUDService<IEmployee> implements IEmployeesService {
        TypeDescription = "Employee";
        GetDescription(employee: IEmployee): string { return employee.Name; }
        
        get ApiService() { return app.api.Employees; }


        LoadByCustomer(customerId: string): IPromise<IEmployee[]> {
            return super.Load(OData.create.eq("Department.Company.CustomerId", customerId));
        }
    }

    app.service("samEmployees", EmployeesService.Factory());
} 