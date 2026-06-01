import { useState } from 'react';
import { login } from '../api.js';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('halle@example.com');
  const [password, setPassword] = useState('1');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login({ email, password });
      onLogin(result.user);
    } catch (err) {
      setError(`${err.status || ''} ${err.message}`.trim());
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="eyebrow">Manual QA Training</p>
        <h1>BuggyBoard</h1>
        <p>
          Use this fake login to practice form validation, Network requests, and Console checks.
        </p>

        <form onSubmit={handleSubmit} className="stacked-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="halle@example.com"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
          />
          <small className="muted-text">Expected rule: password should be at least 8 characters.</small>

          {error && <div className="notice error">{error}</div>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </section>
    </main>
  );
}
