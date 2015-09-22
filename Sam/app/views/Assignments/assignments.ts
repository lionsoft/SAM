'use strict';

module App.Controllers {

    class Assignments extends PageController {
        samCustomers: Services.ICustomersService;
        samCards: Services.ICardsService;
        samDoors: Services.IDoorsService;
        samEmployees: Services.IEmployeesService;

        public selectedCustomerId: string;
        public customers: ICustomer[] = [];

        public selectedCardId: string;
        public cards: ICard[] = [];

        public selectedDoorId: string;
        public doors: IDoor[] = [];

        public selectedEmployeeId: string;
        public employees: IEmployee[] = [];

        Init() {
            this.activate(
                  this.samCustomers.Load().then(res => this.customers = res)
               ,  this.samCards.Load().then(res => this.cards = res)
                , this.samDoors.Load().then(res => this.doors = res)
                , this.samEmployees.Load().then(res => this.employees = res)
            );
        }

        prepareQuery(odata: Services.OData) {
            odata.$expand("Card, Door, Employee, Employee.Department, ApprovedBy");
        }

    }

    // Register with angular
    app.controller('assignments', Assignments.Factory("samCustomers", "samCards", "samDoors", "samEmployees"));
} 