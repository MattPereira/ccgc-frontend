import React, { useEffect, useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CcgcApi from "../api/api";
import { Link } from "react-router-dom";

import { Card, Table } from "react-bootstrap";

import HorizontalRule from "../common/HorizontalRule";
import LoadingSpinner from "../common/LoadingSpinner";
import AdminButtons from "../common/AdminButtons";

/** Greenie details page.
 *
 * On component mount, load the greenie data from API
 *
 * Also offer edit and delete buttons for logged in same user or admin only.
 *
 * This is routed to path "/greenies/:id"
 *
 * Routes -> GreenieDetails -> {AdminButtons, GreenieCard}
 *
 */

const GreenieDetails = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  console.debug("GreenieDetails", "id=", id);

  const [greenie, setGreenie] = useState(null);

  /* On component mount, load course data from API */
  useEffect(
    function getGreenieOnMount() {
      console.debug("GreenieDetails useEffect getGreenieOnMount");

      async function getGreenie() {
        setGreenie(await CcgcApi.getGreenie(id));
      }
      getGreenie();
    },
    [id]
  );

  if (!greenie) return <LoadingSpinner />;
  console.log(greenie);
  console.log(currentUser);

  const handleDelete = async () => {
    await CcgcApi.deleteGreenie(id);
    navigate(`/tournaments/${greenie.tournamentDate}`);
  };

  //destructure greenie data for component display
  const {
    courseName,
    courseImg,
    tournamentDate,
    holeNumber,
    feet,
    inches,
    firstName,
    lastName,
    username,
  } = greenie;

  return (
    <div className="text-center row justify-content-center">
      <h1 className="display-3 mb-3">Greenie Details</h1>
      <div className="row justify-content-center">
        <HorizontalRule width={"25%"} />
      </div>
      <div className="col-9 col-sm-6 col-md-5 col-lg-3 my-5">
        <Card>
          <Link
            to={`/tournaments/${tournamentDate}`}
            style={{ textDecoration: "none" }}
          >
            <Card.Title tag="h5" className="bg-dark mb-0 py-2 text-white">
              {courseName.split(" ").slice(0, 2).join(" ")}
            </Card.Title>

            <div className="GreenieCard-crop">
              <img alt={`${courseName}`} src={courseImg} />
            </div>
            <div className="bg-success text-white h6 py-1">
              {new Date(tournamentDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </div>
          </Link>
          <Card.Body>
            <Card.Text className="lead">
              {firstName} {lastName}
            </Card.Text>
            <Table responsive>
              <thead>
                <tr>
                  <th>Hole</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{holeNumber}</td>
                  <td>
                    {feet}' {inches}"
                  </td>
                </tr>
              </tbody>
            </Table>
            {currentUser ? (
              currentUser.isAdmin || currentUser.username === username ? (
                <AdminButtons
                  updatePath={`/greenies/${greenie.id}/update`}
                  handleDelete={handleDelete}
                />
              ) : null
            ) : null}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default GreenieDetails;
