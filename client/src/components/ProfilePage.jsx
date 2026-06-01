import { useEffect, useState } from 'react';
import { BUGS } from '../bugFlags.js';
import { getProfile, updateProfile } from '../api.js';

const emptyProfile = {
  fullName: '',
  email: '',
  city: '',
  goal: ''
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      setError('');

      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError(`${err.status || ''} ${err.message}`.trim());
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  function updateField(fieldName, value) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [fieldName]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    const payload = BUGS.profileSendsWrongFieldName
      ? {
          full_name: profile.fullName,
          email: profile.email,
          city: profile.city,
          goal: profile.goal
        }
      : profile;

    try {
      const savedProfile = await updateProfile(payload);
      setProfile(savedProfile);
      setMessage('Profile was saved.');
    } catch (err) {
      setError(`${err.status || ''} ${err.message}`.trim());
    }
  }

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  return (
    <section className="card narrow-card">
      <p className="eyebrow">Practice Form</p>
      <h2>Profile</h2>
      <p className="muted-text">
        This page is useful for testing whether the request payload matches what the backend expects.
      </p>

      <form onSubmit={handleSubmit} className="stacked-form">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          value={profile.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
        />

        <label htmlFor="profileEmail">Email</label>
        <input
          id="profileEmail"
          value={profile.email}
          onChange={(event) => updateField('email', event.target.value)}
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          value={profile.city}
          onChange={(event) => updateField('city', event.target.value)}
        />

        <label htmlFor="goal">Goal</label>
        <textarea
          id="goal"
          value={profile.goal}
          onChange={(event) => updateField('goal', event.target.value)}
          rows="4"
        />

        {message && <div className="notice success">{message}</div>}
        {error && <div className="notice error">{error}</div>}

        <button type="submit">Save Profile</button>
      </form>
    </section>
  );
}
