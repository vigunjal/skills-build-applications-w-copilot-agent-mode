import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : `${window.location.origin}/api/workouts/`

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems(apiEndpoint).then(setWorkouts).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-page"><div className="page-heading"><div><p className="eyebrow">Curated for you</p><h1>Workouts</h1><p className="lede">A little structure for your next strong day.</p></div></div><div className="workout-grid">{error && <p className="error-state">{error}</p>}{workouts.map((workout, index) => <article className={`workout-card workout-${index % 3}`} key={workout._id}><div className="workout-top"><span>{workout.type}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="workout-bottom"><span className={`difficulty ${workout.difficulty}`}>{workout.difficulty}</span><span className="text-link">Start <span>→</span></span></div></article>)}{!error && workouts.length === 0 && <p className="empty-state">No workouts yet.</p>}</div></section>
}

export default Workouts