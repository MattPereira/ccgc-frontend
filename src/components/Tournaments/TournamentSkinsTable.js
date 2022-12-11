import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { styled } from "@mui/material/styles";

export default function TournamentSkinsTable({ pars, handicaps, rounds }) {
  console.log("SCORES", rounds);

  const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    borderRight: "1px solid #e0e0e0",
  }));

  const StyledStickyColumnCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    position: "sticky",
    left: 0,
    borderRight: "1px solid #e0e0e0",
  }));

  const StyledHolesRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: "black",
    ".MuiTableCell-root": {
      color: "white",
      minWidth: "55px",
      fontWeight: "bold",
    },
  }));

  const StyledParsRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.grey[600],
    ".MuiTableCell-root": { color: "white", fontWeight: "bold" },
  }));

  const StyledHandicapRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: "#B59410",
    ".MuiTableCell-root": { color: "white", fontWeight: "bold" },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderRight: "1px solid #e0e0e0",
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey[100],
    },
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[200],
    },
  }));

  return (
    <Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #F4F4F4" }}
      >
        <Table size="small">
          <TableHead>
            <StyledHolesRow>
              <StyledStickyColumnCell sx={{ backgroundColor: "black" }}>
                HOLE
              </StyledStickyColumnCell>
              {Array.from({ length: 18 }, (_, i) => (
                <StyledHeaderCell align="center" key={i + 1}>
                  {i + 1}
                </StyledHeaderCell>
              ))}
            </StyledHolesRow>
            <StyledParsRow>
              <StyledStickyColumnCell sx={{ backgroundColor: "grey.600" }}>
                PAR
              </StyledStickyColumnCell>
              {Object.values(pars).map((p, i) => (
                <StyledHeaderCell align="center" key={i}>
                  {p}
                </StyledHeaderCell>
              ))}
            </StyledParsRow>
            <StyledHandicapRow>
              <StyledStickyColumnCell sx={{ backgroundColor: "#B59410" }}>
                HCP
              </StyledStickyColumnCell>
              {Object.values(handicaps).map((p, i) => (
                <StyledHeaderCell align="center" key={i}>
                  {p}
                </StyledHeaderCell>
              ))}
            </StyledHandicapRow>
          </TableHead>
          <TableBody>
            {rounds.map((round) => (
              <StyledTableRow>
                <StyledStickyColumnCell
                  sx={{
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  {round.firstName}
                </StyledStickyColumnCell>
                {Object.values(round.strokes).map((score, i) => (
                  <StyledTableCell align="center" key={i}>
                    {score}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
