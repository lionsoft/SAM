'use strict';

declare class FileUploader {
    constructor(params: { url: string });
    queue: any[];
    filters: any[];
}

module App.Controllers {

    class Employees extends PageController {

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
            this.samUsers.Load().then(res => this.users = res);
            this.uploader = new this.FileUploader({ url: '/api/Employees/UploadImage' });
            this.uploader.onAfterAddingFile = item => {
                this.uploader.queue.Remove(x => x !== item);
            }
            // Add submit hook to the scope - it will be executed before saving
            this.$scope['$submit'] = item => this.$submit(item);
            this.activate(this.samCustomers.Load().then(res => this.customers = res));
        }

        Activated() {
            this.$scope.$watch("$.customers", () => this.selectedCustomerId = this.customers.select(x => x.Id).firstOrDefault());
            this.$scope.$watch("$.selectedCustomerId", () => this.LoadEmployees());
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

        prepareQuery(odata: Services.OData) {
            odata.$expand("Manager", "Department", "User").eq("Department.Company.CustomerId", this.selectedCustomerId);
            return "selectedCustomerId";
        }

        prepareEdit(employee: IEmployee) {
            this.uploader.queue = [];
            if (!employee.Id) {
                employee.Status = EmployeeStatus.New;
                employee.UserRole = UserRole.Normal;
                employee.PinCode = 1111;

            }
        }

        LoadEmployees() {
            this.employees = [];
            this.customerDepartments = [];
            this.samDepartments.LoadByCustomer(this.selectedCustomerId).then(res => this.customerDepartments = res);
            this.samEmployees.LoadByCustomer(this.selectedCustomerId).then(res => this.employees = res);
        }
    }

    // Register with angular
    app.controller('employees', Employees.Factory("samCustomers", "samEmployees", "samDepartments", "FileUploader", "samUsers"));
}