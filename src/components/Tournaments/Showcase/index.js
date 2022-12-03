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
        {date ? (
          <Typography variant="h2" sx={{ color: "white", fontFamily: "Itim" }}>
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
