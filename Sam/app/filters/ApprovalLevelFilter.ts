'use strict';
module App.Filters {

    class ApprovalLevelFilter extends EnumFilter
    {
        Source =
        [
            { Key: ApprovalLevel.Nobody, Value: 'Nobody' },
            { Key: ApprovalLevel.Manager, Value: 'Manager' },
            { Key: ApprovalLevel.Building, Value: 'Building' },
            { Key: ApprovalLevel.Area, Value: 'Area' },
            { Key: ApprovalLevel.Door, Value: 'Door' },
        ];
    }

    app.filter("ApprovalLevel", ApprovalLevelFilter.Factory());
}