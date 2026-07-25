import { useEffect, useRef } from 'react';
import './Services.css';

const docImg    = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGhD3yGgW77VqVnVZ24ohCIkYtotvifdO02raZKdpVpLrUMtaBQBnGRb0JePAuslQQFZOVU42Wvk6-kTac9kJT-JoMcSVZBm-0Dobvb_aUUgK_rDtf66PTbQhY68gE9lxCGajqnYic5WCkx-s9sGx6PW2Y-wETzUmqt3L-O3TiYdsr_lToz9n-DFZ3tpHYE03j-AwOpMjtGDA7KOvMxMDcU98XWiH9YGBGHS0az7hjiPnvtLAdTsPyX0ANc8jtOYqPl8odk343RYg';
const consultImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTdUFYyarAI-MMmCs6N9jb0Ees_WyWkR8GqYnRPJMhFkE-oQooNGwLwDJ2WWLb7i23vkzAJ99XmqDK5Cdv9s9kpAjI_7ncGxTSwbn-0Bcd_7Laa7HypkRn_dJEYv3dr4fW3MIstwlYPfX1WmzevJvri3lUuqXXB3pasb1W0Cgz83VHivvkA4XvqHqfM9zE4mrwLHlAtXUIC6KSit5k02Q-MnfDnTIA7bNZlYgHi9xRftCmdG6ph1dFT9PJset1XMVPP8CkGdY52xw';

const CHECKS = [
  'Context-aware drafting',
  'Multi-jurisdictional support',
  'Clause risk analysis',
  'Version history & audit trail',
];

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal');
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="services" id="services" ref={sectionRef} aria-labelledby="services-heading">
      <div className="container">
        {/* Section header */}
        <div className="services__header reveal">
          <span className="gold-rule" />
          <h2 id="services-heading" className="text-headline-lg services__title">
            Tailored Solutions for Modern Law
          </h2>
          <p className="text-body-md services__sub">
            Precision tools built for speed, compliance, and enterprise scale.
          </p>
        </div>

        {/* Bento grid */}
        <div className="bento-grid services__grid">

          {/* ── Card 1: AI Doc Gen (large) ── */}
          <div className="bento-span-8 card services__card services__card--ai reveal">
            <div className="services__card-copy">
              <div className="services__icon-wrap services__icon-wrap--primary">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h3 className="text-headline-sm services__card-title">AI Document Generation</h3>
              <p className="text-body-sm services__card-body">
                Generate complex legal agreements, NDAs, and corporate resolutions in seconds
                using our proprietary fine-tuned legal models.
              </p>
              <ul className="services__checklist">
                {CHECKS.map(c => (
                  <li key={c}>
                    <span className="material-symbols-outlined services__check-icon">check_circle</span>
                    {c}
                  </li>
                ))}
              </ul>
              <a href="#" className="btn btn-primary btn-sm services__card-btn" id="svc-ai-btn">
                Explore AI Drafting
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </a>
            </div>
            <div className="services__card-img-wrap">
              <img
                src={docImg}
                alt="AI drafting a legal document in real time"
                className="services__card-img"
                onError={(e) => {
                  e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGhD3yGgW77VqVnVZ24ohCIkYtotvifdO02raZKdpVpLrUMtaBQBnGRb0JePAuslQQFZOVU42Wvk6-kTac9kJT-JoMcSVZBm-0Dobvb_aUUgK_rDtf66PTbQhY68gE9lxCGajqnYic5WCkx-s9sGx6PW2Y-wETzUmqt3L-O3TiYdsr_lToz9n-DFZ3tpHYE03j-AwOpMjtGDA7KOvMxMDcU98XWiH9YGBGHS0az7hjiPnvtLAdTsPyX0ANc8jtOYqPl8odk343RYg';
                }}
              />
              {/* Floating stat */}
              <div className="services__float-stat">
                <span style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-primary)' }}>3.2s</span>
                <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>Avg. draft time</span>
              </div>
            </div>
          </div>

          {/* ── Card 2: E-Stamping (small) ── */}
          <div className="bento-span-4 card services__card services__card--stamp reveal" style={{ '--delay': '0.1s' }}>
            <div className="services__icon-wrap services__icon-wrap--secondary">
              <span className="material-symbols-outlined">approval_delegation</span>
            </div>
            <h3 className="text-headline-sm services__card-title">E-Stamping</h3>
            <p className="text-body-sm services__card-body">
              Integrated government portals for instantaneous digital stamping and verification.
              Legally binding in 40+ countries.
            </p>
            <div className="services__countries">
              <span className="chip chip-gold">40+ Countries</span>
              <span className="chip chip-navy">ISO 27001</span>
            </div>
          </div>

          {/* ── Card 3: Digital Signatures (small) ── */}
          <div className="bento-span-4 card services__card services__card--sign reveal" style={{ '--delay': '0.15s' }}>
            <div className="services__icon-wrap services__icon-wrap--tertiary">
              <span className="material-symbols-outlined">draw</span>
            </div>
            <h3 className="text-headline-sm services__card-title">Digital Signatures</h3>
            <p className="text-body-sm services__card-body">
              Secure, encrypted signing workflows with a complete audit trail and biometric
              verification options.
            </p>
            <div className="services__sig-badge">
              <span className="material-symbols-outlined" style={{ color: 'var(--color-success)', fontSize: '18px' }}>verified_user</span>
              <span className="text-label-sm" style={{ color: 'var(--color-success)' }}>eIDAS Compliant</span>
            </div>
          </div>

          {/* ── Card 4: Consultations (large, dark) ── */}
          <div className="bento-span-8 card card-dark services__card services__card--consult reveal" style={{ '--delay': '0.2s' }}>
            <div className="services__card-img-wrap services__card-img-wrap--consult">
              <img
                src={consultImg}
                alt="Lawyer engaging in a high-resolution video consultation"
                className="services__card-img"
                onError={(e) => {
                  e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTdUFYyarAI-MMmCs6N9jb0Ees_WyWkR8GqYnRPJMhFkE-oQooNGwLwDJ2WWLb7i23vkzAJ99XmqDK5Cdv9s9kpAjI_7ncGxTSwbn-0Bcd_7Laa7HypkRn_dJEYv3dr4fW3MIstwlYPfX1WmzevJvri3lUuqXXB3pasb1W0Cgz83VHivvkA4XvqHqfM9zE4mrwLHlAtXUIC6KSit5k02Q-MnfDnTIA7bNZlYgHi9xRftCmdG6ph1dFT9PJset1XMVPP8CkGdY52xw';
                }}
              />
              <div className="services__consult-overlay" />
            </div>
            <div className="services__card-copy services__card-copy--dark">
              <div className="services__icon-wrap services__icon-wrap--light">
                <span className="material-symbols-outlined">gavel</span>
              </div>
              <h3 className="text-headline-sm services__card-title services__card-title--light">
                Expert Consultations
              </h3>
              <p className="text-body-sm services__card-body services__card-body--light">
                Connect with tier-1 legal experts for complex litigation and specialized counsel
                through our encrypted video platform.
              </p>
              <a href="#" className="btn btn-ghost btn-sm services__card-btn" id="svc-consult-btn">
                Meet Our Panel
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
