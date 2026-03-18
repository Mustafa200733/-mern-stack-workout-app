import { useEffect, useState } from 'react';
import WorkoutForm from './components/WorkoutForm.jsx';
import WorkoutList from './components/WorkoutList.jsx';

function App() {
  const [workouts, setWorkouts] = useState([]);

  const refreshWorkouts = async () => {
    try {
      console.log('Fetching workouts...');
      const response = await fetch('http://127.0.0.1:4000/api/workouts');
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Workouts fetched:', data);
      setWorkouts(data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    console.log('App mounted, refreshing workouts');
    refreshWorkouts();
  }, []);

  return (
    <div className="App">
      <h1>Workouts</h1>
      <WorkoutForm refreshWorkouts={refreshWorkouts} />
      <WorkoutList workouts={workouts} refreshWorkouts={refreshWorkouts} />
    </div>
  );
}

export default App;