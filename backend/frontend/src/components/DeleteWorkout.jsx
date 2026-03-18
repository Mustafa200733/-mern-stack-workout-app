function DeleteWorkout({ workoutId, workoutTitle, refreshWorkouts }) {
  
  const handleDelete = async () => {
    // Bevestiging vragen
    if (!confirm(`Weet je zeker dat je "${workoutTitle}" wilt verwijderen?`)) {
      return;
    }

    try {
      console.log('Deleting workout:', workoutId);
      const response = await fetch(`http://127.0.0.1:4000/api/workouts/${workoutId}`, {
        method: 'DELETE'
      });

      console.log('Response status:', response.status);
      const data = await response.json();

      if (response.ok) {
        console.log('Workout verwijderd!', data);
        refreshWorkouts(); // Refresh de lijst
      } else {
        console.error('Backend error:', data.error);
        alert('Fout: ' + data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Fout bij verwijderen: ' + error.message);
    }
  };

  return (
    <button onClick={handleDelete}>
      Verwijderen
    </button>
  );
}

export default DeleteWorkout;