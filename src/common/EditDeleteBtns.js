import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

/** Edit And Delete Buttons component
 *
 *
 * renders a edit and delete button for these compononents:
 * - RoundDetails
 * - TournamentDetails
 * - CourseDetails
 *
 */

const EditDeleteBtns = ({ editPath, handleDelete }) => {
  console.debug(
    "EditDeleteBtns",
    "editLink=",
    editPath,
    "handleDelete=",
    handleDelete
  );

  //popover stuff
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  // Edit and Delete tournament buttons for currentUser.isAdmin = true only!
  return (
    <div className="row justify-content-center mb-3">
      <div className="col-auto">
        <Link to={editPath}>
          <Button color="warning" className="px-4 rounded-pill">
            Edit
          </Button>
        </Link>
      </div>
      <div className="col-auto">
        <div>
          <Button
            id="Popover1"
            type="button"
            className="btn-danger rounded-pill"
          >
            Delete
          </Button>
          <Popover
            flip
            placement="bottom"
            target="Popover1"
            toggle={toggle}
            isOpen={popoverOpen}
          >
            <PopoverHeader className="bg-warning text-center">
              WARNING!
            </PopoverHeader>
            <PopoverBody>
              <p>
                Are you sure you want to delete this tournament? This action
                cannot be undone!
              </p>
              <Button
                color="danger"
                className="mb-5 rounded-pill"
                onClick={handleDelete}
              >
                Confirm
              </Button>
            </PopoverBody>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default EditDeleteBtns;
