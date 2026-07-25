import './LogoCloud.css';

const LOGOS = [
  { icon: 'account_balance', name: 'LEXICON' },
  { icon: 'gavel',           name: 'JUSTICE.CO' },
  { icon: 'security',        name: 'SECURELAW' },
  { icon: 'verified_user',   name: 'TRUSTGATE' },
  { icon: 'corporate_fare',  name: 'CORP-LEGAL' },
  { icon: 'balance',         name: 'EQUILEX' },
];

export default function LogoCloud() {
  return (
    <section className="logo-cloud" aria-label="Trusted by legal professionals">
      <div className="container logo-cloud__inner">
        <p className="text-label-sm logo-cloud__label">
          Trusted by Legal Professionals at
        </p>
        <div className="logo-cloud__track">
          {/* Duplicate for seamless infinite scroll */}
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={i} className="logo-cloud__item logo-cloud-item">
              <span className="material-symbols-outlined logo-cloud__icon">{logo.icon}</span>
              <span className="logo-cloud__name">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
