import { DepartmentButtons } from './DepartmentHelper';

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "80px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
  },
  {
    name: "Action",
    cell: (row) => (
      <DepartmentButtons
        DepId={row._id}
        onDepartmentDelete={row.onDepartmentDelete}
      />
    ),
  },
];
