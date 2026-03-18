import { useState } from 'react';

function WorkoutForm({ refreshWorkouts }) {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    const missing = [];

    if (!title.trim()) missing.push('Titel');
    if (reps === '') missing.push('Reps');
    if (load === '') missing.push('Load');

    return missing.length ? `Vul in: ${missing.join(', ')}` : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = validate();
    if (validationMessage) {
      console.warn('Validatie fout:', validationMessage);
      setError(validationMessage);
      return;
    }

    setError('');

    const workout = { 
      title: title.trim(),
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
        setError(`Fout: ${data.error || 'Onbekende fout'}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(`Fout bij toevoegen: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Toevoegen</button>
    </form>
  );
}

export default WorkoutForm;
