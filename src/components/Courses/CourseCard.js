import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";

import "./CourseCard.scss";

/** Course card component.
 *
 * Show information about a golf course
 *
 * CourseCard is rendered by CourseList to show a "card" for each course.
 *
 * CourseList -> CourseCard
 */

const CourseCard = ({ handle, rating, slope, name, imgUrl }) => {
  return (
    <Box>
      <Link to={`/courses/${handle}`} style={{ textDecoration: "none" }}>
        <Paper elevation={8}>
          <div className="CourseCard-crop">
            <img alt={`${name}`} src={imgUrl} />
          </div>
          <Box
            sx={{
              py: 1.5,
              borderRadius: "0 0 4px 4px",
              backgroundColor: "rgb(33,37,41)",
            }}
          >
            <Typography variant="h4" align="center" sx={{ color: "white" }}>
              {name}
            </Typography>
          </Box>
        </Paper>
      </Link>
    </Box>
  );
};

export default CourseCard;
