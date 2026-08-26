import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${window.location.origin}/api/leaderboard/`

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems(apiEndpoint).then(setLeaders).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-page"><div className="page-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p className="lede">Consistency has a way of adding up.</p></div><span className="season-pill">This week</span></div><div className="leaderboard-list">{error && <p className="error-state">{error}</p>}{leaders.map((leader, index) => <article className={`leader-row rank-${index + 1}`} key={leader.user?._id || leader._id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span className="avatar">{leader.user?.displayName?.split(' ').map((part) => part[0]).join('') || '?'}</span><div className="row-main"><b>{leader.user?.displayName || 'OctoFit member'}</b><span>@{leader.user?.username || 'member'} · {leader.activities} activities</span></div><div className="points"><strong>{leader.points}</strong><span>pts</span></div></article>)}{!error && leaders.length === 0 && <p className="empty-state">No leaderboard entries yet.</p>}</div></section>
}

export default Leaderboard