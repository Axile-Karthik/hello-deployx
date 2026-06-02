import { useState, useEffect } from 'react'
import './App.css'

const BUILD_TIME = new Date().toISOString()

// Deployment info injected via Vite env (set in CI or manually)
const GIT_SHA   = import.meta.env.VITE_GIT_SHA   || 'local'
const GIT_BRANCH = import.meta.env.VITE_GIT_BRANCH || 'local'
const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'

function Counter({ label, value, color }) {
  return (
    <div className="metric-card" style={{ '--accent': color }}>
      <span className="metric-value">{value}</span>
      <span className="metric-label">{label}</span>
    </div>
  )
}

function StatusDot({ ok }) {
  return <span className={`status-dot ${ok ? 'status-dot--ok' : 'status-dot--warn'}`} />
}

export default function App() {
  const [tick, setTick] = useState(0)
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1)
      setUptime(t => t + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const deployCount = Math.floor(tick / 10) + 1

  return (
    <div className="app">
      {/* Background */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-blob bg-blob--1" aria-hidden="true" />
      <div className="bg-blob bg-blob--2" aria-hidden="true" />

      <main className="container">
        {/* Hero */}
        <header className="hero">
          <div className="hero-badge">
            <StatusDot ok={true} />
            Live &amp; Deployed
          </div>
          <h1 className="hero-title">
            Hello,{' '}
            <span className="gradient-text">DeployX</span>
            <span className="wave" aria-label="wave">👋</span>
          </h1>
          <p className="hero-sub">
            This dummy app was deployed automatically by DeployX.<br />
            Every push to <code>main</code> triggers a new deployment.
          </p>
        </header>

        {/* Metrics */}
        <section className="metrics" aria-label="Deployment metrics">
          <Counter label="Deploys" value={deployCount} color="#6378ff" />
          <Counter label="Uptime (s)" value={uptime} color="#4caf82" />
          <Counter label="Heartbeat" value={tick % 2 === 0 ? '♥' : '♡'} color="#f06292" />
        </section>

        {/* Build info */}
        <section className="info-card" aria-label="Build information">
          <h2 className="info-card__title">Build Info</h2>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-key">Version</span>
              <code className="info-val">{APP_VERSION}</code>
            </div>
            <div className="info-row">
              <span className="info-key">Branch</span>
              <code className="info-val">{GIT_BRANCH}</code>
            </div>
            <div className="info-row">
              <span className="info-key">Commit</span>
              <code className="info-val">{GIT_SHA.slice(0, 7)}</code>
            </div>
            <div className="info-row">
              <span className="info-key">Built at</span>
              <code className="info-val">{BUILD_TIME}</code>
            </div>
          </div>
        </section>

        {/* Pipeline */}
        <section className="pipeline" aria-label="DeployX pipeline steps">
          <h2 className="pipeline__title">Pipeline</h2>
          <div className="pipeline__steps">
            {['GitHub Push', 'Webhook', 'Git Pull', 'Build', 'Docker Image', 'Deploy ✓'].map((step, i) => (
              <div key={step} className="pipeline__step">
                <div className="step-dot" style={{ animationDelay: `${i * 0.15}s` }} />
                <span className="step-label">{step}</span>
                {i < 5 && <div className="step-line" />}
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          Deployed via <strong>DeployX</strong> · Self-hosted CI/CD
        </footer>
      </main>
    </div>
  )
}
