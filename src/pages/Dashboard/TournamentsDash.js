import CcgcApi from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/** TournamentsDash component
 *
 * renders a data grid of all tournaments in the database
 * with buttons to edit and delete each tournament
 *
 */
export default function TournamentsDash({ tournaments }) {
  let navigate = useNavigate();

  console.log(tournaments);

  const handleDelete = async (date) => {
    await CcgcApi.deleteTournament(date);
    navigate("/dashboard");
  };

  const tourneyColumns = [
    { field: "date", headerName: "Date", width: 100, disableColumnMenu: true },
    {
      field: "courseName",
      headerName: "Course",
      width: 130,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 50,
      disableClickEventBubbling: true,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton
            component={Link}
            to={`/tournaments/${params.row.id}/update`}
          >
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

  const tourneyRows = tournaments.map((t) => {
    return {
      id: t.date,
      date: new Date(t.date).toLocaleDateString("en-Us", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }),
      courseName: t.courseName.split(" ").slice(0, 2).join(" "),
    };
  });

  return (
    <DataGrid
      rows={tourneyRows}
      columns={tourneyColumns}
      pageSize={10}
      rowsPerPageOptions={[10]}
    />
  );
}
