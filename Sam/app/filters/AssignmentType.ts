'use strict';
module App.Filters {

    class AssignmentTypeFilter extends EnumFilter
    {
        Source =
        [
            { Key: AssignmentType.Special, Value: 'assignmentType.Special' },
            { Key: AssignmentType.Standard, Value: 'assignmentType.Standard' },
        ];
    }

    app.filter("AssignmentType", AssignmentTypeFilter.Factory());
}