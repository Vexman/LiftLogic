// pages/routines.tsx
import React, { useEffect, useState } from "react";
import RoutineItem from "../components/RoutineItem";
import { initialWorkouts } from "../utils/sample-data";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";

const RoutinesPage: React.FC = () => {
  const { data: session } = useSession();
  const [routines, setRoutines] =
    useState<Array<{ id: number; name: string }>>(initialWorkouts);

  const router = useRouter();

  const handleSwipeLeft = (id) => {
    setRoutines((prevRoutines) =>
      prevRoutines.filter((routine) => routine.id !== id)
    );
  };

  const handleSignOut = () => {
    // Clear the session identifier from local storage
    localStorage.removeItem("sessionId");

    // Redirect to the home page
    router.push("/");
    signOut({ redirect: false });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-end">
        <Button
          size="sm"
          className="btn btn-light btn-sm"
          onClick={handleSignOut}
        >
          Sign out <FaSignOutAlt />
        </Button>
      </div>
      <h5 className="text-center">Workout Routines</h5>
      <div>
        {routines.map((workout) => (
          <RoutineItem
            key={workout.id}
            workout={workout}
            onSwipeLeft={() => handleSwipeLeft(workout.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoutinesPage;
