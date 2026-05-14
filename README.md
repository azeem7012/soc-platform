
## Project Report

[📄 View Full Project Report](./SOC_Platform_Report_Azeem.pdf)


# SOC Detection & Threat Hunting Platform

A full-stack Security Operations Center (SOC) dashboard for real-time alert triage, MITRE ATT&CK mapping, IP risk scoring, and threat hunting.

Built as an extension of a custom log-based IDS that detects SSH brute-force (T1110), port scanning (T1046), and web enumeration attacks from real auth.log and syslog data.

---

## Features

- **Live Alert Feed** — real-time alert triage with severity badges
- **MITRE ATT&CK Heatmap** — visual mapping of detected techniques
- **IP Risk Scoring** — automated risk score per source IP based on severity and frequency
- **Threat Hunt Panel** — search and filter alerts by IP, technique ID, or severity
- **VirusTotal Enrichment** — IOC lookup for source IPs via VT API
- **Incident Correlation** — alerts grouped by source IP to identify attack chains

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React, Tailwind CSS, Axios        |
| Backend  | Python, Flask, Flask-CORS         |
| Intel    | VirusTotal API v3                 |
| Data     | Custom log-based IDS alert output |
| Mapping  | MITRE ATT&CK Framework            |

---

## API Endpoints

| Method | Endpoint            | Description                        |
|--------|---------------------|------------------------------------|
| GET    | /api/alerts         | All alerts with optional filters   |
| GET    | /api/stats          | Summary stats for dashboard        |
| GET    | /api/incidents      | Alerts grouped by source IP        |
| GET    | /api/risk           | Risk scores per source IP          |
| GET    | /api/enrich/<ip>    | VirusTotal enrichment for an IP    |

---

## Detection Coverage

| Technique | Name                          | Tactic             |
|-----------|-------------------------------|--------------------|
| T1110     | Brute Force                   | Credential Access  |
| T1046     | Network Service Scanning      | Discovery          |
| T1190     | Exploit Public-Facing App     | Initial Access     |
| T1078     | Valid Accounts                | Defense Evasion    |

---

## Project Structure

soc-platform/
├── backend/
│   ├── app.py
│   └── data/
│       └── alerts.json
└── frontend/
└── src/
├── App.js
└── components/
├── StatCard.jsx
├── AlertTable.jsx
├── MitreHeatmap.jsx
├── RiskScorePanel.jsx
└── ThreatHuntPanel.jsx

---

## Setup & Run

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors requests
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000`

---

## Screenshots

> Dashboard with MITRE ATT&CK heatmap, IP risk scores, and threat hunt panel
<img width="1907" height="418" alt="heat map nd ip risk score" src="https://github.com/user-attachments/assets/08eec158-8af8-40db-802d-dd507ba9dd38" />
<img width="1868" height="232" alt="live alert feed" src="https://github.com/user-attachments/assets/a850d196-b73d-466d-8848-4d0e5c889f6b" />
<img width="1887" height="278" alt="threat hunt panel" src="https://github.com/user-attachments/assets/5a5e952d-5566-4bfa-a180-b450d6bed356" />



---

## Related Projects

- **Log-Based IDS** — the detection engine that feeds alerts into this platform
- **Android APK Malware Sandbox** — automated mobile security pipeline using MobSF and VirusTotal

---

## Author

**Azeem Abdulla**  
SOC Analyst (L1) | Cybersecurity Graduate  
[LinkedIn](https://linkedin.com/in/azeem-abdulla) · [GitHub](https://github.com/azeem7012)
