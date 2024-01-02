import React from "react";
import { v4 } from "uuid";

const SetItem = ({ set, setIndex, setCurrentSetIndex }) => {
  const { actualReps, actualWeight } = set;

  return (
    <div
      key={v4()}
      onClick={handleClickCompletedSet}
      className="card bg-light text-success medium my-2 py-2 px-3"
    >
      <div className="d-flex row small">
        <div className="col">{actualWeight} lbs.</div>
        <div className="col medium">{set.name}&nbsp;<FaCheckCircle /></div>
        <div className="col small">{actualReps} reps</div>
      </div>
    </div>
  );
};

export default SetItem;
