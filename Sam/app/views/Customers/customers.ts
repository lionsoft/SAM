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
            this.$scope.$watch("$.customers", () => this.selectedCustomer = this.customers[0]);
            this.$scope.$watch("$.companies", () => this.selectedCompany = this.companies[0]);
            this.$scope.$watch("$.departments", () => this.selectedDepartment = this.departments[0]);

            this.$scope.$watch("$.selectedCustomer", () => this.LoadCompanies());
            this.$scope.$watch("$.selectedCompany", () => this.LoadDepartments());
            this.$scope.$watch("$.selectedDepartment", () => this.DepartmentChanged());
        }

        LoadCustomers() {
            this.customers = [];
            return this.$timeout(() => {
                return this.samCustomers.Load().then(res => {
                    this.customers = res;
                });
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

        AddCustomer() {
            alert('add customer');
            
        }

        EditCustomer(c: ICustomer) {
            alert('edit customer' + c.Name);
            var scope = <any>this.$scope.$new();
            scope.$item = c;
            app.popup.popup('_edit.html', scope);
        }


        DeleteCustomer(c: ICustomer) {
            if (!c) return;
            app.popup.ask(this.Translate("ASK.DELETE.CUSTOMER|{0}: Delete customer?").format(c.Name), false)
                .then(r => {
                        if (r)
                            return this.samCustomers.Delete(c.Id);
                        else
                            return false;
                    }
                ).then(r => {
                   if (r) {
                       this.customers.Remove(c);
                   }
                });
            ;

        }

        DeleteCompany(c: ICompany) {

        }

        DeleteDepartment(d: IDepartment) {

        }

    }

    // register controller with angular
    app.controller('customers', Customers.Factory("samCustomers", "samCompanies", "samDepartments"));
}