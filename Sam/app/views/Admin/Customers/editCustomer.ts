'use strict';

module App.Controllers {

    class EditCustomer extends Controller {
        $;
        $item: ICustomer;

        samEmployees: Services.IEmployeesService;
        samTimeZones: Services.ITimeZonesService;

        public employees: IEmployee[] = [];
        public timeZones: ITimeZone[] = [];

        Init() {
            
        }

        prepareEdit(customer: ICustomer) {
            this.samTimeZones.LoadByCustomer(customer.Id).then(x => this.timeZones = x);
            this.samEmployees.LoadByCustomer(customer.Id).then(x => this.employees = x);
            if (!customer.PinCodeLength)
                customer.PinCodeLength = 4;
        }
    }

    // Register with angular
    app.controller('editCustomer', EditCustomer.Factory("samEmployees", "samTimeZones"));
} 