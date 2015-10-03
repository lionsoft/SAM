﻿'use strict';

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
            odata.$expand("Door,Card.Employees.Department,ApprovedBy")
                .eq("ApprovalStatus", ApprovalStatus.WaitingForApproval.toString())
                .eq("ApprovedBy", app.$auth.LoggedUser.Employee.Id);
        }

        public Approve(cardAccess: ICardAccess) {
            cardAccess.ApprovalStatus = ApprovalStatus.Approved;
            this.Save(cardAccess);
        }

        public Reject(cardAccess: ICardAccess) {
            cardAccess.ApprovalStatus = ApprovalStatus.Rejected;
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