import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import {
  calculateWeights,
  roundToNearestFive,
  saveExercise,
  saveSet,
} from "../utils/helpers";
import { Button } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

const SetItem = ({
  set,
  currentExercise,
  setIndex,
  currentExerciseIndex,
  currentSetIndex,
  setCurrentSetIndex,
  formattedDate,
  setRoutine,
  setCurrentExerciseIndex,
  workout,
}) => {
  const { sets } = currentExercise;
  const { weight, reps } = set;
  const [currentSetWeight, setCurrentSetWeight] = useState(
    roundToNearestFive(weight)
  );
  const [currentSetReps, setCurrentSetReps] = useState(reps);
  const repsInputRef = useRef(null);
  const weightInputRef = useRef(null);
  const { data: session } = useSession() as {
    data: (Session & { token: { user } }) | null;
  };

  const handleLogSet = () => {
    let nextIndex = setIndex + 1;
    while (sets[nextIndex] && sets[nextIndex].complete) {
      nextIndex++;
    }
    setCurrentSetIndex(nextIndex);
    set.actualWeight = currentSetWeight;
    set.actualReps = currentSetReps;
    set.complete = true;

    currentExercise.sets = [
      ...sets.slice(0, setIndex),
      set,
      ...sets.slice(setIndex + 1),
    ];

    // Check if all exercises are complete for the workout
    currentExercise.complete = sets.every((s) => s.complete);
    if (currentExercise.complete) {
      currentExercise.date = formattedDate;
      currentExercise.userId = session?.token.user._id;
      saveExercise(currentExercise);
      nextIndex = currentExerciseIndex + 1;
      let nextSetIndex = 0;
      while (
        workout.exercises[nextIndex] &&
        workout.exercises[nextIndex].complete
      ) {
        nextIndex++;
      }
      workout.complete = !workout.exercises[nextIndex];
      if (!workout.complete) {
        setCurrentExerciseIndex(nextIndex);
        while (
          workout.exercises[nextIndex] &&
          workout.exercises[nextIndex].sets[nextSetIndex] &&
          workout.exercises[nextIndex].sets[nextSetIndex].complete
        ) {
          nextSetIndex++;
        }
        setCurrentSetIndex(nextSetIndex);
      }
    }
    setRoutine((prevRoutine) => ({
      ...prevRoutine,
    }));
  };
  useEffect(() => {
    if (sets[currentSetIndex] !== "" && !sets[currentExercise]) {
      setCurrentSetWeight();
    }
  }, [currentSetWeight,currentSetReps,currentSetIndex]);
  return (
    <div
      key={setIndex}
      style={{ 
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        transition: "box-shadow 2s ease",
        overflow: "visible"
      }}
      className="card border small p-3 my-2"
    >
        <div className="input-group mb-2">
          <input
            className="form-control"
            value={setName}
            onChange={(e) => {
              setSetName(e.target.value);
            }}
          />
          <Button
            type="button"
            disabled={!currentSetWeight || !currentSetReps}
            variant="success"
            onClick={handleLogSet}
          >
            Log&nbsp;Set
          </Button>
        </div>
        <div className="fw-bold">
          <div className="col mb-2">
            {calculateWeights(roundToNearestFive(set.weight))}
          </div>
          <div className="row">
          <div className="col input-group input-group-sm"> 
            <span className="input-group-text">{roundToNearestFive(weight)} lbs.</span>
            <input
              ref={weightInputRef}
              type="number"
              className="form-control form-control-sm"
              value={currentSetWeight}
              onChange={(e) => {
                const newValue = parseFloat(e.target.value);
                setCurrentSetWeight(
                  isNaN(newValue) ? "" : newValue.toString()
                );
              }}
              onFocus={() => {
                setCurrentSetIndex(setIndex);
              }}
              />
          </div>
          <div className="col input-group input-group-sm">
            <span className="input-group-text">{reps} reps</span>
            <input
              ref={repsInputRef}
              type="number"
              className="form-control form-control-sm"
              value={currentSetReps}
              onChange={(e) => {
                setCurrentSetReps(e.target.value);
              }}
              onFocus={() => {
                setCurrentSetIndex(setIndex);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetItem;
