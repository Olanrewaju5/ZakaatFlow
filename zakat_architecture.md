# Zakat Calculator Web App – System Architecture

## 1. Overview
This document defines the system architecture for a madhab-aware Zakat calculator. The system is designed to be scalable, offline-first, and modular, with a rule-based calculation engine.

---

## 2. Architecture Style
- Frontend: SPA (React / Next.js)
- Backend: Serverless (Firebase / Node.js)
- Data Strategy: Offline-first with sync
- Core Engine: Rule-based Zakat Logic Engine

---

## 3. High-Level Architecture

Components:
1. Frontend (UI Layer)
2. Zakat Rule Engine (Logic Layer)
3. Backend Services
4. Database (Firestore)
5. Local Storage (IndexedDB)
6. External APIs (Gold/Silver Prices)
7. PDF Generator

---

## 4. Frontend Layer
- React / Next.js
- Mobile-first UI
- Service Workers for offline mode
- IndexedDB for local storage
- Step-by-step guided flow UI

---

## 5. Zakat Rule Engine (Core)

### Responsibilities:
- Apply madhab-specific rules
- Process inputs into zakatable wealth
- Handle conditional logic
- Compute final zakat

### Design:
- Config-driven (JSON rules per madhab)
- Stateless calculation function

### Example:
```
calculateZakat(inputs, madhabConfig) => result
```

---

## 6. Backend Layer
- Firebase Authentication (optional)
- Firestore for user/session data
- Cloud Functions for:
  - Sync handling
  - PDF generation (fallback)
  - Share link creation

---

## 7. Data Flow

### Online Mode:
User Input → Frontend → Rule Engine → Result → Firestore → PDF/Share

### Offline Mode:
User Input → IndexedDB → Rule Engine → Result → Sync when online

---

## 8. Database Design

Collections:
- Users
- Sessions
- Calculations

### Calculation Schema:
- id
- madhab
- inputs
- zakatable_wealth
- zakat_due
- created_at

---

## 9. External Integrations
- Gold price API
- Silver price API

---

## 10. PDF Generation
- Client-side using jsPDF or pdf-lib
- Includes:
  - Zakat amount
  - Breakdown
  - Madhab used

---

## 11. Offline Strategy
- Service Worker caching
- IndexedDB storage
- Sync queue with retry

---

## 12. Security Considerations
- HTTPS enforced
- Secure API calls
- Data encryption in transit
- Minimal personal data storage

---

## 13. Scalability
- Serverless auto-scaling
- CDN for static assets
- Stateless rule engine

---

## 14. Performance
- Lazy loading components
- Code splitting
- Lightweight rule engine

---

## 15. Future Enhancements
- AI-based financial parsing
- Voice input processing
- Multi-language support
- Zakat API for third-party use

---

END OF DOCUMENT
