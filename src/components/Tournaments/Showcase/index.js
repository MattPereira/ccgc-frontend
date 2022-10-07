import { Typography } from "@mui/material";

import "./index.scss";

/** Showcase component for top of tournament details page
 *
 * Handles header of tournament details with a
 * background image of the course, the name of course,
 * and the date of the tournament.
 *
 * Also provides admin buttons for editing and deleting
 *
 */

const Showcase = ({ date, course, imgSrc }) => {
  console.log(course);
  return (
    <section
      style={{ background: `url(${imgSrc}) center / cover no-repeat` }}
      className="d-flex justify-content-center align-items-center showcase"
    >
      <div className="showcase-overlay"></div>
      <div className="showcase-header text-center">
        <Typography
          variant="h1"
          sx={{ color: "white", marginBottom: "0.5rem" }}
        >
          {course.split(" ").slice(0, 2).join(" ")}
        </Typography>

        {date ? (
          <Typography variant="h4" sx={{ color: "white" }}>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </Typography>
        ) : null}
      </div>
    </section>
  );
};

export default Showcase;
