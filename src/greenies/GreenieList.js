import React, { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import CcgcApi from "../api/api";
import UserContext from "../auth/UserContext";
import GreenieCard from "./GreenieCard";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

/** Show page with all greenies listed
 *
 *
 * On component mount, load greenies from API
 *
 * GreenieList component is parent component
 * that will render GreenieCard components
 * that serve as links to get to the GreenieDetails component
 *
 * This is routed to path "/greenies"
 *
 * Router -> GreenieList -> GreenieCard
 */

const GreenieList = () => {
  const { currentUser } = useContext(UserContext);

  console.debug("GreenieList", "currentUser=", currentUser);

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
      <p className="lead mb-5">All greenies sorted by distance from the cup.</p>

      {greenies.map((g) => (
        <div className="col-9 col-sm-6 col-md-4 col-lg-3" key={g.id}>
          <GreenieCard
            key={g.id}
            date={g.tournamentDate}
            owner={`${g.firstName} ${g.lastName}`}
            holeNumber={g.holeNumber}
            feet={g.feet}
            inches={g.inches}
            courseName={g.courseName}
            courseImg={g.courseImg}
          />
        </div>
      ))}
    </div>
  );
};

export default GreenieList;
