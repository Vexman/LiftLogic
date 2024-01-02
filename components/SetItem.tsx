import React from "react";
import { v4 } from "uuid";
import { roundToNearestFive } from "../utils/helpers";

const SetItem = ({ set }) => {
  const { weight, reps } = set;

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
    </div>
  );
};

export default SetItem;
