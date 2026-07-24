# eSahayak Platform - Final Design Document

**Version:** 1.0  
**Date:** July 24, 2026  
**Document Type:** Consolidated Design Specification  
**Compliance Framework:** BCI Rules, Advocates Act 1961, IT Act 2000

---

## 1. Executive Summary

eSahayak is an AI-powered legal assistance platform operating within strict Indian regulatory constraints. The platform follows a **neutral directory model** combined with **document utility services**, ensuring full compliance with Bar Council of India (BCI) regulations while providing accessible legal document generation and consultation facilitation.

**Compliance Position:** Zero solicitation, neutral directory, no fee-splitting, no algorithmic lawyer matching.

---

## 2. System Architecture

### 2.1 User Roles
- **User:** Citizen/business seeking legal documents and services
- **Advocate:** Verified legal professional listed in neutral directory
- **Admin:** Platform operator managing compliance and operations

### 2.2 Core Modules
1. **User Module:** Document generation, e-stamp, e-sign, consultation booking
2. **Admin Module:** Compliance monitoring, lawyer verification, content management
3. **Advocate Module:** Profile management, consultation handling (separate document)

---

## 3. Regulatory Compliance Framework

### 3.1 Critical Compliance Requirements

**BCI Rule 36 Compliance:**
- **PROHIBITED:** Advertising, solicitation, rankings, ratings, reviews, sponsored listings
- **PROHIBITED:** Algorithmic lawyer matching, AI recommendations, percentage-based booking fees
- **REQUIRED:** Neutral directory (alphabetical/geographic only)
- **REQUIRED:** Flat-rate software licensing fees to advocates (no commission on consultation fees)

**Directory Display (5 permitted fields only):**
1. Lawyer name
2. Bar Council enrollment number
3. Contact details
4. Academic qualifications
5. Approved areas of practice

**AI Usage Restrictions:**
- AI restricted to document drafting assistance
- AI-generated content must carry disclaimer: "Not substitute for professional legal advice"
- No AI-powered lawyer recommendations or matching
- AI legal Q&A limited to general information, not case-specific advice

### 3.2 Compliance Model
**Adopted Model:** Hybrid of Model 2 (Neutral Directory) + Model 3 (Document Utility)

---

## 4. Functional Requirements

### 4.1 User Module (27 Requirements)

#### Authentication & Profile
- **FR-U-001:** OTP-based registration (mobile/email)
- **FR-U-002:** Duplicate registration prevention
- **FR-U-003:** OTP/password-based login
- **FR-U-004:** Account lockout after failed attempts
- **FR-U-005:** Dashboard with activity summary
- **FR-U-006:** Profile and KYC management
- **FR-U-007:** Mobile change re-verification

#### AI Assistant
- **FR-U-008:** AI document drafting assistance
- **FR-U-009:** Mandatory disclaimer on AI output

#### Document Services
- **FR-U-010:** Categorized template library
- **FR-U-011:** Live document preview
- **FR-U-012:** Mandatory field validation
- **FR-U-013:** State-wise stamp duty calculation
- **FR-U-014:** E-stamp procurement via authorized vendors
- **FR-U-015:** E-signature requests to parties
- **FR-U-016:** Aadhaar OTP verification for signing
- **FR-U-017:** Real-time signature status tracking

#### Consultation & Services
- **FR-U-018:** Topic-based consultation booking
- **FR-U-019:** Advocate assignment notification
- **FR-U-020:** Government certificate requests
- **FR-U-021:** Property record retrieval

#### Payments & Notifications
- **FR-U-022:** Itemized price breakdown
- **FR-U-023:** Secure payment gateway with invoice
- **FR-U-024:** Idempotent payment processing
- **FR-U-025:** Multi-channel notifications
- **FR-U-026:** Secure logout
- **FR-U-027:** Consolidated request tracking (proposed)

### 4.2 Admin Module (9 Core Functions)

#### Lawyer Verification
- Validate Bar Council enrollment numbers
- Verify identity documents and credentials
- Approve/reject/suspend lawyer accounts
- Ensure compliance with BCI profile restrictions

#### User Management
- View user information and profiles
- Block/unblock accounts
- Handle and resolve complaints
- Update user profiles when required

#### Document Template Management
- Create, update, categorize templates
- Delete obsolete templates
- Ensure legal validity of templates
- Maintain version control

#### Compliance Monitoring
- Review lawyer profiles for BCI compliance
- Remove unauthorized/promotional content
- Ensure only permitted professional information displayed
- Monitor for solicitation violations

#### Directory Management
- Maintain neutral alphabetical/geographic listing
- **NO rankings, reviews, ratings, or sponsored listings**
- **NO AI-based recommendations**
- Ensure 5-field display compliance

#### Content Management
- Publish legal awareness articles
- Manage FAQs
- Upload government notifications
- Moderate informational content

#### Platform Analytics
- Generate reports on registered users
- Track verified lawyers count
- Monitor document generation volume
- Report active subscriptions and platform usage

#### Support & Complaint Management
- Manage support tickets
- Assign issues to appropriate teams
- Monitor complaint resolution status
- Ensure timely response

#### Subscription & Payment Management
- Manage software subscriptions
- Generate invoices
- Monitor payment records
- **Ensure zero commission on lawyer consultation fees**

#### Audit & Activity Logging
- Log user logins
- Track profile updates
- Record document modifications
- Log all administrative activities
- Maintain security audit trail

---

## 5. Technical Architecture

### 5.1 Data Model

**Users Table:**
- user_id, mobile, email, name, kyc_status, aadhaar_verified, created_at, updated_at

**Advocates Table:**
- advocate_id, name, enrollment_number, contact, qualifications, practice_areas, verification_status, subscription_status

**Document Templates Table:**
- template_id, name, category, state_applicable, content, version, created_by, is_active

**User Documents Table:**
- document_id, user_id, template_id, content, status, created_at, estamp_status, esign_status

**Consultations Table:**
- consultation_id, user_id, advocate_id, topic, scheduled_time, status, outcome_notes

**Payments Table:**
- payment_id, user_id, amount, payment_method, transaction_id, invoice_id, status

**Audit Logs Table:**
- log_id, user_id, action, entity_type, entity_id, timestamp, ip_address

### 5.2 Security Requirements

**Data Protection:**
- Encrypt all PII and KYC data at rest
- Encrypt data in transit (TLS 1.3)
- Aadhaar/PAN data in separate encrypted storage
- Attorney-client privilege protection (Section 126 Evidence Act)

**Authentication:**
- OTP-based authentication for all critical actions
- Session management with secure token invalidation
- Multi-factor authentication for admin operations

**Payment Security:**
- PCI DSS compliant payment gateway integration
- No card data storage on platform
- Idempotent transaction processing

### 5.3 Integration Points

**External Services:**
- E-stamp vendors (state-specific)
- E-signature service providers (licensed)
- Payment gateway (Razorpay/Stripe)
- SMS/WhatsApp gateway (notifications)
- Aadhaar verification service

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Document preview update: < 3 seconds
- AI assistant response: < 5 seconds
- Page load time: < 2 seconds
- Payment processing: < 30 seconds

### 6.2 Reliability
- 99.5% uptime for core services
- Idempotent critical operations (payment, e-stamp, e-sign)
- Graceful degradation during vendor outages

### 6.3 Scalability
- Support 10,000+ concurrent users
- Horizontal scaling capability
- Database sharding for user data

### 6.4 Usability
- First-time user completes document in < 10 minutes
- Mobile-responsive design
- Clear, readable forms with inline validation

### 6.5 Security
- Regular security audits
- Penetration testing quarterly
- Compliance with data protection regulations
- Role-based access control (RBAC)

---

## 7. User Workflows

### 7.1 Document Generation Flow
```
Visitor → Register (OTP) → Login → Dashboard → Select Template 
→ Fill Form → Live Preview → Payment → E-Stamp (if required) 
→ E-Sign (if required) → Download
```

### 7.2 Consultation Booking Flow
```
User → Dashboard → Book Consultation → Select Topic/Time 
→ Payment (if required) → Advocate Assignment → Confirmation 
→ Consultation → Outcome Notes
```

### 7.3 Admin Compliance Flow
```
Admin → Login → Dashboard → Lawyer Verification 
→ Validate Credentials → Approve/Reject → Monitor Directory 
→ Compliance Review → Audit Logs
```

---

## 8. Compliance Checklist

### 8.1 Must-Have (Critical)
- [x] No lawyer advertising/solicitation
- [x] Neutral directory (alphabetical/geographic only)
- [x] No rankings, ratings, reviews
- [x] No algorithmic lawyer matching
- [x] No commission on consultation fees
- [x] Flat-rate software licensing to advocates
- [x] AI disclaimer on all generated content
- [x] 5-field directory display compliance
- [x] Attorney-client privilege protection

### 8.2 Must-Not-Have (Prohibited)
- [x] No percentage-based booking fees
- [x] No client reviews/star ratings
- [x] No AI-powered lawyer recommendations
- [x] No fixed-price lawyer bookings (pricing control with advocate)
- [x] No promotional content in lawyer profiles
- [x] No influencer/social media content by lawyers

---

## 9. Implementation Phases

### Phase 1: Core Platform (Months 1-3)
- User registration/login
- Basic document generation
- Admin module foundation
- Compliance framework setup

### Phase 2: Document Services (Months 4-5)
- E-stamp integration
- E-signature integration
- Template library expansion
- AI assistant enhancement

### Phase 3: Consultation & Services (Months 6-7)
- Consultation booking system
- Government certificate services
- Property record retrieval
- Notification system

### Phase 4: Advanced Features (Months 8-9)
- Request tracking dashboard
- Multi-language support
- Mobile application
- Advanced analytics

---

## 10. Risk Mitigation

### 10.1 Regulatory Risks
- **Risk:** BCI rule changes
- **Mitigation:** Legal review quarterly, agile compliance updates

### 10.2 Operational Risks
- **Risk:** E-stamp vendor downtime
- **Mitigation:** Multiple vendor integrations, clear user communication

### 10.3 Security Risks
- **Risk:** Data breach
- **Mitigation:** Encryption, audits, penetration testing, incident response plan

### 10.4 Technical Risks
- **Risk:** Payment gateway failures
- **Mitigation:** Multiple gateway options, idempotent processing, retry logic

---

## 11. Success Metrics

### 11.1 User Metrics
- Registration completion rate: > 80%
- Document generation success rate: > 95%
- User satisfaction score: > 4.0/5.0

### 11.2 Business Metrics
- Monthly active users
- Documents generated per month
- Consultations booked per month
- Revenue from software subscriptions

### 11.3 Compliance Metrics
- Zero BCI violations
- 100% profile compliance rate
- Audit log completeness: 100%

---

## 12. Code Review & Fixes

### 12.1 Issues Identified

**Critical Issues:**
- **Missing Client Registration Route:** The Login page referenced `/client/register` route but no corresponding page or route existed in App.jsx
- **No 404 Error Handling:** No fallback route for unknown URLs, leading to blank pages
- **Missing Error Boundary:** No React Error Boundary component to catch and handle runtime errors gracefully

**Branding Inconsistencies:**
- Hero component referenced "legalflow.ai" instead of "esewa.in"
- CTA component referenced "LegalFlow" instead of "eSewa"
- Inconsistent naming across components

### 12.2 Fixes Applied

**New Components Created:**
1. **ClientRegister.jsx** - Client registration page with form validation
   - Full name, email, phone, password fields
   - Password confirmation validation
   - Google SSO integration placeholder
   - Reuses Login.css for consistent styling

2. **NotFound.jsx** - 404 error page
   - Clean, branded error page
   - Navigation options (Home, Sign In)
   - Responsive design with illustration

3. **ErrorBoundary.jsx** - React Error Boundary component
   - Catches JavaScript errors in component tree
   - Displays user-friendly error message
   - Shows error details in development mode
   - Provides recovery options (reload, home)

**Route Updates:**
- Added `/client/register` route in App.jsx
- Added `/*` catch-all route for 404 handling
- Imported all new page components

**Branding Corrections:**
- Updated Hero.jsx: `legalflow.ai/dashboard` → `esewa.in/dashboard`
- Updated Hero.jsx: Alt text references "LegalFlow AI" → "eSewa Legal Services"
- Updated CTA.jsx: "LegalFlow" → "eSewa"

**Application Structure:**
- Wrapped entire app in ErrorBoundary in main.jsx
- Ensured all routes are properly protected by error handling

### 12.3 Compliance Verification

All fixes maintain BCI compliance:
- No changes to lawyer directory or ranking systems
- No algorithmic matching features added
- Error handling is purely technical infrastructure
- Client registration follows neutral directory model

---

## 13. Conclusion

This design document provides a comprehensive blueprint for building eSahayak as a compliant, scalable, and user-friendly legal assistance platform. The architecture prioritizes regulatory compliance while delivering essential legal document and consultation services to Indian citizens.

**Key Success Factors:**
1. Strict adherence to BCI compliance framework
2. Neutral directory model implementation
3. Robust security and data protection
4. Seamless user experience
5. Scalable technical architecture

---

**Document Control**
- **Prepared By:** Project Manager
- **Reviewed By:** Legal Compliance Team
- **Approved By:** Senior Leadership
- **Next Review:** October 2026
