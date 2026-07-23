import { useEffect, useRef } from 'react';
import './CTA.css';

const STATS = [
  { value: '5,000+', label: 'Legal Firms' },
  { value: '98%',    label: 'Client Satisfaction' },
  { value: '40+',    label: 'Countries' },
  { value: '$2.4B',  label: 'Documents Processed' },
];

export default function CTA() {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.reveal');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="cta-section" aria-labelledby="cta-heading" ref={ref}>
      {/* Stats row */}
      <div className="container">
        <div className="cta-stats reveal">
          {STATS.map(s => (
            <div key={s.label} className="cta-stats__item">
              <span className="cta-stats__value">{s.value}</span>
              <span className="text-label-sm cta-stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main CTA card */}
      <div className="container">
        <div className="cta-card reveal" style={{ '--delay': '0.1s' }}>
          {/* Background pattern */}
          <div className="cta-card__pattern" aria-hidden="true">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="cta-card__dot" />
            ))}
          </div>

          {/* Glow */}
          <div className="cta-card__glow" aria-hidden="true" />

          <div className="cta-card__content">
            <span className="gold-rule" style={{ alignSelf: 'center' }} />
            <h2 id="cta-heading" className="text-headline-lg cta-card__headline">
              Ready to Modernize Your Legal Infrastructure?
            </h2>
            <p className="text-body-lg cta-card__sub">
              Join over 5,000 legal firms and enterprise teams using LegalFlow to secure their future.
            </p>

            <div className="cta-card__actions">
              <a href="#" className="btn btn-gold btn-lg" id="cta-trial-btn">
                Start Your Free Trial
              </a>
              <a href="#" className="btn btn-ghost btn-lg" id="cta-expert-btn">
                Talk to an Expert
              </a>
            </div>

            <p className="text-label-sm cta-card__note">
              No credit card required &nbsp;·&nbsp; Enterprise plans available &nbsp;·&nbsp; Cancel anytime
            </p>

            {/* Trust logos row */}
            <div className="cta-card__trust">
              <div className="cta-trust-item">
                <span className="material-symbols-outlined">security</span>
                <span>SOC 2 Type II</span>
              </div>
              <div className="cta-trust-item">
                <span className="material-symbols-outlined">verified_user</span>
                <span>ISO 27001</span>
              </div>
              <div className="cta-trust-item">
                <span className="material-symbols-outlined">gpp_maybe</span>
                <span>GDPR Ready</span>
              </div>
              <div className="cta-trust-item">
                <span className="material-symbols-outlined">lock</span>
                <span>256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
