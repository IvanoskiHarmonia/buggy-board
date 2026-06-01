import { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage.jsx';
import JobTracker from './components/JobTracker.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import ReportsPage from './components/ReportsPage.jsx';
import { resetDemoData } from './api.js';

const savedUser = localStorage.getItem('buggyboard_user');

export default function App() {
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  const [activePage, setActivePage] = useState('jobs');
  const [resetMessage, setResetMessage] = useState('');

  useEffect(() => {
    if (user) {
      localStorage.setItem('buggyboard_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('buggyboard_user');
    }
  }, [user]);

  function handleLogout() {
    setUser(null);
    setActivePage('jobs');
  }

  async function handleResetData() {
    await resetDemoData();
    setResetMessage('Demo data was reset. Refresh the current page if it does not update right away.');
    setTimeout(() => setResetMessage(''), 4000);
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">QA Practice App</p>
          <h1>BuggyBoard</h1>
        </div>

        <div className="topbar-actions">
          <span className="user-pill">{user.email}</span>
          <button type="button" className="secondary-button" onClick={handleResetData}>
            Reset Demo Data
          </button>
          <button type="button" className="danger-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      {resetMessage && <div className="notice success">{resetMessage}</div>}

      <nav className="tabs" aria-label="Main navigation">
        <button className={activePage === 'jobs' ? 'active' : ''} onClick={() => setActivePage('jobs')}>
          Job Tracker
        </button>
        <button className={activePage === 'profile' ? 'active' : ''} onClick={() => setActivePage('profile')}>
          Profile
        </button>
        <button className={activePage === 'reports' ? 'active' : ''} onClick={() => setActivePage('reports')}>
          Reports
        </button>
      </nav>

      <main>
        {activePage === 'jobs' && <JobTracker />}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'reports' && <ReportsPage />}
      </main>
    </div>
  );
}
