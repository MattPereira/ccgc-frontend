import React from "react";
import HolesRow from "../Common/HolesRow/HolesRow";
import { Link } from "react-router-dom";

// import { Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

/** Member round table component
 *
 *
 * Table that displays the holes numbers, strokes, putts, and pars
 * for each member round
 *
 * Used by both MemberDetails and RoundDetails components
 *
 * Routes -> MemberDetails -> RoundTable
 * Routes -> RoundDetails -> RoundTable
 *
 */

const RoundTable = ({
  roundId,
  courseName,
  tournamentDate,
  strokes,
  putts,
  totalStrokes,
  totalPutts,
  pars,
}) => {
  strokes = Object.values(strokes);
  putts = Object.values(putts);
  pars = Object.values(pars);

  // FOR MOBILE SCREEN SIZE DISPLAY
  //making an array like [{holeNumber: 1, strokes: 4, putts: 2, par: 3}, {holeNumber: 2, strokes: 4, putts: 2, par: 3}, ...]
  const mobileRows = [];

  for (let i = 0; i < 18; i++) {
    mobileRows.push({
      holeNumber: i + 1,
      strokes: strokes[i],
      putts: putts[i],
      par: pars[i],
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ display: { xs: "none", lg: "table" } }}>
        <TableHead sx={{ backgroundColor: "rgb(33,37,41)" }}>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                color: "white",
                borderRight: "1px solid rgb(224, 224, 224)",
              }}
            >
              Hole
            </TableCell>
            {[...Array(18)].map((_, i) => (
              <TableCell
                align="center"
                sx={{
                  color: "white",
                  borderRight: "1px solid rgb(224, 224, 224)",
                }}
                key={uuidv4()}
              >
                {i + 1}
              </TableCell>
            ))}
            <TableCell align="center" sx={{ color: "white" }}>
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ backgroundColor: "lightgray" }}>
            <TableCell
              align="center"
              sx={{ borderRight: "1px solid rgb(224,224,224)" }}
            >
              Par
            </TableCell>
            {Object.values(pars).map((p) => (
              <TableCell
                key={uuidv4()}
                align="center"
                sx={{ borderRight: "1px solid rgb(224,224,224)" }}
              >
                {p}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell
              align="center"
              sx={{ borderRight: "1px solid rgb(224,224,224)" }}
            >
              Strokes
            </TableCell>
            {Object.values(strokes).map((s) => (
              <TableCell
                key={uuidv4()}
                align="center"
                sx={{ borderRight: "1px solid rgb(224,224,224)" }}
              >
                {s}
              </TableCell>
            ))}
            <TableCell align="center">{totalStrokes}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="center"
              sx={{ borderRight: "1px solid rgb(224,224,224)" }}
            >
              Putts
            </TableCell>
            {Object.values(putts).map((p) => (
              <TableCell
                key={uuidv4()}
                align="center"
                sx={{ borderRight: "1px solid rgb(224,224,224)" }}
              >
                {p}
              </TableCell>
            ))}
            <TableCell align="center">{totalPutts}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table size="small" sx={{ display: { xs: "table", lg: "none" } }}>
        <TableHead sx={{ backgroundColor: "rgb(33,37,41)" }}>
          <TableRow>
            <TableCell
              align="center"
              sx={{
                color: "white",
                py: 1,
                borderRight: "1px solid rgb(224, 224, 224)",
              }}
            >
              Hole
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "white",
                borderRight: "1px solid rgb(224, 224, 224)",
              }}
            >
              Par
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "white",
                borderRight: "1px solid rgb(224, 224, 224)",
              }}
            >
              Strokes
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "white",
                borderRight: "1px solid rgb(224, 224, 224)",
              }}
            >
              Putts
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mobileRows.map((hole) => (
            <TableRow key={hole.holeNumber}>
              <TableCell
                variant="head"
                align="center"
                width="20%"
                sx={{
                  backgroundColor: "rgb(33,37,41)",
                  color: "white",
                  borderRight: "1px solid rgb(224, 224, 224)",
                }}
              >
                {hole.holeNumber}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "lightgray",
                  borderRight: "1px solid rgb(224, 224, 224)",
                }}
                width="20%"
              >
                {hole.par}
              </TableCell>

              <TableCell
                align="center"
                width="30%"
                sx={{ borderRight: "1px solid rgb(224, 224, 224)" }}
              >
                {hole.strokes}
              </TableCell>
              <TableCell align="center" width="30%">
                {hole.putts}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoundTable;
