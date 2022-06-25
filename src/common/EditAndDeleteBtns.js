import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

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
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => setPopoverOpen(!popoverOpen);

  //grab item for deletion warning message
  const item = editPath.split("/")[1].slice(0, -1);

  return (
    <div className="row justify-content-center mb-3">
      <div className="col-auto">
        <Link to={editPath}>
          <Button color="outline-primary" className="px-3 btn-sm">
            Edit
          </Button>
        </Link>
      </div>
      <div className="col-auto">
        <div>
          <Button
            color="outline-danger"
            id="Popover1"
            type="button"
            className="btn-sm"
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
                Are you sure you want to delete this {item}? This action cannot
                be undone!
              </p>
              <Button
                color="danger"
                className="mb-5 btn-sm"
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

export default EditAndDeleteBtns;
