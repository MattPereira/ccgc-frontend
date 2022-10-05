import React, { useState, useEffect } from "react";
import MemberCard from "../../components/Members/MemberCard";
import CcgcApi from "../../api/api";
import LoadingSpinner from "../../components/Common/Loading";
import { Link } from "react-router-dom";
import { Row, Col, Container, Table } from "react-bootstrap";
import { ThemeProvider } from "@mui/system";

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
        <h1 className="display-1 mb-3">Members</h1>
        <hr
          className=""
          style={{ border: "2px solid grey", width: "20%" }}
        ></hr>
        <p className="lead py-5">
          Select a member to view all of their rounds played with the Contra
          Costa Golf Club
        </p>
      </Row>

      {members.length ? (
        <Table bordered striped hover responsive className="text-center">
          <thead>
            <tr className="table-dark">
              <th>NAME</th>
              <th>STROKES</th>
              <th>PUTTS</th>
              <th>GREENIES</th>
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
                    {m.firstName} {m.lastName}
                  </Link>
                </th>
                <td>{m.avgPutts}</td>
                <td>{m.avgStrokes}</td>
                <td>{m.avgGreenies}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        // <Row className="justify-content-center">
        //   {members.map((m) => (
        //     <Col key={m.username} sm={10} md={6} lg={4} className="mb-4">
        //       <MemberCard
        //         key={m.username}
        //         username={m.username}
        //         firstName={m.firstName}
        //         lastName={m.lastName}
        //         avgPutts={m.avgPutts}
        //         avgStrokes={m.avgStrokes}
        //         avgGreenies={m.avgGreenies}
        //       />
        //     </Col>
        //   ))}
        // </Row>
        <p>Sorry, no results were found!</p>
      )}
    </Container>
  );
};

export default MemberList;
