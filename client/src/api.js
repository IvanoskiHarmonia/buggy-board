async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed.');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function login(credentials) {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
}

export function getJobs() {
  return request('/api/jobs');
}

export function createJob(job) {
  return request('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(job)
  });
}

export function updateJob(id, job) {
  return request(`/api/jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(job)
  });
}

export function deleteJob(id) {
  return request(`/api/jobs/${id}`, {
    method: 'DELETE'
  });
}

export function getProfile() {
  return request('/api/profile');
}

export function updateProfile(profile) {
  return request('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(profile)
  });
}

export function getReports() {
  return request('/api/reports');
}

export function exportJobs() {
  return request('/api/export');
}

export function resetDemoData() {
  return request('/api/reset', {
    method: 'POST'
  });
}
