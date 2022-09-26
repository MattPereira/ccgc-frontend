import React, { useState, useEffect } from "react";
import MemberCard from "../../components/Members/MemberCard";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../common/Loading";
import { Row, Col, Container } from "react-bootstrap";

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
        <h1 className="display-3 mb-3">Members</h1>
        <hr
          className="mb-4"
          style={{ border: "2px solid grey", width: "15%" }}
        ></hr>
        <p className="lead mb-5">
          Select a member to view all of their rounds played with the Contra
          Costa Golf Club
        </p>
      </Row>

      {members.length ? (
        <Row className="justify-content-center">
          {members.map((m) => (
            <Col key={m.username} sm={10} md={6} lg={4} className="mb-4">
              <MemberCard
                key={m.username}
                username={m.username}
                firstName={m.firstName}
                lastName={m.lastName}
                avgPutts={m.avgPutts}
                avgStrokes={m.avgStrokes}
                avgGreenies={m.avgGreenies}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p>Sorry, no results were found!</p>
      )}
    </Container>
  );
};

export default MemberList;
