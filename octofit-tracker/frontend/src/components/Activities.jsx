import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : `${window.location.origin}/api/activities/`

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems(apiEndpoint).then(setActivities).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-page"><div className="page-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1><p className="lede">Every session is a step forward.</p></div><button className="primary-action" type="button">Log activity <span>+</span></button></div><div className="data-list">{error && <p className="error-state">{error}</p>}{!error && activities.length === 0 && <p className="empty-state">No activities yet.</p>}{activities.map((activity) => <article className="activity-row" key={activity._id}><span className={`activity-mark ${activity.type}`}>{activity.type?.slice(0, 1).toUpperCase()}</span><div className="row-main"><b>{activity.type}</b><span>{activity.user?.displayName || 'OctoFit member'} · {activity.notes || 'Completed session'}</span></div><div className="row-stat"><strong>{activity.points}</strong><span>points</span></div><div className="row-stat"><strong>{activity.durationMinutes}</strong><span>minutes</span></div></article>)}</div></section>
}

export default Activities