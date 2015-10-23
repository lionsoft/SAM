'use strict';

module App.Controllers {

    class SetPinCode extends PageController {

        samEmployees: Services.IEmployeesService;

        public oldPinCode: string;
        public pinCode: string;
        public confirmPinCode: string;

        Init() {
        }


        public Submit(form) {
            if (LionSoftAngular.ValidateForm(form)) {
                if (app.$auth.LoggedUser.Employee.PinCode !== parseInt(this.oldPinCode)) {
                    this.popupService.error("Old Pin Code is Invalid.");
                } else {
                    this.samEmployees.Load(app.$auth.LoggedUser.Employee.Id).then(e => {
                        e.PinCode = parseInt(this.pinCode);
                        this.samEmployees.Save(e).then(() => {
                            this.oldPinCode = "";
                            this.pinCode = "";
                            this.confirmPinCode = "";
                            success("PIN code has been successfully changed.");
                        });
                    });
                }
            }
        }

        public RenewPin() {
            this.popupService.ask("We will reset your current PIN ans send it on your email. Are you sure?", false).then(res => {
                if (res) {
                    if (!app.$auth.LoggedUser.Employee.Email) {
                        this.popupService.error("EmployeeEmailIsNotSet");
                    } else {
                        this.samEmployees.ResetPin().HandleError().then(() => {
                            this.oldPinCode = "";
                            this.pinCode = "";
                            this.confirmPinCode = "";
                            success("The new PIN code has been sent on youe email.");
                        });
                    }
                }
            });
        }
    }

    app.controller('setPinCode', SetPinCode.Factory("samEmployees"));

} 