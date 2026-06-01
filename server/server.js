import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { BUGS } from './bugFlags.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');
const seedPath = path.join(__dirname, 'db.seed.json');

const app = express();
const PORT = 3001;

app.use(express.json());

async function readDb() {
  const rawData = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(rawData);
}

async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'BuggyBoard API' });
});

app.post('/api/login', async (req, res) => {
  await wait(250);

  const { email, password } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Email must include @.' });
  }

  if (!BUGS.loginAcceptsVeryShortPassword && (!password || password.length < 8)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required.' });
  }

  res.json({
    token: 'fake-token-for-practice',
    user: {
      email,
      role: 'QA Learner'
    }
  });
});

app.get('/api/jobs', async (req, res) => {
  await wait(250);
  const db = await readDb();
  res.json(db.jobs);
});

app.post('/api/jobs', async (req, res) => {
  await wait(350);

  const { company, role, status, dateApplied, notes } = req.body;

  if (!BUGS.allowBlankCompany && isBlank(company)) {
    return res.status(400).json({ message: 'Company is required.' });
  }

  if (isBlank(role)) {
    return res.status(400).json({ message: 'Role is required.' });
  }

  const db = await readDb();
  const newJob = {
    id: randomUUID(),
    company: company ?? '',
    role,
    status: status || 'Applied',
    dateApplied: dateApplied || new Date().toISOString().slice(0, 10),
    notes: notes || ''
  };

  db.jobs.unshift(newJob);
  await writeDb(db);

  res.status(201).json(newJob);
});

app.put('/api/jobs/:id', async (req, res) => {
  await wait(350);

  const db = await readDb();
  const jobIndex = db.jobs.findIndex((job) => job.id === req.params.id);

  if (jobIndex === -1) {
    return res.status(404).json({ message: 'Job was not found.' });
  }

  const updatedJob = {
    ...db.jobs[jobIndex],
    ...req.body,
    id: db.jobs[jobIndex].id
  };

  db.jobs[jobIndex] = updatedJob;
  await writeDb(db);

  res.json(updatedJob);
});

app.delete('/api/jobs/:id', async (req, res) => {
  await wait(350);

  const db = await readDb();
  const requestedId = req.params.id;
  const requestedIndex = db.jobs.findIndex((job) => job.id === requestedId);

  if (requestedIndex === -1) {
    return res.status(404).json({ message: 'Job was not found.' });
  }

  const indexToDelete = BUGS.deleteWrongJob ? 0 : requestedIndex;
  const deletedJob = db.jobs.splice(indexToDelete, 1)[0];
  await writeDb(db);

  res.json({
    message: 'Job deleted.',
    requestedId,
    deletedJob
  });
});

app.get('/api/profile', async (req, res) => {
  await wait(250);
  const db = await readDb();
  res.json(db.profile);
});

app.put('/api/profile', async (req, res) => {
  await wait(350);

  const db = await readDb();
  const { fullName, email, city, goal } = req.body;

  db.profile = {
    ...db.profile,
    fullName: BUGS.profileIgnoresWrongPayloadField ? fullName || db.profile.fullName : fullName || req.body.full_name || db.profile.fullName,
    email: email || db.profile.email,
    city: city || db.profile.city,
    goal: goal || db.profile.goal
  };

  await writeDb(db);
  res.json(db.profile);
});

app.get('/api/reports', async (req, res) => {
  await wait(250);

  const db = await readDb();
  const countByStatus = db.jobs.reduce((counts, job) => {
    counts[job.status] = (counts[job.status] || 0) + 1;
    return counts;
  }, {});

  res.json({
    total: db.jobs.length,
    applied: countByStatus.Applied || 0,
    interview: countByStatus.Interview || 0,
    rejected: BUGS.rejectedReportUsesOfferCount ? countByStatus.Offer || 0 : countByStatus.Rejected || 0,
    offer: countByStatus.Offer || 0
  });
});

app.get('/api/export', async (req, res) => {
  await wait(350);

  if (BUGS.exportAlwaysFails) {
    return res.status(500).json({ message: 'CSV export service crashed.' });
  }

  res.json({ message: 'Export created.', fileName: 'jobs.csv' });
});

app.post('/api/reset', async (req, res) => {
  const seedData = await fs.readFile(seedPath, 'utf-8');
  await fs.writeFile(dbPath, seedData);
  res.json({ message: 'Demo data reset.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected server error.' });
});

app.listen(PORT, () => {
  console.log(`BuggyBoard API is running on http://localhost:${PORT}`);
});
