import { useNavigate } from 'react-router-dom';
import './LawyerStatus.css';

/* ── Data ── */
const TIMELINE_STEPS = [
  {
    key: 'submitted',
    label: 'Submitted',
    sub: 'Application successfully filed on May 24, 2024 at 10:45 AM.',
    state: 'done',
  },
  {
    key: 'review',
    label: 'Under Review',
    sub: 'Currently being processed by the internal compliance team.',
    state: 'active',
    note: 'Expected response by tomorrow EOD',
  },
  {
    key: 'doc-verify',
    label: 'Document Verification',
    sub: 'Automated and manual validation of digital credentials.',
    state: 'pending',
  },
  {
    key: 'bar-verify',
    label: 'Bar Council Verification',
    sub: 'External validation with official regulatory bodies.',
    state: 'pending',
  },
  {
    key: 'approval',
    label: 'Final Approval',
    sub: 'Issuance of practice certificate and platform activation.',
    state: 'pending',
    isLast: true,
  },
];

const ACTIVITY = [
  { label: 'Compliance Check Started', time: '2 hours ago',        active: true  },
  { label: 'Identity Verified',         time: 'Yesterday, 4:30 PM', active: false },
  { label: 'Document Uploaded',         time: 'May 24, 10:45 AM',   active: false },
];

/* ── Sub-components ── */
function TimelineDot({ state }) {
  if (state === 'done') {
    return (
      <div className="ls-dot ls-dot--done">
        <span className="material-symbols-outlined ls-dot__icon">check</span>
      </div>
    );
  }
  if (state === 'active') {
    return (
      <div className="ls-dot ls-dot--active">
        <div className="ls-dot__pulse" />
      </div>
    );
  }
  return <div className="ls-dot ls-dot--pending" />;
}

function TimelineStep({ step, isLast }) {
  return (
    <div className={`ls-timeline__item${isLast ? ' ls-timeline__item--last' : ''}${step.state === 'done' ? ' ls-timeline__item--done' : ''}`}>
      <TimelineDot state={step.state} />
      <div className="ls-timeline__body">
        <h3 className={`ls-timeline__label ls-timeline__label--${step.state}`}>{step.label}</h3>
        <p className="ls-timeline__sub">{step.sub}</p>
        {step.note && (
          <div className="ls-timeline__note">
            <span className="material-symbols-outlined ls-timeline__note-icon">info</span>
            <span className="ls-timeline__note-text">{step.note}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════ */
export default function LawyerStatus() {
  const navigate = useNavigate();

  return (
    <div className="ls-page">

      {/* ════ TOP NAV ════ */}
      <header className="ls-topnav">
        <div className="ls-topnav__inner">
          <div className="ls-topnav__brand" onClick={() => navigate('/')}>eSewa Legal</div>
          <nav className="ls-topnav__nav">
            {['Documents', 'Stamping', 'Consultations', 'Billing'].map(n => (
              <a key={n} href="#" className="ls-topnav__link">{n}</a>
            ))}
          </nav>
          <div className="ls-topnav__actions">
            <button className="ls-icon-btn" aria-label="Search">
              <span className="material-symbols-outlined">search</span>
            </button>
            <div className="ls-avatar">JD</div>
          </div>
        </div>
      </header>

      {/* ════ BODY ════ */}
      <main className="ls-main">
        <div className="ls-grid">

          {/* ── Left: Main content ── */}
          <div className="ls-main__col">

            {/* Status header card */}
            <div className="ls-status-card">
              <div className="ls-status-card__accent" />
              <div className="ls-status-card__body">
                <div>
                  <span className="ls-badge">
                    <span className="material-symbols-outlined ls-badge__icon" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                    Verification Pending
                  </span>
                  <h1 className="ls-status-card__title">Application Under Review</h1>
                  <p className="ls-status-card__ref">Ref ID: #LF-99283-2024</p>
                </div>
                <div className="ls-eta-box">
                  <p className="ls-eta-box__label">Estimated Completion</p>
                  <p className="ls-eta-box__value">3 – 5 Days</p>
                </div>
              </div>
            </div>

            {/* Progress tracker */}
            <div className="ls-card">
              <h2 className="ls-card__title">Progress Tracker</h2>
              <div className="ls-timeline">
                {TIMELINE_STEPS.map(step => (
                  <TimelineStep key={step.key} step={step} isLast={step.isLast} />
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="ls-info-grid">
              <div className="ls-info-card">
                <span className="material-symbols-outlined ls-info-card__icon" style={{ fontVariationSettings: "'FILL' 1" }}>help</span>
                <h4 className="ls-info-card__title">Need help with your application?</h4>
                <p className="ls-info-card__body">Our specialist team is available for live consultations if you require assistance with documentation.</p>
                <button className="ls-link-btn" id="ls-contact-support">
                  Contact Support <span className="material-symbols-outlined ls-link-btn__arrow">arrow_forward</span>
                </button>
              </div>
              <div className="ls-info-card">
                <span className="material-symbols-outlined ls-info-card__icon" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                <h4 className="ls-info-card__title">View Submitted Documents</h4>
                <p className="ls-info-card__body">You can download or view the copies of the files you have submitted for verification.</p>
                <button className="ls-link-btn" id="ls-open-repo">
                  Open Repository <span className="material-symbols-outlined ls-link-btn__arrow">open_in_new</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <aside className="ls-sidebar">

            {/* Profile summary */}
            <div className="ls-card ls-profile-card">
              <div className="ls-profile-card__head">
                <div
                  className="ls-profile-card__photo"
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCh-Hyu6wQnPnpBk2XGwGTY2wDoK9m3AHi9aiCRx586ZlqJAquIh7oyTZUTFoi2e4fej1wYIrnVj30Y-Bdnhj0ekcVebSDn-CE0KHuk16zI7kRDRrb8GQpMRnSE9HWuuTQKlLyOexVIgbLWMWknhZG_weRse-NScYTbgS1mD9SGpmjVGAJel7vvCO0VjJ7FiZJiRJXpfmHfFL5U6EkaHmDdAft3707iZuEO5hkTaU99gjqdR-MVH-AY8C5vEENYl2MnA23ZrUeuV34')` }}
                />
                <div>
                  <h3 className="ls-profile-card__name">Jonathan Doe</h3>
                  <p className="ls-profile-card__role">Senior Associate</p>
                </div>
              </div>
              <div className="ls-profile-card__fields">
                {[
                  { label: 'Practitioner ID', value: 'BC-2024-881' },
                  { label: 'Membership',       value: 'Premium Enterprise' },
                  { label: 'Application Date', value: 'May 24, 2024' },
                ].map((f, i, arr) => (
                  <div key={f.label} className={`ls-profile-field${i < arr.length - 1 ? ' ls-profile-field--sep' : ''}`}>
                    <span className="ls-profile-field__label">{f.label}</span>
                    <span className="ls-profile-field__value">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="ls-card">
              <h3 className="ls-activity__heading">Recent Activity</h3>
              <div className="ls-activity">
                {ACTIVITY.map(a => (
                  <div key={a.label} className="ls-activity__item">
                    <div className={`ls-activity__dot${a.active ? ' ls-activity__dot--active' : ''}`} />
                    <div>
                      <p className="ls-activity__label">{a.label}</p>
                      <p className="ls-activity__time">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="ls-audit-btn" id="ls-audit-log">View Audit Log</button>
            </div>

            {/* Mobile promo card */}
            <div className="ls-promo-card">
              <div className="ls-promo-card__watermark">
                <span className="material-symbols-outlined">smartphone</span>
              </div>
              <div className="ls-promo-card__body">
                <h4 className="ls-promo-card__title">Mobile Dashboard</h4>
                <p className="ls-promo-card__sub">Track your application status on the go with the eSewa Legal mobile app.</p>
                <div className="ls-promo-card__stores">
                  <button className="ls-store-btn" id="ls-app-store">App Store</button>
                  <button className="ls-store-btn" id="ls-play-store">Play Store</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ════ FOOTER ════ */}
      <footer className="ls-footer">
        <div className="ls-footer__inner">
          <div className="ls-footer__brand">eSewa Legal AI</div>
          <div className="ls-footer__links">
            {['Privacy Policy', 'Terms of Service', 'Security', 'Contact'].map(l => (
              <a key={l} href="#" className="ls-footer__link">{l}</a>
            ))}
          </div>
          <p className="ls-footer__copy">© {new Date().getFullYear()} eSewa Legal AI Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
