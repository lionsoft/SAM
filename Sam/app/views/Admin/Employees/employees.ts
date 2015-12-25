'use strict';

declare class FileUploader {
    constructor(params: { url: string });
    queue: any[];
    filters: any[];
}

module App.Controllers {

    class Employees extends PageController {

        samCustomers: Services.ICustomersService;
        samEmployees: Services.IEmployeesService;
        FileUploader;

        // Need for editEmployee dialog
        samDepartments: Services.IDepartmentsService;
        samUsers: Services.IUsersService;
        public customerDepartments: IDepartment[] = [];
        public users: IUser[] = [];


        public selectedCustomerId: string;
        public customers: ICustomer[] = [];
        public employees: IEmployee[] = [];

        public uploader/*: FileUploader*/;

        Init() {
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
            this.$scope.$watch("$.selectedCustomerId", () => {
                this.employees = [];
                this.customerDepartments = [];
                this.samDepartments.LoadByCustomer(this.selectedCustomerId).then(res => this.customerDepartments = res);
                this.samEmployees.LoadByCustomer(this.selectedCustomerId).then(res => this.employees = res);
            });
        }

        $submit(item: IEmployee): IPromise<boolean> {
            var res = this.promiseFromResult(true);
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
                res = <any>d.promise;
            }
            return res.then(() => this.samEmployees.Save(item)).then(() => true);
        }

        prepareQuery(odata: Services.OData) {
            odata.$expand("Manager", "Department", "User", "Card", "DelegateTo").eq("Department.Company.CustomerId", this.selectedCustomerId);
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
    }

    // Register with angular
    app.controller('employees', Employees.Factory("FileUploader", "samCustomers", "samEmployees", "samDepartments", "samUsers"));
}