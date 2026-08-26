import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', icon: '◈', end: true },
  { to: '/activities', label: 'Activities', icon: '↗' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '✦' },
  { to: '/teams', label: 'Teams', icon: '◎' },
  { to: '/users', label: 'Members', icon: '♙' },
  { to: '/workouts', label: 'Workouts', icon: '▣' },
]

function Overview() {
  return (
    <div className="overview-page">
      <div className="page-heading">
        <div><p className="eyebrow">Wednesday, August 26</p><h1>Make today count.</h1><p className="lede">A quick read on the OctoFit community.</p></div>
        <NavLink className="primary-action" to="/activities">Log activity <span>+</span></NavLink>
      </div>
      <div className="overview-grid">
        <div className="feature-panel"><span className="feature-kicker">Weekly focus</span><h2>Small wins build<br />strong habits.</h2><p>Show up for yourself, then bring your team along.</p><NavLink to="/workouts" className="text-link">Find a workout <span>→</span></NavLink></div>
        <div className="stat-panel"><span className="stat-label">Community activities</span><strong>06</strong><span className="stat-note">Ready to explore</span></div>
        <div className="stat-panel warm"><span className="stat-label">Active teams</span><strong>02</strong><span className="stat-note">Competing this week</span></div>
      </div>
      <div className="section-intro"><div><p className="eyebrow">Explore</p><h2>What's moving</h2></div><NavLink to="/leaderboard" className="text-link">View leaderboard <span>→</span></NavLink></div>
      <div className="quick-links">
        <NavLink to="/activities"><span className="quick-icon mint">↗</span><span><b>Activity feed</b><small>See the latest movement</small></span><span>→</span></NavLink>
        <NavLink to="/teams"><span className="quick-icon coral">◎</span><span><b>Team energy</b><small>Find your people</small></span><span>→</span></NavLink>
        <NavLink to="/workouts"><span className="quick-icon yellow">▣</span><span><b>Workout library</b><small>Pick your next challenge</small></span><span>→</span></NavLink>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand"><img src="/octofitapp-small.png" alt="" /><span>octofit<em>tracker</em></span></NavLink>
        <p className="nav-label">Workspace</p>
        <nav className="main-nav" aria-label="Main navigation">{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end}><span className="nav-icon">{item.icon}</span>{item.label}</NavLink>)}</nav>
        <div className="sidebar-footer"><span className="pulse-dot" />API connected<div className="profile-chip"><span>AR</span><div><b>Alex Rivera</b><small>Member</small></div></div></div>
      </aside>
      <main className="content"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
    </div>
  )
}

export default App
