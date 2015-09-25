'use strict';

module App.Controllers {

    class SetPinCode extends PageController {

        samEmployees: Services.IEmployeesService;

        public pinCode: string;
        public confirmPinCode: string;

        Init() {
        }


        public Submit(form) {
            if (LionSoftAngular.ValidateForm(form)) {
                this.samEmployees.Load(app.$auth.LoggedUser.Employee.Id).then(e => {
                    e.PinCode = parseInt(this.pinCode);
                    this.samEmployees.Save(e).then(() => success("PIN code has been successfully changed."));
                });
            }
        }
    }

    app.controller('setPinCode', SetPinCode.Factory("samEmployees"));

} 