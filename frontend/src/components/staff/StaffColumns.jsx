import StaffButtons from "./StaffButtons";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "200px",
  },
  {
    name: "Profile",
    selector: (row) => row.profileImage,
    width: "100px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "100px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    width: "150px",
  },
  {
    name: "Action",
    cell: (row) => (
      <StaffButtons
        StaffId={row._id}
      />
    ),
  },
];
