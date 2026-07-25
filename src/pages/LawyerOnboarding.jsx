import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LawyerOnboarding.css';
import logoSrc from '../assets/logo.jpg';

/* ─── Steps config ─── */
const STEPS = [
  { key: 'personal',    label: 'Personal Details', icon: 'person',       title: 'Welcome to the Network',       sub: 'To begin your registration with eSewa Legal Services, please provide your current professional contact information. This data will be used for preliminary verification.' },
  { key: 'credentials', label: 'Credentials',      icon: 'badge',        title: 'Professional Credentials',     sub: 'Provide your official enrollment details to verify your legal standing. This information will be cross-referenced with Bar Council records.' },
  { key: 'identity',    label: 'Identity',          icon: 'fingerprint',  title: 'Identity Verification',        sub: 'Upload a government-issued ID to confirm your identity. This step ensures only verified legal professionals join the eSewa network.' },
  { key: 'documents',   label: 'Documents',         icon: 'description',  title: 'Supporting Documents',         sub: 'Upload your degree certificates, practice certificates, and any additional supporting documents required for full verification.' },
  { key: 'finish',      label: 'Finish',            icon: 'check_circle', title: 'Submission Complete',          sub: 'Your profile has been submitted for review. You will receive a confirmation email within 2–4 business days once verified.' },
];

const PRACTICE_AREAS = [
  { id: 'corporate',  label: 'Corporate',       icon: 'business_center' },
  { id: 'criminal',   label: 'Criminal',         icon: 'gavel'           },
  { id: 'ip',         label: 'IP Law',           icon: 'lightbulb'       },
  { id: 'civil',      label: 'Civil Litigation', icon: 'balance'         },
  { id: 'family',     label: 'Family Law',       icon: 'family_restroom' },
  { id: 'tax',        label: 'Tax Law',          icon: 'receipt_long'    },
  { id: 'property',   label: 'Property',         icon: 'home_work'       },
  { id: 'labour',     label: 'Labour Law',       icon: 'groups'          },
  { id: 'cyber',      label: 'Cyber Law',        icon: 'security'        },
];

const STATE_COUNCILS = [
  'Bar Council of Delhi',
  'Bar Council of Maharashtra & Goa',
  'Bar Council of Karnataka',
  'Bar Council of Tamil Nadu',
  'Bar Council of Uttar Pradesh',
  'Bar Council of Gujarat',
  'Bar Council of Rajasthan',
  'Bar Council of West Bengal',
  'Bar Council of Kerala',
  'Bar Council of Andhra Pradesh',
  'Bar Council of Telangana',
  'Bar Council of Punjab & Haryana',
];

/* ══════════════════════════════════
   STEP 1 — Personal Details
   ══════════════════════════════════ */
function StepPersonal({ onNext }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => { setForm(p => ({ ...p, [k]: e.target.value })); setErrors(p => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Full legal name is required.';
    if (!form.email.trim()) e.email = 'Work email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => { setSaving(false); onNext(); }, 1200);
  };

  return (
    <form className="ob-form" onSubmit={handleSubmit} noValidate>
      <div className="ob-grid-2">
        <div className={`ob-field${errors.name ? ' ob-field--err' : ''}`}>
          <label className="ob-label" htmlFor="ob-name">Full Legal Name</label>
          <input id="ob-name" type="text" className="ob-input" placeholder="Johnathan Doe, Esq." value={form.name} onChange={set('name')} />
          {errors.name && <p className="ob-err">{errors.name}</p>}
        </div>
        <div className={`ob-field${errors.email ? ' ob-field--err' : ''}`}>
          <label className="ob-label" htmlFor="ob-email">Work Email Address</label>
          <input id="ob-email" type="email" className="ob-input" placeholder="j.doe@firm.com" value={form.email} onChange={set('email')} />
          {errors.email && <p className="ob-err">{errors.email}</p>}
        </div>
      </div>
      <div className={`ob-field${errors.phone ? ' ob-field--err' : ''}`}>
        <label className="ob-label" htmlFor="ob-phone">Professional Phone Number</label>
        <div className="ob-input-wrap">
          <span className="material-symbols-outlined ob-input-icon">call</span>
          <input id="ob-phone" type="tel" className="ob-input ob-input--icon" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
        </div>
        {errors.phone && <p className="ob-err">{errors.phone}</p>}
      </div>
      <div className="ob-field">
        <label className="ob-label" htmlFor="ob-address">Office Address</label>
        <div className="ob-input-wrap">
          <span className="material-symbols-outlined ob-input-icon ob-input-icon--top">location_on</span>
          <textarea id="ob-address" rows={3} className="ob-input ob-textarea ob-input--icon" placeholder={'123 Legal Plaza, Suite 500\nNew Delhi, 110001'} value={form.address} onChange={set('address')} />
        </div>
      </div>
      <div className="ob-form__actions">
        <Link to="/login" className="ob-btn ob-btn--ghost">Cancel</Link>
        <button type="submit" className={`ob-btn ob-btn--primary${saving ? ' ob-btn--loading' : ''}`} id="ob-continue-btn" disabled={saving}>
          {saving ? <><span className="ob-spinner" /> Saving…</> : <>Continue to Credentials <span className="material-symbols-outlined">arrow_forward</span></>}
        </button>
      </div>
    </form>
  );
}

/* ══════════════════════════════════
   STEP 2 — Credentials
   ══════════════════════════════════ */
function StepCredentials({ onNext, onBack }) {
  const [form, setForm] = useState({
    enrollmentNo: '',
    stateCouncil: '',
    enrollmentDate: '',
    experience: '',
  });
  const [selectedAreas, setSelectedAreas] = useState(new Set());
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => { setForm(p => ({ ...p, [k]: e.target.value })); setErrors(p => ({ ...p, [k]: '' })); };

  const toggleArea = (id) => {
    setSelectedAreas(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const validate = () => {
    const e = {};
    if (!form.enrollmentNo.trim())  e.enrollmentNo  = 'Enrollment number is required.';
    if (!form.stateCouncil)         e.stateCouncil  = 'Please select a state council.';
    if (!form.enrollmentDate)       e.enrollmentDate = 'Date of enrollment is required.';
    if (selectedAreas.size === 0)   e.areas         = 'Select at least one practice area.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => { setSaving(false); onNext(); }, 1400);
  };

  return (
    <form className="ob-form" onSubmit={handleSubmit} noValidate>

      {/* ── Bar Council grid ── */}
      <div className="ob-grid-2">
        <div className={`ob-field${errors.enrollmentNo ? ' ob-field--err' : ''}`}>
          <label className="ob-label" htmlFor="ob-enroll">Bar Council Enrollment Number</label>
          <input
            id="ob-enroll" type="text" className="ob-input"
            placeholder="e.g. D/1234/2023"
            value={form.enrollmentNo} onChange={set('enrollmentNo')}
          />
          {errors.enrollmentNo && <p className="ob-err">{errors.enrollmentNo}</p>}
        </div>

        <div className={`ob-field${errors.stateCouncil ? ' ob-field--err' : ''}`}>
          <label className="ob-label" htmlFor="ob-council">State Bar Council</label>
          <div className="ob-select-wrap">
            <select id="ob-council" className="ob-input ob-select" value={form.stateCouncil} onChange={set('stateCouncil')}>
              <option value="">Select State Council</option>
              {STATE_COUNCILS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="material-symbols-outlined ob-select-arrow">expand_more</span>
          </div>
          {errors.stateCouncil && <p className="ob-err">{errors.stateCouncil}</p>}
        </div>

        <div className={`ob-field${errors.enrollmentDate ? ' ob-field--err' : ''}`}>
          <label className="ob-label" htmlFor="ob-date">Date of Enrollment</label>
          <input id="ob-date" type="date" className="ob-input ob-input--date" value={form.enrollmentDate} onChange={set('enrollmentDate')} />
          {errors.enrollmentDate && <p className="ob-err">{errors.enrollmentDate}</p>}
        </div>

        <div className="ob-field">
          <label className="ob-label" htmlFor="ob-exp">Years of Experience</label>
          <input id="ob-exp" type="number" min="0" max="60" className="ob-input" placeholder="Number of years" value={form.experience} onChange={set('experience')} />
        </div>
      </div>

      {/* ── Practice Areas ── */}
      <div className="ob-section">
        <div className="ob-section__header">
          <div>
            <h3 className="ob-section__title">Practice Areas</h3>
            <p className="ob-section__sub">Select all areas you currently practice in.</p>
          </div>
          <span className="ob-multi-badge">
            {selectedAreas.size > 0 ? `${selectedAreas.size} selected` : 'Multi-select enabled'}
          </span>
        </div>

        <div className={`ob-chip-grid${errors.areas ? ' ob-chip-grid--err' : ''}`}>
          {PRACTICE_AREAS.map(area => {
            const active = selectedAreas.has(area.id);
            return (
              <button
                key={area.id}
                type="button"
                className={`ob-chip${active ? ' ob-chip--active' : ''}`}
                onClick={() => { toggleArea(area.id); setErrors(p => ({ ...p, areas: '' })); }}
                id={`chip-${area.id}`}
              >
                <span
                  className="material-symbols-outlined ob-chip__icon"
                  style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {area.icon}
                </span>
                <span className="ob-chip__label">{area.label}</span>
                {active && (
                  <span className="material-symbols-outlined ob-chip__check">check</span>
                )}
              </button>
            );
          })}
        </div>
        {errors.areas && <p className="ob-err" style={{ marginTop: '6px' }}>{errors.areas}</p>}
      </div>

      {/* ── Bento info section ── */}
      <div className="ob-bento">
        {/* Identity Protection card */}
        <div className="ob-bento__main">
          <div className="ob-bento__icon-wrap">
            <span className="material-symbols-outlined">security</span>
          </div>
          <div className="ob-bento__content">
            <h4 className="ob-bento__title">Identity Protection</h4>
            <p className="ob-bento__body">
              eSewa uses encrypted verification pipelines to ensure your credentials are authenticated directly with Bar Councils without third-party exposure.
            </p>
          </div>
          <a href="#" className="ob-bento__link">
            View our Data Security Policy
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

        {/* Trusted Pro badge card */}
        <div className="ob-bento__badge">
          <span
            className="material-symbols-outlined ob-bento__badge-icon"
            style={{ fontVariationSettings: "'wght' 200" }}
          >
            verified_user
          </span>
          <h4 className="ob-bento__badge-title">Trusted Pro</h4>
          <p className="ob-bento__badge-sub">Verification usually takes 2–4 business days.</p>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="ob-form__actions ob-form__actions--spread">
        <button type="button" className="ob-btn ob-btn--outline" onClick={onBack} id="ob-prev-credentials">
          <span className="material-symbols-outlined">arrow_back</span>
          Previous Step
        </button>
        <div className="ob-actions-right">
          <button type="button" className="ob-btn ob-btn--ghost" onClick={onNext} id="ob-skip-credentials">
            Skip for now
          </button>
          <button type="submit" className={`ob-btn ob-btn--primary${saving ? ' ob-btn--loading' : ''}`} id="ob-next-credentials" disabled={saving}>
            {saving
              ? <><span className="ob-spinner" /> Saving…</>
              : <>Continue to Step 3 <span className="material-symbols-outlined">arrow_forward</span></>
            }
          </button>
        </div>
      </div>
    </form>
  );
}

/* ══════════════════════════════════
   STEP 3 — Identity Verification
   ══════════════════════════════════ */
const DOC_TYPES = [
  { value: 'aadhaar',   label: 'Aadhaar Card (India)'       },
  { value: 'passport',  label: 'Passport (International)'   },
  { value: 'driving',   label: "Driver's License"           },
  { value: 'pan',       label: 'PAN Card'                   },
];
const SECURITY_BADGES = [
  { icon: 'lock',          title: 'End-to-End Encryption',  sub: 'Your documents are encrypted using AES-256 protocols.'        },
  { icon: 'gpp_maybe',     title: 'GDPR Compliant',         sub: 'Data is purged immediately after verification success.'        },
  { icon: 'verified_user', title: 'ISO 27001 Certified',    sub: 'Our infrastructure meets the highest security standards.'     },
];

function StepIdentity({ onNext, onBack }) {
  const [docType,    setDocType]    = useState('aadhaar');
  const [files,      setFiles]      = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [captured,   setCaptured]   = useState(false);
  const [verifying,  setVerifying]  = useState(false);
  const fileInputRef = useRef(null);

  const addFiles = (incoming) => {
    const arr = Array.from(incoming).map(f => ({
      name: f.name, id: Math.random().toString(36).slice(2),
    }));
    setFiles(prev => [...prev, ...arr].slice(0, 2));
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); onNext(); }, 2000);
  };

  return (
    <div className="ob-identity">

      {/* ── Main bento grid ── */}
      <div className="ob-id-grid">

        {/* Government ID Upload */}
        <div className="ob-id-card ob-id-card--main">
          <div className="ob-id-card__header">
            <div className="ob-id-card__icon-wrap">
              <span className="material-symbols-outlined">badge</span>
            </div>
            <div>
              <h3 className="ob-id-card__title">Government ID</h3>
              <p className="ob-id-card__sub">Upload Passport, Aadhaar, or Driver&apos;s License</p>
            </div>
          </div>

          {/* Doc type */}
          <div className="ob-field" style={{ marginBottom: 'var(--sp-4)' }}>
            <label className="ob-label" htmlFor="ob-doctype">Document Type</label>
            <div className="ob-select-wrap">
              <select id="ob-doctype" className="ob-input ob-select" value={docType} onChange={e => setDocType(e.target.value)}>
                {DOC_TYPES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
              <span className="material-symbols-outlined ob-select-arrow">expand_more</span>
            </div>
          </div>

          {/* Upload zone */}
          <div
            className={`ob-upload-zone${isDragOver ? ' ob-upload-zone--drag' : ''}`}
            onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={e => { e.preventDefault(); setIsDragOver(false); addFiles(e.dataTransfer.files); }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf"
              multiple className="ob-upload-zone__input"
              onChange={e => addFiles(e.target.files)}
            />
            <div className="ob-upload-zone__icon-wrap">
              <span className="material-symbols-outlined ob-upload-zone__icon" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span>
            </div>
            <p className="ob-upload-zone__title">Drop file or click to upload</p>
            <p className="ob-upload-zone__hint">Support: JPG, PNG, PDF (Max 5MB)<br />Front &amp; Back required for Aadhaar</p>
          </div>

          {/* File list */}
          <div className="ob-file-list">
            {files.length > 0
              ? files.map(f => (
                <div key={f.id} className="ob-file-item">
                  <span className="material-symbols-outlined ob-file-item__icon">image</span>
                  <span className="ob-file-item__name">{f.name}</span>
                  <button type="button" className="ob-file-item__del" onClick={() => setFiles(p => p.filter(x => x.id !== f.id))} aria-label="Remove">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              ))
              : (['aadhaar_front.jpg', 'aadhaar_back.jpg']).map(name => (
                <div key={name} className="ob-file-item ob-file-item--sample">
                  <span className="material-symbols-outlined ob-file-item__icon">image</span>
                  <span className="ob-file-item__name">{name}</span>
                  <button type="button" className="ob-file-item__del" disabled aria-label="Remove">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              ))
            }
          </div>
        </div>

        {/* Biometric / Liveness Check */}
        <div className="ob-id-card ob-id-card--bio">
          <div className="ob-id-card__header">
            <div className="ob-id-card__icon-wrap">
              <span className="material-symbols-outlined">photo_camera</span>
            </div>
            <div>
              <h3 className="ob-id-card__title">Liveness Check</h3>
              <p className="ob-id-card__sub">Secure biometric capture</p>
            </div>
          </div>

          <div className={`ob-camera${captured ? ' ob-camera--done' : ''}`}>
            <div className="ob-camera__vignette" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS5irpv4yQRRVF5ra1xl3ViQBhlSkHZehaF2pdPl_OGIGgoidcrwKhGFfZzIZZIQNLCtVnlFr1krHrzalsZiWp4dgvoxB2PllJwJOomxqAt-IqSyLyDCbAsnTj98o4H2-nc_7tLUeNUFuUnv3xHxtGqhB5vO4_Zr2w07RfEExgtdu1oZwDrX8SkXCx0QNDbQhwdMm4NXLXibM7M-hSfhI-uNhLxVnuo4Thi_Y9jBz1-f43A6PJ-qEBMRFJavLcVxvxUEzFihpAJsM"
              alt="Biometric scan" className="ob-camera__img"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div className="ob-camera__ui">
              <div className="ob-camera__topbar">
                <span className="ob-camera__live">Live Feed</span>
                <span className="material-symbols-outlined ob-camera__settings-icon">settings</span>
              </div>
              <div className="ob-camera__ring">
                <div className={`ob-camera__pulse${captured ? ' ob-camera__pulse--done' : ''}`} />
              </div>
              <button
                type="button"
                className={`ob-camera__shutter${captured ? ' ob-camera__shutter--done' : ''}`}
                onClick={() => setCaptured(true)}
                id="ob-capture-btn"
              >
                <span className="material-symbols-outlined" style={captured ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {captured ? 'check_circle' : 'camera'}
                </span>
              </button>
            </div>
          </div>
          <p className={`ob-camera__hint${captured ? ' ob-camera__hint--ok' : ''}`}>
            {captured
              ? <><span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>check_circle</span> Biometric captured successfully</>
              : 'Position your face inside the circle and click the button to capture.'}
          </p>
        </div>

        {/* Security badges */}
        <div className="ob-security-row">
          {SECURITY_BADGES.map(b => (
            <div key={b.icon} className="ob-security-badge">
              <span className="material-symbols-outlined ob-security-badge__icon" style={{ fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
              <div>
                <p className="ob-security-badge__title">{b.title}</p>
                <p className="ob-security-badge__sub">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="ob-form__actions ob-form__actions--spread ob-identity__footer">
        <button type="button" className="ob-btn ob-btn--outline" onClick={onBack} id="ob-prev-identity">
          <span className="material-symbols-outlined">arrow_back</span> Previous Step
        </button>
        <div className="ob-actions-right">
          <button type="button" className="ob-btn ob-btn--ghost" onClick={onNext} id="ob-skip-identity">Skip for now</button>
          <button
            type="button"
            className={`ob-btn ob-btn--primary${verifying ? ' ob-btn--loading' : ''}`}
            id="ob-verify-btn" onClick={handleVerify} disabled={verifying}
          >
            {verifying
              ? <><span className="ob-spinner" /> Verifying&hellip;</>
              : <><span className="material-symbols-outlined">verified_user</span> Complete Verification</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   STEP 4 — Document Verification
   ══════════════════════════════════ */
const DOC_ZONES = [
  {
    id: 'bar-cert',
    icon: 'cloud_upload',
    title: 'Bar Enrollment Certificate',
    sub: 'Click to browse or drag and drop your official certificate here',
    tags: ['PDF Recommended', 'High Res'],
    checklistKey: 'bar',
  },
  {
    id: 'advocate-id',
    icon: 'upload_file',
    title: 'Advocate ID Card',
    sub: 'Upload both sides of your official Bar Council ID card',
    tags: ['JPEG / PNG', 'Clear Scan'],
    checklistKey: 'advocate',
  },
];

function UploadZone({ zone, uploaded, onUpload }) {
  const [isDrag, setIsDrag] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    if (files.length > 0) onUpload(zone.id, files[0].name);
  };

  if (uploaded) {
    return (
      <div className="ob-doc-zone ob-doc-zone--done">
        <div className="ob-doc-zone__done-icon">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>task</span>
        </div>
        <h3 className="ob-doc-zone__title">{uploaded}</h3>
        <p className="ob-doc-zone__done-label">File uploaded successfully</p>
        <button className="ob-doc-zone__remove" onClick={() => onUpload(zone.id, null)}>Remove &amp; Replace</button>
      </div>
    );
  }

  return (
    <div
      className={`ob-doc-zone${isDrag ? ' ob-doc-zone--drag' : ''}`}
      onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
      onDragLeave={() => setIsDrag(false)}
      onDrop={e => { e.preventDefault(); setIsDrag(false); handleFiles(e.dataTransfer.files); }}
      onClick={() => inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="ob-doc-zone__input"
        onChange={e => handleFiles(e.target.files)} />
      <div className="ob-doc-zone__icon-wrap">
        <span className="material-symbols-outlined ob-doc-zone__icon" style={{ fontVariationSettings: "'FILL' 1" }}>{zone.icon}</span>
      </div>
      <h3 className="ob-doc-zone__title">{zone.title}</h3>
      <p className="ob-doc-zone__sub">{zone.sub}</p>
      <div className="ob-doc-zone__tags">
        {zone.tags.map(t => <span key={t} className="ob-doc-tag">{t}</span>)}
      </div>
    </div>
  );
}

function StepDocuments({ onNext, onBack }) {
  const [uploads, setUploads]     = useState({ 'bar-cert': null, 'advocate-id': null });
  const [submitting, setSubmitting] = useState(false);

  const handleUpload = (id, name) => setUploads(p => ({ ...p, [id]: name }));

  const allDone = Object.values(uploads).every(Boolean);

  const handleContinue = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); onNext(); }, 1500);
  };

  const CHECKLIST = [
    { key: 'bar',      label: 'Bar Certificate',    uploaded: !!uploads['bar-cert']   },
    { key: 'advocate', label: 'Advocate ID',         uploaded: !!uploads['advocate-id'] },
    { key: 'kyc',      label: 'KYC Identity',        verified: true                    },
    { key: 'profile',  label: 'Professional Profile',verified: true                    },
  ];

  return (
    <div className="ob-docs">
      <div className="ob-docs__grid">

        {/* Upload columns */}
        <div className="ob-docs__main">
          {DOC_ZONES.map(zone => (
            <UploadZone key={zone.id} zone={zone} uploaded={uploads[zone.id]} onUpload={handleUpload} />
          ))}

          {/* Navigation */}
          <div className="ob-form__actions ob-form__actions--spread ob-docs__footer">
            <button type="button" className="ob-btn ob-btn--outline" onClick={onBack} id="ob-prev-docs">
              <span className="material-symbols-outlined">arrow_back</span> Previous Step
            </button>
            <button
              type="button"
              className={`ob-btn ob-btn--primary${submitting ? ' ob-btn--loading' : ''}`}
              id="ob-continue-docs"
              onClick={handleContinue}
              disabled={submitting}
            >
              {submitting
                ? <><span className="ob-spinner" /> Submitting…</>
                : <>Review &amp; Continue <span className="material-symbols-outlined">arrow_forward</span></>
              }
            </button>
          </div>
        </div>

        {/* Status sidebar */}
        <div className="ob-docs__sidebar">

          {/* Verification Checklist */}
          <div className="ob-checklist-card">
            <h4 className="ob-checklist-card__title">Verification Checklist</h4>
            <ul className="ob-checklist">
              {CHECKLIST.map(item => (
                <li key={item.key} className={`ob-checklist__item${item.verified ? ' ob-checklist__item--verified' : ''}`}>
                  <div className="ob-checklist__left">
                    <span
                      className="material-symbols-outlined ob-checklist__icon"
                      style={item.uploaded || item.verified ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {item.uploaded || item.verified ? 'check_circle' : 'pending'}
                    </span>
                    <span className="ob-checklist__label">{item.label}</span>
                  </div>
                  <span className={`ob-checklist__status${
                    item.uploaded ? ' ob-checklist__status--uploaded'
                    : item.verified ? ' ob-checklist__status--verified'
                    : ' ob-checklist__status--pending'
                  }`}>
                    {item.uploaded ? 'Uploaded' : item.verified ? 'Verified' : 'Pending'}
                  </span>
                </li>
              ))}
            </ul>

            {/* Security notice */}
            <div className="ob-security-notice">
              <span className="material-symbols-outlined ob-security-notice__icon">info</span>
              <div>
                <p className="ob-security-notice__title">Security Notice</p>
                <p className="ob-security-notice__body">
                  Your documents are encrypted using AES-256 standards and stored in secure jurisdictional silos compliant with data residency laws.
                </p>
              </div>
            </div>
          </div>

          {/* Document Tips visual card */}
          <div className="ob-tips-card">
            <div className="ob-tips-card__overlay" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv56Pr9cd_ljw8W6oTJg1F9Hxrg4WWLky2xK-b3PDLaXUZGnPijQJeZa7Plvk74Setf9ke6Vc0ME4g2UlJbvKLoBAxL3UdD2AJ0CVg7xikLuE7O_qn8pzlEFTtmwr2cFS4ZvT88NoeiCdt9h4pgOGY99lZr6mbvTDdGJGkKfIQbwr24-oc9zYauvC_Bxr0k14xewgxjY5sHg9ygFQUDwhW0dLCP1I4NZImxNlKcAHxk86gE2R7lj2sncqerWDci0J-QEQjoxrZcdU"
              alt="Document tips" className="ob-tips-card__img"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div className="ob-tips-card__content">
              <p className="ob-tips-card__title">Document Tips</p>
              <p className="ob-tips-card__body">Ensure all four corners are visible in your scans for faster approval.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   STEP 5 — Registration Complete
   ══════════════════════════════════ */
const TIMELINE = [
  { label: 'Application Submitted',  sub: 'Submitted successfully — all steps complete', active: true,  dim: false },
  { label: 'Document Verification',  sub: 'Estimated completion: 24–48 hours',           active: false, dim: false },
  { label: 'Final Approval',          sub: 'Access will be granted via email notification', active: false, dim: true  },
];

function StepFinish({ onBack }) {
  const navigate = useNavigate();

  return (
    <div className="ob-finish">

      {/* ── Hero ── */}
      <div className="ob-finish__hero">
        <div className="ob-finish__icon-ring">
          <span className="material-symbols-outlined ob-finish__icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        </div>
        <h2 className="ob-finish__headline">Registration Received</h2>
        <p className="ob-finish__sub">
          Your application for eSewa Legal Services access is now in the final stage of our secure verification process.
        </p>
      </div>

      {/* ── Bento grid ── */}
      <div className="ob-finish__grid">

        {/* Application Timeline */}
        <div className="ob-finish-card ob-finish-card--timeline">
          <div className="ob-finish-card__head">
            <h3 className="ob-finish-card__title">Application Timeline</h3>
            <span className="ob-finish-status-badge">Status: Pending Review</span>
          </div>
          <div className="ob-timeline">
            <div className="ob-timeline__line" />
            {TIMELINE.map((item, i) => (
              <div key={i} className={`ob-timeline__item${item.dim ? ' ob-timeline__item--dim' : ''}`}>
                <div className={`ob-timeline__dot${item.active ? ' ob-timeline__dot--active' : ''}`} />
                <div className="ob-timeline__body">
                  <h4 className={`ob-timeline__label${item.active ? ' ob-timeline__label--active' : ''}`}>{item.label}</h4>
                  <p className="ob-timeline__sub">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Period card */}
        <div className="ob-finish-card ob-finish-card--period">
          <div className="ob-finish-card__period-top">
            <span className="material-symbols-outlined ob-finish-card__period-icon">schedule</span>
            <h3 className="ob-finish-card__title">Verification Period</h3>
            <p className="ob-finish-card__period-sub">
              Our compliance team reviews all credentials manually to maintain network integrity.
            </p>
          </div>
          <div className="ob-finish-card__period-count">
            <span className="ob-finish-card__period-num">2–3</span>
            <span className="ob-finish-card__period-unit">Business Days</span>
          </div>
        </div>

        {/* Next Steps — full width */}
        <div className="ob-finish-card ob-finish-card--next">
          <div className="ob-finish-card__next-left">
            <div className="ob-finish-card__mail-icon">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <h4 className="ob-finish-card__next-title">Keep an eye on your inbox</h4>
              <p className="ob-finish-card__next-sub">We&apos;ve sent a confirmation email to your registered address.</p>
            </div>
          </div>
          <div className="ob-finish-card__next-actions">
            <button className="ob-btn ob-btn--primary" id="ob-view-status-btn" onClick={() => navigate('/lawyer/status')}>
              View Application Status
            </button>
            <button className="ob-btn ob-btn--outline" id="ob-goto-login-btn" onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </div>
        </div>
      </div>

      {/* ── Illustration ── */}
      <div className="ob-finish__illustration">
        <div
          className="ob-finish__illus-bg"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeScCseaQIRKAbIj6QBo0pc6OxW0Ff4776qSiC9yjyOd7WEmUku22BdMOeJOmE9SCw5AWQndf0FR2kTSeZ0xUnakWjK4pwBRkC_YbzZbH2Kr2B8WnXpeBtQfieePR6T2vE8w9EyBIEdy4v2wWwJRfIaXzG7yFObxQlYLfzWm7nrhGKfXQpI-_jYsF21KU_e_aNNBPkKmokb2eVeULlpJV0GEF4jQ2d-O9imw4eV1P5RP5jfDzEImmm3_tTg3bjvN__ND8UYvmK94U')` }}
        />
        <div className="ob-finish__illus-gradient" />
      </div>

      {/* ── Footer ── */}
      <footer className="ob-finish__footer">
        <p className="ob-finish__footer-text">
          &copy; {new Date().getFullYear()} eSewa Legal Services. All rights reserved. Secure legal infrastructure.
        </p>
      </footer>
    </div>
  );
}

/* ══════════════════════════════════
   Fallback Placeholder
   ══════════════════════════════════ */
function StepPlaceholder({ label, icon, onNext, onBack, isLast }) {
  return (
    <div className="ob-placeholder">
      <span className="material-symbols-outlined ob-placeholder__icon">{icon}</span>
      <h3 className="ob-placeholder__title">{label}</h3>
      <p className="ob-placeholder__sub">This step is coming soon. Click continue to proceed.</p>
      <div className="ob-form__actions ob-form__actions--spread" style={{ marginTop: 'var(--sp-8)', width: '100%' }}>
        <button className="ob-btn ob-btn--outline" onClick={onBack}>
          <span className="material-symbols-outlined">arrow_back</span> Previous Step
        </button>
        {!isLast
          ? <button className="ob-btn ob-btn--primary" onClick={onNext} id={`ob-next-${label.replace(/\s/g,'').toLowerCase()}`}>
              Continue <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          : <button className="ob-btn ob-btn--gold" id="ob-finish-btn">
              <span className="material-symbols-outlined">check_circle</span> Submit &amp; Finish
            </button>
        }
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   MAIN — LawyerOnboarding
   ══════════════════════════════════ */
export default function LawyerOnboarding() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const goNext = () => setActiveStep(s => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setActiveStep(s => Math.max(s - 1, 0));

  const stepInfo = STEPS[activeStep];

  /* Sidebar info content per step */
  const INFO_CONTENT = {
    personal: {
      title: 'Why this matters?',
      body: 'Accurate contact information ensures that all legal notices, case assignments, and verification codes reach you without delay. We value your privacy and only use this data for secure professional communication within the eSewa network.',
    },
    credentials: {
      title: 'Bar Council Verification',
      body: 'Your enrollment number will be verified directly with the Bar Council of India database. Ensure the details match your physical enrollment certificate exactly to avoid delays.',
    },
    identity: {
      title: 'Secure Identity Check',
      body: 'We use AES-256 encrypted storage for all identity documents. Your uploaded documents are auto-deleted after verification is complete and never shared with third parties.',
    },
    documents: {
      title: 'Document Guidelines',
      body: 'Upload clear, high-resolution scans. Accepted formats: PDF, JPG, PNG. Each file must be under 5 MB. Blurry or expired documents will require resubmission.',
    },
    finish: {
      title: 'What happens next?',
      body: "Our compliance team reviews all submissions within 2\u20134 business days. You'll receive email updates at each stage. Your profile will be activated upon successful verification.",
    },
  };
  const info = INFO_CONTENT[stepInfo.key];

  /* Step content switch */
  const renderStep = () => {
    if (activeStep === 0) return <StepPersonal onNext={goNext} />;
    if (activeStep === 1) return <StepCredentials onNext={goNext} onBack={goBack} />;
    if (activeStep === 2) return <StepIdentity onNext={goNext} onBack={goBack} />;
    if (activeStep === 3) return <StepDocuments onNext={goNext} onBack={goBack} />;
    if (activeStep === 4) return <StepFinish onBack={goBack} />;
    return (
      <StepPlaceholder
        label={stepInfo.label}
        icon={stepInfo.icon}
        onNext={goNext}
        onBack={goBack}
        isLast={activeStep === STEPS.length - 1}
      />
    );
  };

  return (
    <div className="ob-shell">

      {/* ════ TOP NAV ════ */}
      <header className="ob-topnav">
        <Link to="/" className="ob-topnav__logo">
          <img src={logoSrc} alt="eSewa Legal Services" className="ob-topnav__logo-img" />
        </Link>
        <div className="ob-topnav__actions">
          <button className="ob-icon-btn" aria-label="Help">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="ob-icon-btn ob-icon-btn--notif" aria-label="Notifications">
            <span className="material-symbols-outlined">notifications</span>
            <span className="ob-notif-dot" />
          </button>
          <div className="ob-avatar">
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </div>
      </header>

      {/* ════ BODY ROW ════ */}
      <div className="ob-body">

        {/* ── SIDEBAR ── */}
        <aside className="ob-sidebar">
          <div className="ob-sidebar__header">
            <p className="ob-sidebar__title">Lawyer Onboarding</p>
            <p className="ob-sidebar__sub">Enterprise Verification</p>
          </div>

          <nav className="ob-sidebar__nav">
            {STEPS.map((step, i) => {
              const isActive   = i === activeStep;
              const isComplete = i < activeStep;
              return (
                <button
                  key={step.key}
                  className={`ob-nav-item${isActive ? ' ob-nav-item--active' : ''}${isComplete ? ' ob-nav-item--done' : ''}`}
                  onClick={() => i <= activeStep && setActiveStep(i)}
                  id={`nav-step-${step.key}`}
                >
                  <span
                    className="material-symbols-outlined ob-nav-item__icon"
                    style={isActive || isComplete ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {isComplete ? 'check_circle' : step.icon}
                  </span>
                  <span className="ob-nav-item__label">{step.label}</span>
                  {isComplete && <span className="ob-nav-item__check material-symbols-outlined">done</span>}
                </button>
              );
            })}
          </nav>

          <div className="ob-sidebar__footer">
            <a href="#" className="ob-nav-item ob-nav-item--util">
              <span className="material-symbols-outlined">contact_support</span>
              <span>Support</span>
            </a>
            <a href="#" className="ob-nav-item ob-nav-item--util">
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </a>
            <button className="ob-save-draft-btn" id="ob-save-draft">Save Draft</button>
          </div>
        </aside>

        {/* ── MAIN CANVAS ── */}
        <main className="ob-main">
          <div className="ob-main__inner">

            {/* Page header — dynamic per step */}
            <div className="ob-page-header">
              <div className="ob-step-badge">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
                STEP {activeStep + 1} OF {STEPS.length}
              </div>
              <h1 className="ob-page-title">{stepInfo.title}</h1>
              <p className="ob-page-sub">{stepInfo.sub}</p>
            </div>

            {/* Content grid — 2-col for steps 0-1, full-width for step 2+ */}
            {activeStep <= 1 ? (
              <div className="ob-content-grid">
                <div className="ob-form-card">{renderStep()}</div>
                <div className="ob-info-col">
                  <div className="ob-info-card">
                    <h3 className="ob-info-card__title">{info.title}</h3>
                    <p className="ob-info-card__body">{info.body}</p>
                  </div>
                  <div className="ob-visual-card">
                    <div className="ob-visual-card__overlay" />
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEYSvI_nKZ6UPaYXyDEqxcGbaIPzN7IZh94v_rLGkOJ60QBxzC5y5EN6zQK7f4yx7O9iYuf9vpZJ8b9gGwYBPGwpG4YMS5GI0FaLwHr1-y3GhA1dnVgIpXMUzTLNhGKYsYBQsx2kBodgD_sGOmhXG1PyB6bzjVfV56r3QQaKF8ENA0s90TJvcyO_qwNgIdMjutUdqeWliQpDelPLAAy4p8uU3rh8LoVT_6KicvisiSHONm8bqWUP4ZEVmDZ2FfO5KCUEMwWrt74P0"
                      alt="Global legal network" className="ob-visual-card__img"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div className="ob-visual-card__label">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified_user</span>
                      Secure Verification
                    </div>
                  </div>
                  <div className="ob-progress-card">
                    <p className="ob-progress-card__label">Registration Progress</p>
                    <div className="ob-progress-bar">
                      <div className="ob-progress-bar__fill" style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }} />
                    </div>
                    <p className="ob-progress-card__pct">{Math.round((activeStep / (STEPS.length - 1)) * 100)}% Complete</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Full-width card for Identity / Documents / Finish */
              <div className="ob-form-card ob-form-card--wide">
                {renderStep()}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ════ MOBILE BOTTOM NAV ════ */}
      <nav className="ob-mobile-nav" aria-label="Steps">
        {STEPS.slice(0, 4).map((step, i) => (
          <button
            key={step.key}
            className={`ob-mobile-nav__item${i === activeStep ? ' ob-mobile-nav__item--active' : ''}`}
            onClick={() => i <= activeStep && setActiveStep(i)}
          >
            <span className="material-symbols-outlined" style={i === activeStep ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {step.icon}
            </span>
            <span>{step.label.split(' ')[0]}</span>
          </button>
        ))}
      </nav>

    </div>
  );
}
