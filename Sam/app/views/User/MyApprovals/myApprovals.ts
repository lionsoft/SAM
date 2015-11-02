'use strict';

module App.Controllers {

    class MyApprovals extends PageController {

        samUsers: Services.IUsersService;

        samCardAccess: Services.ICardAccessService;

        Init() {
/*
            var cardId = app.$auth.LoggedUser.Employee.CardId;
            this.samUsers.Update(app.$auth.LoggedUser).then(() => {
                if (cardId !== app.$auth.LoggedUser.Employee.CardId)
                    this.$scope.$broadcast("samStRefresh", "samCardAccess");
            });
*/
        }

        public prepareQuery(odata: Services.OData) {
            odata.$expand("Door,Card.Employees.Department,ApprovedBy,TimeZone")
                .eq("ApprovalStatus", ApprovalStatus.WaitingForApproval.toString())
                .eq("ApprovedById", app.$auth.LoggedUser.Employee.Id);
        }

        public Approve(cardAccess: ICardAccess) {
            cardAccess.ApprovalStatus = ApprovalStatus.Approved;
            //cardAccess.ApprovedDate = moment(); // will set in backend
            this.Save(cardAccess);
        }

        public Reject(cardAccess: ICardAccess) {
            cardAccess.ApprovalStatus = ApprovalStatus.Rejected;
            //cardAccess.ApprovedDate = moment(); // will set in backend
            this.Save(cardAccess);
        }

        Save(cardAccess: ICardAccess) {
            this.samCardAccess.Save(cardAccess).then(() => {
                this.$scope.$broadcast("samStRefresh", "samCardAccess");
                success("OK");
            });
        }
    }

    app.controller('myApprovals', MyApprovals.Factory("samUsers", "samCardAccess"));

} 