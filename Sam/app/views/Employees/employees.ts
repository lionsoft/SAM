'use strict';

declare class FileUploader {
    constructor(params: { url: string });
    queue: any[];
    filters: any[];
}

module App.Controllers {

    class Employees extends Controller {

        samCustomers: Services.ICustomersService;
        samDepartments: Services.IDepartmentsService;
        samEmployees: Services.IEmployeesService;
        samUsers: Services.IUsersService;
        FileUploader;

        public selectedCustomerId: string;
        public customers: ICustomer[] = [];
        public customerDepartments: IDepartment[] = [];
        public employees: IEmployee[] = [];
        public users: IUser[] = [];

        public uploader/*: FileUploader*/;

        Init() {
            // Queue all promises and wait for them to finish before loading the view
            this.activate(this.LoadCustomers());
            this.samUsers.Load().then(res => this.users = res);
            this.uploader = new this.FileUploader({ url: '/api/Employees/UploadImage' });
            this.uploader.onAfterAddingFile = item => {
                this.uploader.queue.Remove(x => x !== item);
            }
            // Add submit hook to the scope - it will be executed before saving
            this.$scope['$submit'] = item => this.$submit(item);
        }

        LoadCustomers() {
            return this.samCustomers.Load().then(res => this.customers = res.orderBy(x => x.Name).toArray());
        }

        Activated() {
            this.$scope.$watch("$.customers", () => this.selectedCustomerId = this.customers.select(x => x.Id).firstOrDefault());

            this.$scope.$watch("$.selectedCustomerId", () => this.LoadEmployees());
        }

        LoadEmployees() {
            this.employees = [];
            this.customerDepartments = [];
            this.samDepartments.LoadByCustomer(this.selectedCustomerId).then(res => this.customerDepartments = res);
            return this.$timeout(() => this.samEmployees
                .LoadByCustomer(this.selectedCustomerId, "Manager", "Department", "User")
                .then(res => this.employees = res));
        }

        $submit(item: IEmployee): IPromise<boolean> {
            if (this.uploader.queue.length > 0) {
                var d = this.defer<boolean>();
                this.uploader.onSuccessItem = (x, response) => {
                    if (response)
                        item.Image = response[0];
                    this.uploader.queue = [];
                    d.resolve(true);
                };
                this.uploader.onErrorItem = (x, response) => {
                    ApiServiceBase.HandleError(response);
                    d.reject();
                };
                this.uploader.onCompleteItem = () => {
                    this.uploader.onSuccessItem = undefined;
                    this.uploader.onErrorItem = undefined;
                };
                this.uploader.queue[0].upload();
                return <any>d.promise;
            }
            return this.promiseFromResult(true);
        }

        AddEmployee() {
            this.uploader.queue = [];
            this.samEmployees
                .EditModal(<IEmployee>{ Status: EmployeeStatus.New, UserRole: UserRole.Normal }, '_editEmployee.html', this.$scope)
                .then(res => this.employees.push(res));
        }
        EditEmployee(c: IEmployee) {
            this.uploader.queue = [];
            this.samEmployees.EditModal(c, '_editEmployee.html', this.$scope);
        }
        DeleteEmployee(c: IEmployee) { this.samEmployees.DeleteModal(c).then(() => this.employees.Remove(c)); }


    }

    // Register with angular
    app.controller('employees', Employees.Factory("samCustomers", "samEmployees", "samDepartments", "FileUploader", "samUsers"));
}