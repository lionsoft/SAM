'use strict';
module App.Filters {

    class ManagersOfDepartmentFilter extends Filter
    {
        Execute(employees: IEmployee[], departmentId: string): IEmployee[] {
            if (!employees) return [];
            var res = employees.where(e => e.UserRole === UserRole.Manager);
            if (departmentId)
                res = res.where(x => x.DepartmentId === departmentId);
            return res.toArray();
        }
    }

    app.filter("ManagersOfDepartment", ManagersOfDepartmentFilter.Factory());
}