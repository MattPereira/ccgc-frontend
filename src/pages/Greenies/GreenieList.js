import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/Common/Loading";
import CcgcApi from "../../api/api";

import GreenieCardList from "../../components/Greenies/GreenieCardList";

import { Container, Row } from "react-bootstrap";

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
    <Container className="py-5">
      <Row className="text-center justify-content-center">
        <h1 className="display-1 mb-3">Greenies</h1>
        <hr
          style={{
            border: "2px solid grey",
            width: "15%",
          }}
        ></hr>
        <p className="lead py-5">
          All greenies sorted by distance from the cup.
        </p>

        <GreenieCardList greenies={greenies} />
      </Row>
    </Container>
  );
};

export default GreenieList;
