import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : `${window.location.origin}/api/teams/`

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems(apiEndpoint).then(setTeams).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-page"><div className="page-heading"><div><p className="eyebrow">Find your crew</p><h1>Teams</h1><p className="lede">Better together, one activity at a time.</p></div><button className="primary-action" type="button">Create team <span>+</span></button></div><div className="team-grid">{error && <p className="error-state">{error}</p>}{teams.map((team, index) => <article className={`team-card team-${index % 3}`} key={team._id}><div className="team-card-top"><span className="team-symbol">{index === 0 ? '✦' : '◎'}</span><span className="member-count">{team.members?.length || 0} members</span></div><h2>{team.name}</h2><p>{team.description || 'A team that keeps showing up.'}</p><div className="member-stack">{team.members?.slice(0, 4).map((member) => <span key={member._id}>{member.displayName?.slice(0, 1) || '?'}</span>)}</div></article>)}{!error && teams.length === 0 && <p className="empty-state">No teams yet.</p>}</div></section>
}

export default Teams