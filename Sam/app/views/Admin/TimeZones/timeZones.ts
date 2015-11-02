'use strict';

module App.Controllers {

    class TimeZones extends PageController {

        samCustomers: Services.ICustomersService;

        public selectedCustomerId: string;
        public customers: ICustomer[] = [];

        Init() {
            this.samCustomers.Load().then(res => {
                this.customers = res;
                this.selectedCustomerId = res.select(x => x.Id).firstOrDefault();
            });
        }

        Activated() {
        }

        prepareQuery(odata: Services.OData) {
            if (!this.selectedCustomerId)
                odata.$empty = true;
            else {
                odata.eq("CustomerId", this.selectedCustomerId);
            }
            return "selectedCustomerId";
        }

        prepareEdit(item: ITimeZone) {
            item.CustomerId = item.CustomerId || this.selectedCustomerId;
        }
    }

    // Register with angular
    app.controller('timeZones', TimeZones.Factory("samCustomers"));
}