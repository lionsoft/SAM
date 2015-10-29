'use strict';

module App.Controllers {

    class MyDelegation extends PageController {

        samEmployees: Services.IEmployeesService;
        samDepartments: Services.IDepartmentsService;

        public employees: IEmployee[];
        public noCustomer: boolean;
        public noEmployee: boolean;

        public DelegateToId: string;
        public DelegateFromDate: Date | moment.Moment | string;
        public DelegateToDate: Date | moment.Moment | string;


        Init() {
            this.$scope.$watch("$.DelegateToId", val => {
                if (!val) {
                    this.DelegateFromDate = undefined;
                    this.DelegateToDate = undefined;
                }
            });
            this.UpdateEmployee().then(employee => {
                this.DelegateFromDate = employee.DelegateFromDate;
                this.DelegateToDate = employee.DelegateToDate;
                this.DelegateToId = employee.DelegateToId;

                if (employee.DepartmentId)
                    this.samDepartments.Load(employee.DepartmentId, "Company")
                        .then(department => this.samEmployees.LoadByCustomer(department.Company.CustomerId))
                        .then(res => this.employees = res);
                else {
                    this.noCustomer = true;
                }
            });
        }

        UpdateEmployee(): IPromise<IEmployee> {
            if (!app.$auth.LoggedUser.Employee || !app.$auth.LoggedUser.Employee.Id) {
                this.noEmployee = true;
                this.noCustomer = true;
                return undefined;
            }
            return this.samEmployees.Load(app.$auth.LoggedUser.Employee.Id)
                .then(employee => {
                    app.$auth.LoggedUser.Employee = employee;
                    return employee;
                });
        }

        Clear() {
            this.DelegateToId = undefined;
        }

        Submit(form: ng.IFormController) {
            this.UpdateEmployee()
                .then(employee => {
                    var e = angular.copy(employee);
                    e.DelegateFromDate = this.DelegateFromDate;
                    e.DelegateToDate = this.DelegateToDate;
                    e.DelegateToId = this.DelegateToId;
                    return e;
                })
                .then(e => this.samEmployees.Save(e))
                .then(e => {
                    app.$auth.LoggedUser.Employee = e;
                    this.DelegateFromDate = e.DelegateFromDate;
                    this.DelegateToDate = e.DelegateToDate;
                    this.DelegateToId = e.DelegateToId;
                    success("Your delegation is successfully saved.");
                });
        }
    }

    app.controller('myDelegation', MyDelegation.Factory("samEmployees", "samDepartments"));
} 