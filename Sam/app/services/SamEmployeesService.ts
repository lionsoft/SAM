'use strict';

module App.Services {

    export interface IEmployeesService extends ICRUDService<IEmployee> {
        /**
         * Load employees for the specified customer only
         * @param customerId customer Id
         */
        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<IEmployee[]>;

        /**
         * Reset the employee PIN code of the employee and send it to him by email.
         * @param id Employee ID or undefined for current logged employee.
         */
        ResetPin(id?: string): IPromise<void>;
    }

    class EmployeesService extends CRUDService<IEmployee> implements IEmployeesService {
        TypeDescription = "Employee";
        GetDescription(employee: IEmployee): string { return employee.Name; }
        
        get ApiService() { return app.api.Employees; }

        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<IEmployee[]> {
            return super.Load(OData.create.$expand(...expands).eq("Department.Company.CustomerId", customerId));
        }

        ResetPin(id?: string): IPromise<void> {
            return this.ApiService.ResetPin(id);
        }


    }

    app.service("samEmployees", EmployeesService.Factory());
} 