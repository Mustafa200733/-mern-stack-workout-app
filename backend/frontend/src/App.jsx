import { useEffect, useState } from 'react';
import WorkoutForm from './components/WorkoutForm';
import UpdateWorkout from './components/UpdateWorkout';
import DeleteWorkout from './components/DeleteWorkout';


function App() {
  const [workouts, setWorkouts] = useState([]);
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [workoutForm, setWorkoutForm] = useState('');
  const [updateWorkout, setUpdateForm] = useState('');
  const [deleteWorkout, setDeleteForm] = useState('');



  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/workouts');
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="App">
      <h1>Workouts</h1>
      {workouts.length === 0 ? (
        <p>Geen workouts gevonden</p>
      ) : (
        workouts.map(workout => (
          <div key={workout._id}>
            <h3>{workout.title}</h3>
            <p>Reps: {workout.reps}</p>
            <p>Load: {workout.load} kg</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;