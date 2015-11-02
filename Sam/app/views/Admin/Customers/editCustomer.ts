'use strict';

module App.Controllers {

    class EditCustomer extends Controller {
        $;
        $item: ICustomer;

        samEmployees: Services.IEmployeesService;
        public employees: IEmployee[] = [];

        Init() {  }

        prepareEdit(customer: ICustomer) {
            this.samEmployees.LoadByCustomer(customer.Id).then(x => this.employees = x);
            if (!customer.PinCodeLength)
                customer.PinCodeLength = 4;
        }
    }

    // Register with angular
    app.controller('editCustomer', EditCustomer.Factory("samEmployees"));
} 