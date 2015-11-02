using System;
using T4TS;

namespace Sam.DbContext
{
    [TypeScriptInterface]
    public class CardAccess : EntityObjectId
    {
        public string CardId { get; set; }
        public Card Card { get; set; }

        public string DoorId { get; set; }
        public Door Door { get; set; }


        public string OriginApproverId { get; set; }
        public Employee OriginApprover { get; set; }

        public string ApprovedById { get; set; }
        public Employee ApprovedBy { get; set; }

        public DateTime? ApprovedDate { get; set; }

        public ApprovalLevel ApprovalLevel { get; set; }

        public ApprovalStatus ApprovalStatus { get; set; }

        public string Note { get; set; }

        public AssignmentType AssignmentType { get; set; }

        public string TimeZoneId { get; set; }
        public TimeZone TimeZone { get; set; }
    }
}