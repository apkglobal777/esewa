import { useEffect, useRef } from 'react';
import './HowItWorks.css';

const STEPS = [
  {
    num: '01',
    title: 'Connect',
    body: 'Securely integrate your enterprise SSO and legal database in minutes.',
    icon: 'link',
    active: true,
  },
  {
    num: '02',
    title: 'Configure',
    body: 'Define workflows, compliance guardrails, and jurisdiction preferences.',
    icon: 'settings',
    active: false,
  },
  {
    num: '03',
    title: 'Automate',
    body: 'Launch AI-driven document generation, stamping, and signing flows.',
    icon: 'bolt',
    active: false,
  },
  {
    num: '04',
    title: 'Scale',
    body: 'Monitor performance, risk indicators, and compliance in real-time.',
    icon: 'analytics',
    active: false,
  },
];

export default function HowItWorks() {
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
    <section className="how" id="how-it-works" ref={ref} aria-labelledby="how-heading">
      <div className="container">
        <div className="how__header reveal">
          <span className="gold-rule" />
          <h2 id="how-heading" className="text-headline-lg">Seamless Implementation</h2>
          <p className="text-body-md how__sub">From onboarding to execution in four focused steps.</p>
        </div>

        <div className="how__grid">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`how__step reveal${step.active ? ' how__step--active' : ''}`}
              style={{ '--delay': `${i * 0.1}s` }}
            >
              {/* Connector line between steps */}
              {i < STEPS.length - 1 && (
                <div className="how__connector" aria-hidden="true" />
              )}
              <div className={`how__circle${step.active ? ' how__circle--active' : ''}`}>
                <span className="how__num">{step.num}</span>
              </div>
              <div className="how__step-icon">
                <span className="material-symbols-outlined">{step.icon}</span>
              </div>
              <h4 className="text-label-md how__step-title">{step.title}</h4>
              <p className="text-body-sm how__step-body">{step.body}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="how__strip reveal">
          <p className="text-body-md how__strip-text">
            Average implementation time: <strong>Under 48 hours.</strong> No code changes required.
          </p>
          <a href="#" className="btn btn-primary" id="hiw-start-btn">Start Integration</a>
        </div>
      </div>
    </section>
  );
}
