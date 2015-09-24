'use strict';

module App.Controllers {

    class ActivateCard extends PageController {

        samCards: Services.ICardsService;
        samEmployees: Services.IEmployeesService;
        samUsers: Services.IUsersService;

        public activationCode: string;

        public pinCode: string;

        /**
         * Gets the flag whether the current user has pin code defined
         */
        public noPinCode: boolean;

        Init() {
            this.samUsers.Update(app.$auth.LoggedUser).then(() => {
                this.noPinCode = !app.$auth.LoggedUser.Employee.PinCode;
            });
        }


        public Activate(form) {
            if (LionSoftAngular.ValidateForm(form)) {
                if (app.$auth.LoggedUser.Employee.PinCode !== parseInt(this.pinCode))
                    this.popupService.warning("Invalid Pin Code.");
                else {
                    // Search the card with the activating code
                    this.samCards.Load(Services.OData.create.eq("ActivationCode", this.activationCode).$top(1)).then(c => {
                        var card = c.firstOrDefault();
                        if (!card)
                            this.popupService.warning("There is no card with this activation code.");
                        else {
                            alert('OK');
                        }
                    });
                }
            }
        }
    }

    app.controller('activateCard', ActivateCard.Factory("samCards", "samEmployees", "samUsers"));

} 