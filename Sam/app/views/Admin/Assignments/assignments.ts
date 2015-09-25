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
            this.$scope.$watch("$.selectedCustomerId", (id: string) => {
                this.loadCards(id);
                this.loadDoors(id);
                this.loadEmployees(id);
            });
            this.activate(
                this.samCustomers.Load().then(res => {
                    this.customers = res;
                    //this.selectedCustomerId = res.select(x => x.Id).firstOrDefault();
                })
                , this.samEmployees.Load().then(res => this.employees = res)
            );
        }

        loadCards(customerId: string) {
            this.cards = [];
            this.selectedCardId = undefined;
            this.samCards.Load(Services.OData.create.eq("CustomerId", customerId)).then(res => {
                this.cards = res;
                //this.selectedCardId = res.select(x => x.Id).firstOrDefault();
            });
        }
        loadDoors(customerId: string) {
            this.doors = [];
            this.selectedDoorId = undefined;
            this.samDoors.Load(Services.OData.create.eq("Owner.Department.Company.CustomerId", customerId)).then(res => {
                this.doors = res;
                //this.selectedDoorId = res.select(x => x.Id).firstOrDefault();
            });
        }
        loadEmployees(customerId: string) {
            this.employees = [];
            this.selectedEmployeeId = undefined;
            this.samEmployees.Load(Services.OData.create.eq("Department.Company.CustomerId", customerId)).then(res => {
                this.employees = res;
                //this.selectedEmployeeId = res.select(x => x.Id).firstOrDefault();
            });
        }

        prepareQuery(odata: Services.OData) {
            odata
                .$expand("Card, Door, Employee, Employee.Department, ApprovedBy")
                .eq("Card.CustomerId", this.selectedCustomerId)
                .eq("CardId", this.selectedCardId)
                .eq("DoorId", this.selectedDoorId)
                .eq("EmployeeId", this.selectedEmployeeId)
            ;
            return "selectedCustomerId,selectedCardId,selectedDoorId,selectedEmployeeId";
        }

        prepareEdit(cardAccess: ICardAccess) {
            if (!cardAccess.Id) {
                cardAccess.EmployeeId = this.selectedEmployeeId;
                cardAccess.CardId = this.selectedCardId;
                cardAccess.DoorId = this.selectedDoorId;
                cardAccess.ApprovalLevel = ApprovalLevel.Nobody;
            }
        }
    }

    // Register with angular
    app.controller('assignments', Assignments.Factory("samCustomers", "samCards", "samDoors", "samEmployees"));
} 