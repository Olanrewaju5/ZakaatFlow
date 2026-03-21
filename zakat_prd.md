# Zakat Calculator Web App – Product Requirements Document (PRD)

## 1. Product Overview
**Product Name:** ZakaatFlow (working title)  
**Platform:** Web App (Mobile Responsive)  
**Target Users:** Global Muslim users (including low-literacy users)

### Vision
Enable Muslims worldwide to calculate their Zakat accurately, transparently, and effortlessly in under 2 minutes, with support for different madhabs.

---

## 2. Objectives
- Provide madhab-aware Zakat calculations
- Achieve < 2 minutes calculation time
- Ensure > 90% user trust via transparency
- Support offline usage
- Enable shareable results (PDF / WhatsApp)

---

## 3. Target Users

### Primary Users
- Everyday Muslims unsure how to calculate Zakat
- SME owners
- Low-literacy users

### Pain Points
- Confusion around calculation rules
- Lack of trust in generic calculators
- Difficulty understanding Nisab and assets

---

## 4. Core Features (MVP)

### 4.1 Madhab Selection
- Hanafi
- Maliki
- Shafi’i
- Hanbali
- Not Sure (default)

---

### 4.2 Guided Input Flow
Step-by-step inputs:
1. Cash & Savings
2. Gold & Silver
3. Business Assets
4. Investments
5. Debts

---

### 4.3 Smart Logic Engine
- Applies madhab-specific rules
- Conditional questions (e.g. jewelry usage)

---

### 4.4 Nisab Calculation
- Auto-fetch gold/silver prices (future)
- Default: Silver Nisab
- Option to toggle

---

### 4.5 Zakat Calculation
- Real-time updates
- Final output with breakdown

---

### 4.6 Results & Sharing
- Zakat amount
- Breakdown summary
- Download PDF
- Share via WhatsApp

---

### 4.7 Offline Mode
- Save inputs locally
- Sync when online

---

## 5. UX Principles
- Icon-first interface
- Minimal text
- Step-by-step flow
- High trust (transparent logic)
- Beginner-friendly

---

## 6. User Flow

Home → Select Madhab → Input Assets → Input Debts → Review → Result → Share

---

## 7. Functional Requirements

### 7.1 System Requirements
- Mobile-first web app
- Offline storage (IndexedDB)
- Rule-based engine

### 7.2 Performance
- Load < 2 seconds
- Calculation < 1 second

---

## 8. Non-Functional Requirements
- Scalable globally
- Secure user data
- High availability

---

## 9. Success Metrics
- Completion rate
- Time to calculate
- User trust feedback
- Share rate
- Retention rate

---

## 10. Risks & Mitigation

### Risks
- Incorrect calculations
- User mistrust
- Complexity overload

### Mitigation
- Scholar-reviewed logic
- Clear transparency messages
- Simplified UX

---

## 11. Future Enhancements
- Voice input
- AI financial assistant
- Lunar year tracking
- Multi-language support
- Zakat history tracking

---

## 12. Tech Stack (Proposed)
- Frontend: React / Next.js
- Backend: Firebase
- Storage: Firestore / IndexedDB

---

## 13. Timeline (MVP)
- Week 1–2: Design
- Week 3–5: Development
- Week 6: Testing & Launch

---

END OF DOCUMENT
