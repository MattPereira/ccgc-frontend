import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";

export default function TournamentSkinsTable({ pars, handicaps, rounds }) {
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
    backgroundColor: theme.palette.grey[900],
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
    backgroundColor: "rgb(181, 148, 16)",
    ".MuiTableCell-root": { color: "white", fontWeight: "bold" },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderRight: "1px solid #e0e0e0",
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey[100],
      ".MuiTableCell-root": { backgroundColor: theme.palette.grey[100] },
    },
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[200],
      ".MuiTableCell-root": { backgroundColor: theme.palette.grey[200] },
    },
  }));

  console.log(rounds);
  console.log(handicaps);

  const skinsData = rounds.map((round) => {
    const strokesValues = Object.values(round.strokes);

    const handicapValues = Object.values(handicaps);

    const strokes = strokesValues.map((value, idx) => {
      return { hole: idx + 1, strokes: value, handicap: handicapValues[idx] };
    });

    let adjustedHandicap = round.courseHandicap / 2;

    const adjustedStrokes = strokes.map((hole) => {
      if (adjustedHandicap > 18) adjustedHandicap = 18;

      if (hole.handicap < adjustedHandicap) {
        hole.strokes = hole.strokes - 1;
      }

      return {
        hole: hole.hole,
        strokes: hole.strokes,
        handicap: hole.handicap,
      };
    });

    console.log("STROKES", strokes);

    const playerName = round.username.split("-");
    const shortName =
      playerName[0][0].toUpperCase() + playerName[0].slice(1) + " ";
    // playerName[1][0].toUpperCase();

    return {
      name: shortName,
      courseHandicap: round.courseHandicap,
      holes: adjustedStrokes,
    };
  });

  console.log(`SKINS`, skinsData);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="p">
          Subtracting one stroke for the most difficult (player handicap / 2)
          holes
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #F4F4F4" }}
      >
        <Table size="small" sx={{ whiteSpace: "nowrap" }}>
          <TableHead>
            <StyledHolesRow>
              <StyledStickyColumnCell sx={{ backgroundColor: "grey.900" }}>
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
              <StyledStickyColumnCell
                sx={{ backgroundColor: "rgb(181, 148, 16)" }}
              >
                HANDICAP
              </StyledStickyColumnCell>
              {Object.values(handicaps).map((p, i) => (
                <StyledHeaderCell align="center" key={i}>
                  {p}
                </StyledHeaderCell>
              ))}
            </StyledHandicapRow>
          </TableHead>
          <TableBody>
            {skinsData.map((round, idx) => (
              <StyledTableRow key={idx}>
                <StyledStickyColumnCell variant="head">
                  {round.name}
                </StyledStickyColumnCell>
                {round.holes.map((hole, i) => (
                  <StyledTableCell align="center" key={i}>
                    {hole.strokes}
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
