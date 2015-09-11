'use strict';

module App.Services {

    export interface IDepartmentsService extends ICRUDService<IDepartment> {
        /**
         * Load departments for the specified customer only
         * @param customerId customer Id
         */
        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<IDepartment[]>;
    }

    class DepartmentsService extends CRUDService<IDepartment> implements IDepartmentsService {
        TypeDescription = "Department";
        get ApiService() { return app.api.Departments; }

        /**
         * Load departments for the specified customer only
         * @param customerId customer Id
         */
        LoadByCustomer(customerId: string, ...expands: string[]): IPromise<IDepartment[]> {
            return super.Load(OData.create.$expand(...expands).eq("Company.CustomerId", customerId));
        }
    }

    app.service("samDepartments", DepartmentsService.Factory());
} 