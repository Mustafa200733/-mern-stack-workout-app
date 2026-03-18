import { useEffect, useState } from 'react';

function UpdateWorkout({ workoutId, currentTitle, currentReps, currentLoad, refreshWorkouts }) {
  const [title, setTitle] = useState(currentTitle ?? '');
  const [reps, setReps] = useState(currentReps ?? '');
  const [load, setLoad] = useState(currentLoad ?? '');
  const [error, setError] = useState('');

  // Sync form values when the workout data changes (e.g. after refresh).
  useEffect(() => {
    setTitle(currentTitle ?? '');
    setReps(currentReps ?? '');
    setLoad(currentLoad ?? '');
  }, [currentTitle, currentReps, currentLoad]);

  const validate = () => {
    const missing = [];

    if (!String(title).trim()) missing.push('Titel');
    if (reps === '') missing.push('Reps');
    if (load === '') missing.push('Load');

    return missing.length ? `Vul in: ${missing.join(', ')}` : '';
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const validationMessage = validate();
    if (validationMessage) {
      console.warn('Validatie fout:', validationMessage);
      setError(validationMessage);
      return;
    }

    const updatedWorkout = { 
      title: String(title).trim(),
      reps: Number(reps), 
      load: Number(load) 
    };

    console.log('Updating workout:', workoutId, updatedWorkout);

    try {
      const response = await fetch(`http://127.0.0.1:4000/api/workouts/${workoutId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWorkout)
      });

      console.log('Response status:', response.status);
      const data = await response.json();

      if (response.ok) {
        console.log('Workout aangepast!', data);
        setError('');
        refreshWorkouts(); // Refresh de lijst
      } else {
        console.error('Backend error:', data.error);
        setError(`Fout: ${data.error || 'Onbekende fout'}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(`Fout bij aanpassen: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError('');
        }}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => {
          setReps(e.target.value);
          if (error) setError('');
        }}
      />
      <input
        type="number"
        placeholder="Load (kg)"
        value={load}
        onChange={(e) => {
          setLoad(e.target.value);
          if (error) setError('');
        }}
      />
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit">Aanpassen</button>
    </form>
  );
}

export default UpdateWorkout;
