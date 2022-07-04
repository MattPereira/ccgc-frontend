import React, { useState, useEffect } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";

import GreenieCardList from "./GreenieCardList";

/** Show page with all greenies listed
 *
 *
 * On component mount, load greenies from API
 *
 * GreenieList component is "smart" parent component
 * that will render the GreenieCardList component.
 *
 * This is routed to path "/greenies"
 *
 * Router -> GreenieList -> GreenieCardList -> GreenieCard
 */

const GreenieList = () => {
  console.debug("GreenieList");

  const [greenies, setGreenies] = useState(null);

  /* On component mount, load greenies from API */
  useEffect(function getGreeniesOnMount() {
    console.debug("GreenieList useEffect getGreeniesOnMount");

    async function fetchAllGreenies() {
      let greenies = await CcgcApi.getGreenies();
      setGreenies(greenies);
    }
    fetchAllGreenies();
  }, []);

  if (!greenies) return <LoadingSpinner />;

  console.log(greenies);

  return (
    <div className="text-center row justify-content-center">
      <h1 className="display-3 mb-3">Greenies</h1>
      <hr
        style={{ border: "2px solid grey", width: "30%", marginBottom: "1rem" }}
      ></hr>
      <p className="lead mb-5 mt-4">
        All greenies sorted by distance from the cup.
      </p>

      <GreenieCardList greenies={greenies} />
    </div>
  );
};

export default GreenieList;
