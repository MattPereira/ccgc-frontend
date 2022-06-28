import React from "react";
import { Link } from "react-router-dom";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";

/** Edit And Delete Buttons component
 *
 * renders an edit and delete button for these compononents:
 * - RoundDetails
 * - TournamentDetails
 * - CourseDetails
 *
 * Props needed:
 *  -editPath: the path to the edit page
 *  -handleDelete: function to handle the deletion of a round,
 *    tournament, or course
 *
 *  Note: delete button is nested inside popover for extra caution
 */

const EditAndDeleteBtns = ({ editPath, handleDelete }) => {
  console.debug(
    "EditDeleteBtns",
    "editLink=",
    editPath,
    "handleDelete=",
    handleDelete
  );

  //popover stuff
  // const [popoverOpen, setPopoverOpen] = useState(false);
  // const toggle = () => setPopoverOpen(!popoverOpen);

  //grab item for deletion warning message
  const item = editPath.split("/")[1].slice(0, -1);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header className="bg-warning text-center">
        WARNING!
      </Popover.Header>
      <Popover.Body>
        <p>
          Are you sure you want to delete this {item}? This action cannot be
          undone!
        </p>
        <Button variant="danger" className="mb-5 btn-sm" onClick={handleDelete}>
          Confirm
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="row justify-content-center mb-3">
      <div className="col-auto">
        <Link to={editPath}>
          <Button variant="outline-primary" className="px-3 btn-sm">
            Edit
          </Button>
        </Link>
      </div>
      <div className="col-auto">
        <div>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button
              variant="outline-danger"
              id="Popover1"
              type="button"
              className="btn-sm"
            >
              Delete
            </Button>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

export default EditAndDeleteBtns;
