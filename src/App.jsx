import { useMemo, useState } from "react";
import "./App.css";

const jobs = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    category: "Technology",
    type: "Internship",
    location: "Remote / Jaipur",
    description:
      "Build scalable web applications and contribute to modern software projects.",
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    category: "Technology",
    type: "Internship",
    location: "Remote / Jaipur",
    description:
      "Work on backend services, APIs, and reliable software architecture.",
  },
  {
    id: 3,
    title: "QA Testing Intern",
    category: "Technology",
    type: "Internship",
    location: "Remote / Jaipur",
    description:
      "Help improve software quality through testing and defect reporting.",
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    category: "Technology",
    type: "Internship",
    location: "Remote / Jaipur",
    description:
      "Create intuitive user experiences and accessible interface designs.",
  },
  {
    id: 5,
    title: "Business Development Intern",
    category: "Business",
    type: "Internship",
    location: "Remote / Jaipur",
    description:
      "Support client outreach, business research, and growth initiatives.",
  },
  {
    id: 6,
    title: "Digital Marketing Intern",
    category: "Marketing",
    type: "Internship",
    location: "Remote / Jaipur",
    description:
      "Contribute to digital campaigns, SEO, and online brand growth.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || job.category === category;

      const matchesType = type === "All" || job.type === type;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, category, type]);

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-mark">C</span>
          <span>Career<span className="brand-accent">Hub</span></span>
        </a>

        <a className="nav-link" href="#openings">
          Explore jobs
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <span className="eyebrow">YOUR NEXT OPPORTUNITY</span>

          <h1>
            Find work that
            <br />
            <span>moves you forward.</span>
          </h1>

          <p>
            Explore opportunities, discover your next challenge,
            and find a role that matches your interests.
          </p>

          <a className="primary-button" href="#openings">
            Explore open roles <span aria-hidden="true">→</span>
          </a>

          <div className="hero-note">
            <span className="status-dot" />
            Explore technology, business and marketing roles
          </div>
        </section>

        <section className="jobs-section" id="openings">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CAREER OPPORTUNITIES</span>
              <h2>Find your role</h2>
              <p>Search and filter openings to find a suitable opportunity.</p>
            </div>

            <div className="result-count">
              <strong>{filteredJobs.length}</strong>
              <span> roles found</span>
            </div>
          </div>

          <div className="filters">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Search job title or description..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search jobs"
              />
            </label>

            <label className="select-field">
              <span>Department</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="All">All departments</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
              </select>
            </label>

            <label className="select-field">
              <span>Job type</span>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="All">All types</option>
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
              </select>
            </label>

            <button
              className="reset-button"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setType("All");
              }}
            >
              Reset
            </button>
          </div>

          <div className="job-grid">
            {filteredJobs.map((job) => (
              <article className="job-card" key={job.id}>
                <div className="card-top">
                  <span className="job-icon" aria-hidden="true">
                    {job.category === "Technology"
                      ? "</>"
                      : job.category === "Business"
                        ? "↗"
                        : "✳"}
                  </span> 
                  <span className="job-type">{job.type}</span>
                </div>

                <span className="job-category">{job.category}</span>
                <h3>{job.title}</h3>
                <p className="job-description">{job.description}</p>

                <div className="job-location">
                  <span aria-hidden="true">⌖</span> {job.location}
                </div>
                <button
                   className="details-button"
                   onClick={() => setSelectedJob(job)}
                >
                View details <span aria-hidden="true">→</span>
                 </button>
                
              </article>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="empty-state">
              <h3>No matching roles found</h3>
              <p>Try another keyword or change your filters.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setType("All");
                }}
              >
                Show all roles
              </button>
            </div>
          )}
        </section>
        {selectedJob && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedJob(null)}
         >
            <section
            className="job-modal"
              onClick={(event) => event.stopPropagation()}
              >
              <button
              className="modal-close"
              onClick={() => setSelectedJob(null)}
              aria-label="Close job details"
              >
                ×
              </button>
              <span className="job-category">
                {selectedJob.category}
              </span>
              <h2 id="modal-title">{selectedJob.title}</h2>
              <p className="modal-meta">
                {selectedJob.type} · {selectedJob.location}
              </p>
              <p className="modal-description">
                {selectedJob.description}
              </p>
              <p className="prototype-note">
                This is an assessment prototype. No actual application
                is submitted through this window.
              </p>
              <button
              className="primary-button"
              onClick={() => setSelectedJob(null)}
              >
                Close details
              </button>
            </section>
        </div>
)}
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-mark">C</span>
          <span>Career<span className="brand-accent">Hub</span></span>
        </a>
        <p>
          An independent careers search prototype built for a technical
          assessment.
        </p>
      </footer>
    </div>
  );
}

export default App;