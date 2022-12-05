import React from "react";
import { Link } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// import "./CourseCard.scss";

/** Course card component.
 *
 * Show information about a golf course
 *
 * CourseCard is rendered by CourseList to show a "card" for each course.
 *
 * CourseList -> CourseCard
 */

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "30px",
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "#eeeeee",
    color: "black",
  },
}));

const StyledCardImage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "203.984px",
  borderRadius: "30px",
  objectFit: "cover",
}));

const CourseCard = ({ handle, rating, slope, name, imgUrl }) => {
  return (
    <Box>
      <Link to={`/courses/${handle}`} style={{ textDecoration: "none" }}>
        <StyledPaper elevation={8}>
          <StyledCardImage component="img" src={imgUrl} />
          <Box sx={{ py: 2 }}>
            <Typography variant="h4" align="center">
              {name}
            </Typography>
          </Box>
        </StyledPaper>
      </Link>
    </Box>
  );
};

export default CourseCard;
