'use strict';
module App.Controllers
{
    class Customers extends Controller
    {
//#region Variables
        samCustomers: Services.ICustomersService;
        samCompanies: Services.ICompaniesService;
        samDepartments: Services.IDepartmentsService;

        public selectedCustomer: ICustomer;
        public customers: ICustomer[] = [];

        public selectedCompany: ICompany;
        public companies: ICompany[] = [];

        public selectedDepartment: IDepartment;
        public departments: IDepartment[] = [];

//#endregion

        Init() {
            // Queue all promises and wait for them to finish before loading the view
            this.activate(this.LoadCustomers());
        }

        Activated() {
            this.$scope.$watch("$.customers", () => this.selectedCustomer = this.customers.orderBy(x => x.Name).firstOrDefault());
            this.$scope.$watch("$.companies", () => this.selectedCompany = this.companies.orderBy(x => x.Name).firstOrDefault());
            this.$scope.$watch("$.departments", () => this.selectedDepartment = this.departments.orderBy(x => x.Name).firstOrDefault());

            this.$scope.$watch("$.selectedCustomer", () => this.LoadCompanies());
            this.$scope.$watch("$.selectedCompany", () => this.LoadDepartments());
            this.$scope.$watch("$.selectedDepartment", () => this.DepartmentChanged());
        }

        LoadCustomers() {
            this.customers = [];
            return this.$timeout(() => {
                return this.samCustomers.Load().then(res => this.customers = res);
            });
        }

        LoadCompanies() {
            this.companies = [];
            this.$timeout(() => {
                if (this.selectedCustomer)
                    this.samCompanies.Load(Services.OData.create.eq("CustomerId", this.selectedCustomer.Id)).then(res => {
                        this.companies = res;
                    });
            });
        }

        LoadDepartments() {
            this.departments = [];
            this.$timeout(() => {
                if (this.selectedCompany)
                    this.samDepartments.Load(Services.OData.create.eq("CompanyId", this.selectedCompany.Id)).then(res => {
                        this.departments = res;
                    });
            });
        }

        DepartmentChanged() {

        }

        AddCustomer() { this.samCustomers.EditModal(null, '_editCustomer.html').then(res => this.customers.push(res)); }

        EditCustomer(c: ICustomer) { this.samCustomers.EditModal(c, '_editCustomer.html'); }


        DeleteCustomer(c: ICustomer) {
            if (!c) return;
            app.popup.ask(this.Translate("Ask.Delete.Customer").format(c.Name), false)
                .then(r => r ? this.samCustomers.Delete(c.Id) : false)
                .then(r => r ? this.customers.Remove(c) : false);
        }


        AddCompany() { this.samCompanies.EditModal(null, '_editCompany.html').then(res => this.companies.push(res)); }

        EditCompany(c: ICompany) { this.samCompanies.EditModal(c, '_editCompany.html'); }

        DeleteCompany(c: ICompany) {
            if (!c) return;
            app.popup.ask(this.Translate("Ask.Delete.Company|{0}: Delete company?").format(c.Name), false)
                .then(r => r ? this.samCompanies.Delete(c.Id) : false)
                .then(r => r ? this.companies.Remove(c) : false);
        }

        AddDepartment() {
            if (this.selectedCompany)
                this.samDepartments.EditModal( <any>{ CompanyId: this.selectedCompany.Id }, '_editDepartment.html').then(res => this.departments.push(res));
        }

        EditDepartment(d: IDepartment) { this.samDepartments.EditModal(d, '_editDepartment.html'); }

        DeleteDepartment(d: IDepartment) {
            if (!d) return;
            app.popup.ask(this.Translate("Ask.Delete.Department|{0}: Delete department?").format(d.Name), false)
                .then(r => r ? this.samDepartments.Delete(d.Id) : false)
                .then(r => r ? this.departments.Remove(d) : false);
        }

    }

    // register controller with angular
    app.controller('customers', Customers.Factory("samCustomers", "samCompanies", "samDepartments"));
}