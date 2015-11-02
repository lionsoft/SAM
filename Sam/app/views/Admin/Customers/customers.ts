'use strict';
module App.Controllers
{
    class Customers extends PageController
    {
//        samTimeZones: Services.ITimeZonesService;
//        samEmployees: Services.IEmployeesService;

        public selectedCustomerId: string;
        public selectedCompanyId: string;
        public selectedDepartmentId: string;

//        public timeZones: ITimeZone[] = [];

        Init() {
        }

        
        //#region - Customer -

        CustomersLoaded(list: ICustomer[]) {
            this.selectedCustomerId = list.select(x => x.Id).firstOrDefault();
        }

        //#endregion 

        //#region - Company -

        prepareCompaniesQuery(odata: Services.OData) {
            odata.$empty = !this.selectedCustomerId;
            odata.eq("CustomerId", this.selectedCustomerId);
            return "selectedCustomerId";
        }
        prepareCompanyEdit(c: ICompany) {
            if (!c.Id)
                c.CustomerId = this.selectedCustomerId;
        }

        CompaniesLoaded(list: ICompany[]) {
            this.selectedCompanyId = list.select(x => x.Id).firstOrDefault();
        }

        //#endregion 

        //#region - Department -

        prepareDepartmentsQuery(odata: Services.OData) {
            odata.$empty = !this.selectedCompanyId;
            odata.eq("CompanyId", this.selectedCompanyId);
            return "selectedCompanyId";
        }

        prepareDepartmentEdit(c: IDepartment) {
            if (!c.Id)
                c.CompanyId = this.selectedCompanyId;
        }

        //#endregion 

    }

    // register controller with angular
    app.controller('customers', Customers.Factory());
}