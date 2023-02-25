import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/LoadingSpinner";

import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Grid,
  Typography,
  Box,
  Container,
  IconButton,
  Tab,
  Button,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import PageHero from "../../components/PageHero";
import courseImage from "../../assets/golf-courses.jpg";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

/** DASHBOARD PAGE
 *
 *  Allows admin users to edit and delte any course or tournament
 *
 * Router -> Dashboard -> { CoursesDash, TournamentsDash }
 */

const StyledBox = styled(Box)`
  display: flex;
  border: 1px solid black;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 0.5rem;
`;

const StyledTypography = styled(Typography)`
  font-family: "Itim";
  font-size: 1.1rem;
`;

export default function Dashboard() {
  const [tournaments, setTournaments] = useState(null);
  const [courses, setCourses] = useState(null);
  const [members, setMembers] = useState(null);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTournamentDelete = async (date) => {
    await CcgcApi.deleteTournament(date);
    setTournaments(tournaments.filter((t) => t.date !== date));
  };

  const handleCourseDelete = async (handle) => {
    await CcgcApi.deleteCourse(handle);
    setCourses(courses.filter((c) => c.handle !== handle));
  };

  const handleMemberDelete = async (username) => {
    await CcgcApi.deleteMember(username);
    setMembers(members.filter((m) => m.username !== username));
  };

  /* On component mount, load tournaments from API */
  useEffect(function getClubDataOnMount() {
    console.debug("Dashboard useEffect getClubDataonMount");

    async function fetchAllTournaments() {
      let tournaments = await CcgcApi.getTournaments();
      setTournaments(tournaments);
    }
    async function fetchAllCourses() {
      let courses = await CcgcApi.getCourses();
      setCourses(courses);
    }
    async function fetchAllMembers() {
      let members = await CcgcApi.getMembers();
      setMembers(members);
    }
    fetchAllCourses();
    fetchAllTournaments();
    fetchAllMembers();
  }, []);

  if (!tournaments || !courses || !members) return <LoadingSpinner />;

  console.log("MEMBERS", members);

  console.log(tournaments);

  return (
    <Box>
      <PageHero title="Dashboard" backgroundImage={courseImage} />
      <Container sx={{ pt: 2, pb: 5, textAlign: "center" }}>
        <TabContext value={value}>
          <Box>
            <TabList
              centered
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                label="Tournaments"
                value="1"
                sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
              />
              <Tab
                label="Courses"
                value="2"
                sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
              />
              <Tab
                label="Members"
                value="3"
                sx={{ fontFamily: "Cubano", fontSize: "1.25rem" }}
              />
            </TabList>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: { xs: "100%", lg: "60%" } }}>
              <TabPanel value="1" sx={{ px: 0 }}>
                <Button
                  component={Link}
                  to="/tournaments/create"
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  <AddCircleOutlineIcon sx={{ mr: 1 }} /> Tournament{" "}
                </Button>
                {tournaments.map((t) => (
                  <StyledBox key={t.date}>
                    <Grid
                      container
                      spacing={2}
                      sx={{ textAlign: "start", alignItems: "center" }}
                    >
                      <Grid item sx={{ flexGrow: 2 }}>
                        <StyledTypography>
                          {new Date(t.date).toLocaleDateString("en-Us", {
                            month: "numeric",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </StyledTypography>
                      </Grid>
                      <Grid item sx={{ flexGrow: 2 }}>
                        <StyledTypography>
                          {t.courseName.split(" ").slice(0, 2).join(" ")}
                        </StyledTypography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          component={Link}
                          to={`/tournaments/update/${t.date}`}
                          sx={{
                            bgcolor: "primary.main",
                            "&:hover": { bgcolor: "primary.dark" },
                          }}
                        >
                          <EditIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => handleTournamentDelete(t.date)}
                          sx={{
                            bgcolor: "error.main",
                            "&:hover": { bgcolor: "error.dark" },
                          }}
                        >
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </StyledBox>
                ))}
              </TabPanel>
              <TabPanel value="2" sx={{ px: 0 }}>
                <Button
                  component={Link}
                  to="/courses/create"
                  variant="contained"
                  color="success"
                  sx={{ mb: 2 }}
                >
                  <AddCircleOutlineIcon sx={{ mr: 1 }} /> Golf Course{" "}
                </Button>
                {courses.map((c) => (
                  <StyledBox key={c.handle}>
                    <Grid container spacing={2} sx={{ alignItems: "center" }}>
                      <Grid item sx={{ flexGrow: 1, textAlign: "start" }}>
                        <StyledTypography>{c.name}</StyledTypography>
                      </Grid>

                      <Grid item>
                        <IconButton
                          component={Link}
                          to={`/courses/update/${c.handle}`}
                          sx={{
                            bgcolor: "primary.main",
                            "&:hover": { bgcolor: "primary.dark" },
                          }}
                        >
                          <EditIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => handleCourseDelete(c.handle)}
                          sx={{
                            bgcolor: "error.main",
                            "&:hover": { bgcolor: "error.dark" },
                          }}
                        >
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </StyledBox>
                ))}
              </TabPanel>
              <TabPanel value="3" sx={{ px: 0 }}>
                <Button
                  component={Link}
                  to="/members/create"
                  variant="contained"
                  color="info"
                  sx={{ mb: 2 }}
                >
                  <AddCircleOutlineIcon sx={{ mr: 1 }} /> Club Member{" "}
                </Button>
                {members.map((m) => (
                  <StyledBox key={m.username}>
                    <Grid container spacing={2} sx={{ alignItems: "center" }}>
                      <Grid item sx={{ flexGrow: 1, textAlign: "start" }}>
                        <StyledTypography>
                          {m.firstName} {m.lastName}{" "}
                        </StyledTypography>
                      </Grid>

                      <Grid item>
                        <IconButton
                          component={Link}
                          to={`/members/update/${m.username}`}
                          sx={{
                            bgcolor: "primary.main",
                            "&:hover": { bgcolor: "primary.dark" },
                          }}
                        >
                          <EditIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => handleMemberDelete(m.username)}
                          sx={{
                            bgcolor: "error.main",
                            "&:hover": { bgcolor: "error.dark" },
                          }}
                        >
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </StyledBox>
                ))}
              </TabPanel>
            </Box>
          </Box>
        </TabContext>
      </Container>
    </Box>
  );
}
