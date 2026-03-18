import { useState } from 'react';

function UpdateWorkout({ workoutId, currentTitle, currentReps, currentLoad, refreshWorkouts }) {
  const [title, setTitle] = useState(currentTitle);
  const [reps, setReps] = useState(currentReps);
  const [load, setLoad] = useState(currentLoad);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !reps || !load) {
      console.warn('Validatie fout: vul alle velden in');
      alert('Vul alle velden in!');
      return;
    }

    const updatedWorkout = { 
      title, 
      reps: Number(reps), 
      load: Number(load) 
    };

    console.log('Updating workout:', workoutId, updatedWorkout);

    try {
      const response = await fetch(`http://127.0.0.1:4000/api/workouts/${workoutId}`, {
        method: 'PATCH',
        headers: {
       
        },
        body: JSON.stringify(updatedWorkout)
      });

      console.log('Response status:', response.status);
      const data = await response.json();

      if (response.ok) {
        console.log('Workout aangepast!', data);
        refreshWorkouts(); // Refresh de lijst
      } else {
        console.error('Backend error:', data.error);
        alert('Fout: ' + data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Fout bij aanpassen: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Load (kg)"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <button type="submit">Aanpassen</button>
    </form>
  );
}

export default UpdateWorkout;