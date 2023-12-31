import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

import WorkoutDetails from "../components/WorkoutDetails"
import NewWorkout from "../components/NewWorkout"

const WorkoutHome = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()
  
    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_WORKOUTS', payload: json})
        }
      }
      if (user) {
        fetchWorkouts()
      }

    }, [dispatch, user])
    return (
      <div>
              <h1>Workouts</h1>
        <div className="workouts">
          {workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout}/>
          ))}
        </div>
        <NewWorkout/>
    </div>
  )
}

export default WorkoutHome