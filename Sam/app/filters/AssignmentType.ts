'use strict';
module App.Filters {

    class AssignmentTypeFilter extends EnumFilter
    {
        Source =
        [
            { Key: AssignmentType.Special, Value: 'Special' },
            { Key: AssignmentType.Standard, Value: 'Standard' },
        ];
    }

    app.filter("AssignmentType", AssignmentTypeFilter.Factory());
}