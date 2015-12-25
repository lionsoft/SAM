'use strict';
module App.Filters {

    class ApprovalLevelFilter extends EnumFilter
    {
        Source =
        [
            { Key: ApprovalLevel.Nobody, Value: 'approvalLevel.Nobody' },
            { Key: ApprovalLevel.Manager, Value: 'approvalLevel.Manager' },
            { Key: ApprovalLevel.Building, Value: 'approvalLevel.Building' },
            { Key: ApprovalLevel.Area, Value: 'approvalLevel.Area' },
            { Key: ApprovalLevel.Door, Value: 'approvalLevel.Door' },
        ];
    }

    app.filter("ApprovalLevel", ApprovalLevelFilter.Factory());
}