'use strict';

module App.Controllers {

    class EmployeeAccess extends PageController {

        samUsers: Services.IUsersService;
        samEmployees: Services.IEmployeesService;

        customerId: string;
        managerEmployeesIds: string[];

        Init() {
            this.samEmployees.Load(app.$auth.LoggedUser.Employee.Id, "Department.Company,Employees").then(emp => {
                this.customerId = emp.Department.Company.CustomerId;
                this.managerEmployeesIds = emp.Employees.select(x => x.Id).toArray();
                this.$scope.$broadcast("samStRefresh", "samCardAccess");
            });
        }

        prepareQuery(odata: Services.OData) {
            if (!this.customerId)
                odata.$empty = true;
            else {
                odata.$expand("Door.Area.Building.City,Card.Employees,TimeZone").eq("Card.CustomerId", this.customerId);

                odata.$translateResult = (res: ICardAccess[]) => {
                    return res
                        .where(ca => this.managerEmployeesIds.contains(ca.Card.Employee.Id))
                        .groupBy(ca => ca.DoorId + ":" + ca.CardId)
                        .select(g => g
                            .orderBy(x => x.ApprovalStatus === ApprovalStatus.Rejected ? 1
                                    : x.ApprovalStatus === ApprovalStatus.WaitingForApproval ? 2
                                    : 3)
                            .firstOrDefault())
                        .toArray();
                };
            }
        }
    }

    app.controller('employeeAccess', EmployeeAccess.Factory("samUsers", "samEmployees"));

} 