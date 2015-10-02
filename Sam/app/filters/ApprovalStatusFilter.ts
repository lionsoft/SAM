'use strict';
module App.Filters {

    class ApprovalStatusFilter extends EnumFilter
    {
        Source =
        [
            { Key: ApprovalStatus.WaitingForApproval, Value: 'WaitingForApproval' },
            { Key: ApprovalStatus.Approved, Value: 'Approved' },
            { Key: ApprovalStatus.Rejected, Value: 'Rejected' },
        ];
    }

    app.filter("ApprovalStatus", ApprovalStatusFilter.Factory());
}