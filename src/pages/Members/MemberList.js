import React, { useState, useEffect } from "react";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import { Link } from "react-router-dom";
import { Row, Col, Container, Table } from "react-bootstrap";
import { Typography } from "@mui/material";

// import MemberCard from "../../components/Members/MemberCard";

/** Show page with all members listed
 *
 * On component mount, load members from API
 *
 * This is routed to path "/members"
 *
 * Routes -> { MemberCard }
 */

const MemberList = () => {
  console.debug("MemberList");

  const [members, setMembers] = useState(null);

  /* On component mount, load companies from API */
  useEffect(function getCompaniesOnMount() {
    console.debug("MemberList useEffect getMembersOnMount");

    async function fetchAllMembers() {
      let members = await CcgcApi.getMembers();
      setMembers(members);
    }
    fetchAllMembers();
  }, []);

  if (!members) return <LoadingSpinner />;
  console.log(members);

  return (
    <Container className="py-5">
      <Row className="text-center justify-content-center">
        <Typography variant="h1">Members</Typography>
        <hr style={{ border: "2px solid grey", width: "20%" }}></hr>
        <p className="lead py-5">
          Select a member name to view all of their rounds data.
        </p>
      </Row>

      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          {members.length ? (
            <Table
              bordered
              striped
              hover
              responsive
              variant="light"
              className="text-center"
            >
              <thead>
                <tr className="table-dark">
                  <th>NAME</th>
                  <th>RND</th>
                  <th>STR</th>
                  <th>PUT</th>
                  <th>GRN</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.username}>
                    <th>
                      <Link
                        to={`/members/${m.username}`}
                        className="text-decoration-none"
                      >
                        {m.firstName} {m.lastName[0]}
                      </Link>
                    </th>
                    <td>{m.totalRounds}</td>
                    <td>{m.avgStrokes}</td>
                    <td>{m.avgPutts}</td>

                    <td>{m.avgGreenies}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Sorry, no results were found!</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MemberList;
