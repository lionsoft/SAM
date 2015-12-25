'use strict';
module App.Filters {

    class EmployeeStatusFilter extends EnumFilter
    {
        Source =
        [
            { Key: EmployeeStatus.Normal, Value: 'employeeStatus.Normal' },
            { Key: EmployeeStatus.New, Value: 'employeeStatus.New' },
            { Key: EmployeeStatus.Resigned, Value: 'employeeStatus.Resigned' },
        ];
    }

    app.filter("EmployeeStatus", EmployeeStatusFilter.Factory());
}