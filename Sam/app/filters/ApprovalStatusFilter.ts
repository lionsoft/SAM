'use strict';
module App.Filters {

    class ApprovalStatusFilter extends EnumFilter
    {
        Source =
        [
            { Key: ApprovalStatus.WaitingForApproval, Value: 'approvalStatus.WaitingForApproval' },
            { Key: ApprovalStatus.Approved, Value: 'approvalStatus.Approved' },
            { Key: ApprovalStatus.Rejected, Value: 'approvalStatus.Rejected' },
        ];
    }

    app.filter("ApprovalStatus", ApprovalStatusFilter.Factory());
}