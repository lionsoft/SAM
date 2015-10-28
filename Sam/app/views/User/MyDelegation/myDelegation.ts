'use strict';

module App.Controllers {

    class MyDelegation extends PageController {

        samEmployees: Services.IEmployeesService;
        samDepartments: Services.IDepartmentsService;

        public employees: IEmployee[];

        Init() {
            if (app.$auth.LoggedUser.Employee.DepartmentId)
                this.samDepartments.Load(app.$auth.LoggedUser.Employee.DepartmentId, "Company")
                    .then(department => this.samEmployees.LoadByCustomer(department.Company.CustomerId))
                    .then(res => this.employees = res);
            else {
                error("Current employee has no own department set. I can't load his customer's employees.");
            }
        }
    }

    app.controller('myDelegation', MyDelegation.Factory("samEmployees", "samDepartments"));
} 