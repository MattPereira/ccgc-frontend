import React from "react";

/** Horizontal Rule component
 *
 * allows for a horizontal line to be placed on the page
 *
 * width is a % between "1%"" and "100%" to set the width of HR
 */

const HorizontalRule = ({ width }) => {
  return (
    <hr className="mb-4" style={{ border: "2px solid grey", width: width }} />
  );
};

export default HorizontalRule;
