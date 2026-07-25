import './Footer.css';
import logoSrc from '../assets/logo.jpg';

const LINKS = {
  Product: ['AI Documents', 'E-Stamping', 'Digital Signatures', 'Consultations', 'Billing'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Blog'],
  Legal:   ['Privacy Policy', 'Terms of Service', 'Security', 'Cookie Policy'],
  Support: ['Help Center', 'Contact', 'Status', 'API Docs'],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Top: Brand + Links */}
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <a className="footer__logo" href="#" aria-label="eSewa Legal Services home">
              <img
                src={logoSrc}
                alt="eSewa Legal Services"
                className="footer__logo-img"
              />
            </a>
            <p className="text-body-sm footer__tagline">
              Enterprise-grade AI legal services for high-growth teams — built for speed,
              compliance, and trust.
            </p>
            {/* Social */}
            <div className="footer__social">
              {[
                { icon: 'language', label: 'Website' },
                { icon: 'help', label: 'Help Center' },
                { icon: 'mail', label: 'Email' },
              ].map(({ icon, label }) => (
                <a key={icon} href="#" aria-label={label} className="footer__social-btn">
                  <span className="material-symbols-outlined">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav Groups */}
          {Object.entries(LINKS).map(([group, items]) => (
            <nav key={group} className="footer__nav-group" aria-label={group}>
              <h3 className="text-label-sm footer__nav-heading">{group}</h3>
              <ul role="list" className="footer__nav-list">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="footer__nav-link text-body-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="text-body-sm footer__copy">
            © {year} eSewa Legal Services. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link text-body-sm">Privacy</a>
            <a href="#" className="footer__bottom-link text-body-sm">Terms</a>
            <a href="#" className="footer__bottom-link text-body-sm">Cookies</a>
          </div>
          <div className="footer__compliance">
            <span className="chip chip-navy" style={{ fontSize: '10px' }}>SOC 2</span>
            <span className="chip chip-navy" style={{ fontSize: '10px' }}>ISO 27001</span>
            <span className="chip chip-navy" style={{ fontSize: '10px' }}>GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
