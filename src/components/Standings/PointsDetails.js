import { Table } from "react-bootstrap";
import { useState } from "react";
import { Typography, Tab, Box } from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function PointsDetails() {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Points
      </Typography>

      <TabContext value={value}>
        <Box>
          <TabList
            centered
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab
              label="Position"
              value="1"
              sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
            />
            <Tab
              label="Greenies"
              value="2"
              sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
            />
            <Tab
              label="Scores"
              value="3"
              sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
            />
          </TabList>
        </Box>
        <TabPanel sx={{ px: 0 }} value="1">
          <Table
            responsive
            bordered
            variant="light"
            striped
            className="text-center"
          >
            <thead>
              <tr className="table-dark">
                <th>POSITION</th>
                <th>1ST</th>
                <th>2ND</th>
                <th>3RD</th>
                <th>4TH</th>
                <th>5TH</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>STROKES</th>
                <td>25</td>
                <td>20</td>
                <td>15</td>
                <td>10</td>
                <td>5</td>
              </tr>
              <tr>
                <th>PUTTS</th>
                <td>6</td>
                <td>4</td>
                <td>2</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </Table>
        </TabPanel>
        <TabPanel sx={{ px: 0 }} value="2">
          <Table bordered variant="light" striped className="text-center">
            <thead>
              <tr className="table-dark">
                <th>ON</th>
                <th>INSIDE 20'</th>
                <th>INSIDE 10'</th>
                <th>INSIDE 2'</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
              </tr>
            </tbody>
          </Table>
        </TabPanel>
        <TabPanel sx={{ px: 0 }} value="3">
          <Table bordered variant="light" striped className="text-center">
            <thead>
              <tr className="table-dark">
                <th>PAR</th>
                <th>BIRDIE</th>
                <th>EAGLE</th>
                <th>ACE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>4</td>
                <td>10</td>
              </tr>
            </tbody>
          </Table>
        </TabPanel>
      </TabContext>
    </>
  );
}
