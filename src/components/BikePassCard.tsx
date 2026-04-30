import { useEffect, useState } from 'react'

type CardState = 'activation' | 'runtime'

interface BikePassCardProps {
  state: CardState
}

export function BikePassCard({ state }: BikePassCardProps) {
  const [visible, setVisible] = useState(false)
  const [shimmerGone, setShimmerGone] = useState(false)

  useEffect(() => {
    setVisible(false)
    setShimmerGone(false)
    const enter = setTimeout(() => setVisible(true), 80)
    const shimmer = setTimeout(() => setShimmerGone(true), 900)
    return () => {
      clearTimeout(enter)
      clearTimeout(shimmer)
    }
  }, [state])

  const isRuntime = state === 'runtime'

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
        transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '360px',
        position: 'relative',
        boxShadow: '0 1px 2px rgba(41,54,60,0.06), 0 4px 16px rgba(41,54,60,0.08), 0 16px 40px rgba(41,54,60,0.07)',
      }}
    >
      {/* Dark image band */}
      <div
        style={{
          background: 'linear-gradient(160deg, #1a2428 0%, #29363C 100%)',
          height: '156px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Activation shimmer — fades away after first render */}
        {!isRuntime && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: shimmerGone ? 0 : 0.22,
              transition: 'opacity 1.4s ease',
              background: 'radial-gradient(ellipse at 65% 40%, #9DDE4C 0%, transparent 65%)',
            }}
          />
        )}

        {/* Bike silhouette */}
        <svg
          viewBox="0 0 220 90"
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '220px',
            opacity: 0.5,
          }}
          fill="none"
          aria-hidden="true"
        >
          <circle cx="52" cy="58" r="26" stroke="#9DDE4C" strokeWidth="2.5" />
          <circle cx="168" cy="58" r="26" stroke="#9DDE4C" strokeWidth="2.5" />
          <path d="M52 58 L88 22 L132 22 L168 58" stroke="#9DDE4C" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M88 22 L52 58" stroke="#9DDE4C" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M132 22 L122 58 L168 58" stroke="#9DDE4C" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M132 22 L142 13 L152 17" stroke="#9DDE4C" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M88 22 L94 15 L106 15" stroke="#9DDE4C" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

        {/* Header row */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '16px',
            right: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
            }}
          >
            Bike Pass
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11px',
              color: '#9DDE4C',
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#9DDE4C',
                display: 'inline-block',
              }}
            />
            {isRuntime ? 'Aktiv' : 'Gerade aktiviert'}
          </span>
        </div>
      </div>

      {/* Light body */}
      <div style={{ padding: '18px 20px 20px' }}>
        {/* Bike name */}
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              margin: 0,
              fontSize: '17px',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#11171A',
              letterSpacing: '-0.01em',
            }}
          >
            Trek FX+ 2 Stagger
          </h2>
          <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#93A8B2' }}>
            Unlimited-Paket · TechCraft
          </p>
        </div>

        {/* Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <Metric
            label="Gefahren"
            value={isRuntime ? '387 km' : '0 km'}
            sub="gefahren"
          />
          <Metric
            label="Laufzeit"
            value={isRuntime ? '3 / 36' : '0 / 36'}
            sub="Monate"
          />
          <Metric label="Rate" value="67,20 €" sub="/Monat" />
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: '#F2F4F5',
            marginBottom: '16px',
          }}
        />

        {/* Bottom slot — fixed height */}
        <div style={{ minHeight: '56px', display: 'flex', alignItems: 'center' }}>
          {isRuntime ? <ServiceReminder /> : <LeaseStart />}
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p
        style={{
          margin: '0 0 4px',
          fontSize: '10px',
          color: '#93A8B2',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: 600,
          color: '#11171A',
          lineHeight: 1.2,
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#93A8B2' }}>
          {sub}
        </p>
      )}
    </div>
  )
}

function ServiceReminder() {
  return (
    <div
      style={{
        backgroundColor: 'rgba(157, 222, 76, 0.1)',
        border: '1px solid rgba(157, 222, 76, 0.3)',
        borderRadius: '10px',
        padding: '11px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
      }}
    >
      <span style={{ fontSize: '15px', flexShrink: 0 }} aria-hidden="true">🔧</span>
      <div>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#267B00' }}>
          Service fällig
        </p>
        <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#485E68' }}>
          Nächster Termin: 30. Juli 2026
        </p>
      </div>
    </div>
  )
}

function LeaseStart() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: '#F2F4F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '14px' }} aria-hidden="true">📅</span>
      </div>
      <div>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: 500, color: '#29363C' }}>
          Leasingstart: 30. April 2026
        </p>
        <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#93A8B2' }}>
          Leasingende: 30. April 2029
        </p>
      </div>
    </div>
  )
}
