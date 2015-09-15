'use strict';

module App.Controllers {

    class EditDoorList extends Controller {

        $;
        $item: IDoorList;

        //samCustomers: Services.ICustomersService;
        //        samDoorLists: Services.IDoorListsService;
        //        samDepartmentLists: Services.IDepartmentListsService;

        public selectedCustomerId: string;
//        public customers: ICustomer[] = [];


        Init() {
            // Queue all promises and wait for them to finish before loading the view
            //this.activate(this.LoadCustomers());
        }

/*
        LoadCustomers() {
            return this.samCustomers.Load().then(res => this.customers = res);
        }
*/

        Activated() {
//            this.$scope.$watch("$.customers", () => this.selectedCustomerId = this.customers.select(x => x.Id).firstOrDefault());
        }

        prepareEdit(doorList: IDoorList) {
            if (!doorList.Id) {
                doorList.CustomerId = this.$.selectedCustomerId;
            }
        }

/*
        prepareDoorListEdit(doorList: IDoorList) {
            alert('2');
        }
*/

        IsDoorInList(door: IDoor) {
            this.$item.Doors = this.$item.Doors || [];
            return this.$item.Doors.Contains(door);
        }

        AddDoorToList(door: IDoor) {
            if (!this.IsDoorInList(door))
                this.$item.Doors.push(door);
        }

        RemoveDoorFromList(door: IDoor) {
            if (this.IsDoorInList(door))
                this.$item.Doors.Remove(door);
        }
    }

    // Register with angular
    app.controller('editDoorList', EditDoorList.Factory("samCustomers", "samDoorLists", "samDepartmentLists"));
} 