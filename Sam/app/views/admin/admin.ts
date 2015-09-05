'use strict';

module App.Controllers {

    export class Admin extends Controller {

        //#region Variables
        samUsers: Services.IUsersService;

        public selectedUser: IUser;
        public users: IUser[] = [];

        //#endregion

        Init() {
            // Queue all promises and wait for them to finish before loading the view
            this.activate(this.LoadUsers());
        }

        Activated() {
            this.$scope.$watch("$.users", () => this.selectedUser = this.users.orderBy(x => x.UserName).firstOrDefault());

            this.$scope.$watch("$.selectedUser", () => this.UserChanged());
        }

        LoadUsers() {
            this.users = [];
            return this.$timeout(() => {
                return this.samUsers.Load().then(res => this.users = res);
            });
        }

        AddUser() { this.samUsers.EditModal(null, '_editUser.html').then(res => this.users.push(res)); }

        EditUser(c: IUser) { this.samUsers.EditModal(c, '_editUser.html'); }


        DeleteUser(c: IUser) {
            if (!c) return;
            app.popup.ask(this.Translate("Ask.Delete").format(c.UserName), false)
                .then(r => r ? this.samUsers.Delete(c.Id) : false)
                .then(r => r ? this.users.Remove(c) : false);
        }


        UserChanged() {
            
        }

    }

    // Register with angular
    app.controller('admin', Admin.Factory("samUsers"));
}