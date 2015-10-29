'use strict';

module App.Controllers {

    class MyAccess extends PageController {

        samUsers: Services.IUsersService;

        Init() {
            var cardId = app.$auth.LoggedUser.Employee.CardId;
            this.samUsers.Update(app.$auth.LoggedUser).then(() => {
                if (cardId !== app.$auth.LoggedUser.Employee.CardId) {
                    this.$scope.$broadcast("samStRefresh", "samCardAccess");
                }
            });
        }

        prepareQuery(odata: Services.OData) {
            if (!app.$auth.LoggedUser.Employee.CardId)
                odata.$empty = true;
            else
                odata.$expand("Door.Area.Building.City")
                     .eq("CardId", app.$auth.LoggedUser.Employee.CardId);
        }
    }

    app.controller('myAccess', MyAccess.Factory("samUsers"));

} 