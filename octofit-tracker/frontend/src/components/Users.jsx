import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : `${window.location.origin}/api/users/`

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems(apiEndpoint).then(setUsers).catch((requestError) => setError(requestError.message)) }, [])
  return <section className="data-page"><div className="page-heading"><div><p className="eyebrow">The community</p><h1>Members</h1><p className="lede">Meet the people making movement a habit.</p></div></div><div className="user-grid">{error && <p className="error-state">{error}</p>}{users.map((user, index) => <article className="user-card" key={user._id}><span className={`avatar avatar-${index % 4}`}>{user.displayName?.split(' ').map((part) => part[0]).join('') || '?'}</span><h2>{user.displayName}</h2><p>@{user.username}</p><span className="member-tag">Active member</span></article>)}{!error && users.length === 0 && <p className="empty-state">No members yet.</p>}</div></section>
}

export default Users