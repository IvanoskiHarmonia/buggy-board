import { useEffect, useMemo, useState } from 'react';
import { BUGS } from '../bugFlags.js';
import { createJob, deleteJob, exportJobs, getJobs, updateJob } from '../api.js';

const PAGE_SIZE = 3;

const emptyForm = {
  company: '',
  role: '',
  status: 'Applied',
  dateApplied: new Date().toISOString().slice(0, 10),
  notes: ''
};

const statuses = ['Applied', 'Interview', 'Rejected', 'Offer'];

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortDirection, setSortDirection] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, statusFilter, sortDirection]);

  async function loadJobs() {
    setIsLoading(true);
    setError('');

    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      setError(BUGS.genericErrorMessages ? 'Server error. Please try again.' : `${err.status || ''} ${err.message}`.trim());
    } finally {
      setIsLoading(false);
    }
  }

  function updateFormField(fieldName, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [fieldName]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!form.role.trim()) {
      setError('Role is required.');
      return;
    }

    if (!BUGS.allowDuplicateSubmit) {
      if (isSubmitting) return;
      setIsSubmitting(true);
    }

    try {
      if (editingId) {
        const updatedJob = await updateJob(editingId, form);
        setJobs((currentJobs) => currentJobs.map((job) => (job.id === editingId ? updatedJob : job)));
        setMessage('Job was updated.');
      } else {
        const newJob = await createJob(form);
        setJobs((currentJobs) => [newJob, ...currentJobs]);
        setMessage('Job was added.');
      }

      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      setError(BUGS.genericErrorMessages ? 'Server error. Please try again.' : `${err.status || ''} ${err.message}`.trim());
    } finally {
      if (!BUGS.allowDuplicateSubmit) {
        setIsSubmitting(false);
      }
    }
  }

  function handleEdit(job) {
    setEditingId(job.id);
    setForm({
      company: job.company,
      role: job.role,
      status: job.status,
      dateApplied: job.dateApplied,
      notes: job.notes
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(jobId) {
    setMessage('');
    setError('');

    try {
      const result = await deleteJob(jobId);
      setJobs((currentJobs) => currentJobs.filter((job) => job.id !== result.deletedJob.id));
      setMessage('Job was deleted.');
    } catch (err) {
      setError(BUGS.genericErrorMessages ? 'Server error. Please try again.' : `${err.status || ''} ${err.message}`.trim());
    }
  }

  async function handleExport() {
    setMessage('');
    setError('');
    setIsExporting(true);

    try {
      const result = await exportJobs();
      setMessage(result.message);
    } catch (err) {
      if (BUGS.exportShowsSuccessEvenWhenApiFails) {
        setMessage('Export created successfully.');
      } else {
        setError(BUGS.genericErrorMessages ? 'Server error. Please try again.' : `${err.status || ''} ${err.message}`.trim());
      }
    } finally {
      if (!BUGS.exportSpinnerNeverStops) {
        setIsExporting(false);
      }
    }
  }

  function handleHelpClick() {
    if (BUGS.helpButtonLogsConsoleError) {
      console.error('Help drawer failed to open: Cannot read properties of undefined (reading "open")');
    }
    setMessage('Help is not available yet. Check the Console tab.');
  }

  const filteredAndSortedJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      const searchSource = `${job.company} ${job.role}`;
      const fixedSearchSource = searchSource.toLowerCase();
      const fixedSearchText = searchText.toLowerCase();

      const matchesSearch = BUGS.caseSensitiveSearch
        ? searchSource.includes(searchText)
        : fixedSearchSource.includes(fixedSearchText);

      const realStatusFilter =
        statusFilter === 'Rejected' && BUGS.rejectedFilterShowsOffers ? 'Offer' : statusFilter;

      const matchesStatus = realStatusFilter === 'All' || job.status === realStatusFilter;

      return matchesSearch && matchesStatus;
    });

    const effectiveDirection = BUGS.sortIgnoresDirection ? 'oldest' : sortDirection;
    filtered.sort((a, b) =>
      effectiveDirection === 'newest'
        ? b.dateApplied.localeCompare(a.dateApplied)
        : a.dateApplied.localeCompare(b.dateApplied)
    );

    return filtered;
  }, [jobs, searchText, statusFilter, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedJobs.length / PAGE_SIZE));

  const visibleJobs = useMemo(() => {
    const effectivePage = BUGS.paginationAlwaysShowsFirstPage ? 1 : currentPage;
    const start = (effectivePage - 1) * PAGE_SIZE;
    return filteredAndSortedJobs.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedJobs, currentPage]);

  return (
    <section className="page-grid" style={BUGS.layoutBreaksOnMobile ? { minWidth: 900 } : {}}>
      <div className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Feature Area</p>
            <h2>{editingId ? 'Edit Job' : 'Add Job'}</h2>
          </div>
          {editingId && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="stacked-form">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            value={form.company}
            onChange={(event) => updateFormField('company', event.target.value)}
            placeholder="Example: Google"
          />

          <label htmlFor="role">Role</label>
          <input
            id="role"
            value={form.role}
            onChange={(event) => updateFormField('role', event.target.value)}
            placeholder="Example: Manual QA Tester"
          />

          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={form.status}
            onChange={(event) => updateFormField('status', event.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <label htmlFor="dateApplied">Date Applied</label>
          <input
            id="dateApplied"
            type="date"
            value={form.dateApplied}
            onChange={(event) => updateFormField('dateApplied', event.target.value)}
          />

          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(event) => updateFormField('notes', event.target.value)}
            rows="4"
          />

          {message && <div className="notice success">{message}</div>}
          {error && <div className="notice error">{error}</div>}

          <button
            type="submit"
            disabled={!BUGS.allowDuplicateSubmit && isSubmitting}
          >
            {editingId ? 'Save Changes' : 'Add Job'}
          </button>
        </form>
      </div>

      <div className="card wide-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Testing Area</p>
            <h2>Applications</h2>
          </div>
          <div className="button-row">
            <button
              type="button"
              className="secondary-button"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </button>
            <button type="button" className="secondary-button" onClick={handleHelpClick}>
              Help
            </button>
          </div>
        </div>

        <div className="filters">
          <input
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              if (BUGS.regressionFilterBreaks) setStatusFilter('All');
            }}
            placeholder="Search company or role"
            aria-label="Search jobs"
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by status"
          >
            <option value="All">All statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={sortDirection}
            onChange={(event) => setSortDirection(event.target.value)}
            aria-label="Sort by date"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {isLoading ? (
          <p>Loading jobs...</p>
        ) : visibleJobs.length === 0 ? (
          <p className="empty-state">No jobs match the current filters.</p>
        ) : (
          <>
            <div className="job-list">
              {visibleJobs.map((job) => (
                <article key={job.id} className="job-card">
                  <div>
                    <h3>{job.company || '(No company name)'}</h3>
                    <p>{job.role}</p>
                    <span className="status-pill">{job.status}</span>
                  </div>

                  <div>
                    <p className="muted-text">Applied: {job.dateApplied}</p>
                    <p>{job.notes || 'No notes yet.'}</p>
                  </div>

                  <div className="button-row">
                    <button type="button" className="secondary-button" onClick={() => handleEdit(job)}>
                      Edit
                    </button>
                    <button type="button" className="danger-button" onClick={() => handleDelete(job.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
