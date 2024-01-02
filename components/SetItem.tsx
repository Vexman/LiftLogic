import React from "react";
import { v4 } from "uuid";
import { roundToNearestFive } from "../utils/helpers";

const SetItem = ({ set, handleDeleteSet, type }) => {
  const { weight, reps, seconds, minutes, hours } = set;

  return (
    <div key={v4()} className="card bg-light text-secondary medium my-2">
      <div className="d-flex justify-content-between small px-3 py-2 align-items-center">
        <div>{roundToNearestFive(weight)} lbs.</div> 
        <div>{set.name}</div>
        <div>{reps} reps</div>
        <div>
          <Button
            className="p-0 m-0"
            variant="light"
            onClick={() => handleDeleteSet(set.name)}
          >
            <IoMdClose />
          </Button>
        </div>
      </div>
      <div className="row">
        {type === "weight" && (
          <React.Fragment>
            <div className="col">{roundToNearestFive(weight)} lbs.</div>
            <div className="col">{reps} reps</div>
          </React.Fragment>
        )}
        {type === "timed" && (
          <React.Fragment>
            {hours > 0 && <div className="col">{hours} hours</div>}
            {minutes > 0 && <div className="col">{minutes} minutes</div>}
            {seconds > 0 && <div className="col">{seconds} seconds</div>}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default SetItem;
