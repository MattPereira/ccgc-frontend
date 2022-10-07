import CcgcApi from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/** CoursesDash component
 *
 * renders a data grid of all courses in the database
 * with buttons to edit and delete each course
 *
 */

export default function CoursesDash({ courses }) {
  let navigate = useNavigate();

  console.log(courses);

  const handleDelete = async (handle) => {
    await CcgcApi.deleteCourse(handle);
    navigate("/dashboard");
  };

  // The data that fills the data grid component
  const coursesColumns = [
    { field: "name", headerName: "Name", width: 230, disableColumnMenu: true },
    {
      field: "edit",
      headerName: "Edit",
      width: 50,
      disableClickEventBubbling: true,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton component={Link} to={`/courses/${params.row.id}/edit`}>
            <EditIcon color="warning"></EditIcon>
          </IconButton>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 75,
      disableClickEventBubbling: true,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        );
      },
    },
  ];

  const coursesRows = courses.map((c) => {
    return {
      id: c.handle,
      name: c.name,
    };
  });

  return (
    <div style={{ height: "650px", width: "380px", margin: "auto" }}>
      <DataGrid
        rows={coursesRows}
        columns={coursesColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}
