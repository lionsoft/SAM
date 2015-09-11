'use strict';
module App.Filters {

    class EmployeeStatusFilter extends EnumFilter
    {
        Source =
        [
            { Key: EmployeeStatus.Normal, Value: 'Normal' },
            { Key: EmployeeStatus.New, Value: 'New' },
            { Key: EmployeeStatus.Resigned, Value: 'Resigned' },
        ];
    }

    app.filter("EmployeeStatus", EmployeeStatusFilter.Factory());
}