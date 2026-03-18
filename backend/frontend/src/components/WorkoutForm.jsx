import { useState } from 'react';

function WorkoutForm({ refreshWorkouts }) {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !reps || !load) {
      console.warn('Validatie fout: vul alle velden in');
      alert('Vul alle velden in!');
      return;
    }

    const workout = { 
      title, 
      reps: Number(reps), 
      load: Number(load) 
    };

    console.log('Sending workout:', workout);

    try {
      const response = await fetch('http://127.0.0.1:4000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)
      });

      console.log('Response status:', response.status);
      const data = await response.json();

      if (response.ok) {
        console.log('Workout aangemaakt!', data);
        // Reset form
        setTitle('');
        setReps('');
        setLoad('');
        refreshWorkouts(); // Refresh de lijst
      } else {
        console.error('Backend error:', data.error);
        alert('Fout: ' + data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Fout bij toevoegen: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Toevoegen</button>
    </form>
  );
}

export default WorkoutForm;