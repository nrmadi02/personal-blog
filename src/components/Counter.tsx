import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      padding: '1.5rem',
      borderRadius: '0.5rem',
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0 0 1rem' }}>{count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        style={{
          padding: '0.5rem 1.5rem',
          borderRadius: '0.375rem',
          background: 'var(--color-primary)',
          color: 'var(--color-on-primary)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500',
        }}
      >
        Increment
      </button>
    </div>
  );
}
