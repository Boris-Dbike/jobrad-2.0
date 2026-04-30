import { useState } from 'react'
import { BikePassCard } from './components/BikePassCard'
import './App.css'

type CardState = 'activation' | 'runtime'

function App() {
  const [cardState, setCardState] = useState<CardState>('activation')

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F2F4F5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        gap: '24px',
        fontFamily: 'Geist Variable, system-ui, sans-serif',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#485E68',
        }}
      >
        {cardState === 'activation' ? 'Ep. 1 · Ch. 8 — Aktivierung' : 'Ep. 1 · Ch. 9 — 3 Monate später'}
      </p>

      <BikePassCard state={cardState} />

      <div style={{ display: 'flex', gap: '8px' }}>
        <StateButton
          label="Aktivierung"
          active={cardState === 'activation'}
          onClick={() => setCardState('activation')}
        />
        <StateButton
          label="387 km aktiv"
          active={cardState === 'runtime'}
          onClick={() => setCardState('runtime')}
        />
      </div>
    </div>
  )
}

function StateButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        borderRadius: '100px',
        border: active ? 'none' : '1px solid #B2C1C8',
        backgroundColor: active ? '#29363C' : 'transparent',
        color: active ? '#ffffff' : '#485E68',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  )
}

export default App
