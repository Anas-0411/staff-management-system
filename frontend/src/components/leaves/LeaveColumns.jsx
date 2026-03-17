import LeaveButtons from "./LeaveButtons";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.staffId,
    sortable: true,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "200px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "150px"
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "150px"
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "100px"
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "100px"
  },
  {
    name: "Action",
    cell: (row) => (
      <LeaveButtons
        LeaveId={row._id}
      />
    ),
  },
]