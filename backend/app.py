from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import requests

app = Flask(__name__)
CORS(app)

ALERTS_FILE = os.path.join(os.path.dirname(__file__), 'data', 'alerts.json')

VT_API_KEY = "e51dab6996409758721792ea753aed2ddf758d8c854be67e808f1b857e210dd8"

def load_alerts():
    with open(ALERTS_FILE, 'r') as f:
        return json.load(f)

# GET all alerts with optional filters
@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    alerts = load_alerts()
    severity  = request.args.get('severity')
    technique = request.args.get('technique')
    status    = request.args.get('status')
    if severity:
        alerts = [a for a in alerts if a['severity'].lower() == severity.lower()]
    if technique:
        alerts = [a for a in alerts if technique.lower() in a['technique_id'].lower()]
    if status:
        alerts = [a for a in alerts if a['status'].lower() == status.lower()]
    return jsonify(alerts)

# GET summary stats
@app.route('/api/stats', methods=['GET'])
def get_stats():
    alerts = load_alerts()
    stats = {
        "total":      len(alerts),
        "critical":   len([a for a in alerts if a['severity'] == 'Critical']),
        "high":       len([a for a in alerts if a['severity'] == 'High']),
        "medium":     len([a for a in alerts if a['severity'] == 'Medium']),
        "open":       len([a for a in alerts if a['status'] == 'open']),
        "techniques": {}
    }
    for alert in alerts:
        tid = alert['technique_id']
        stats['techniques'][tid] = stats['techniques'].get(tid, 0) + 1
    return jsonify(stats)

# GET alerts grouped by source IP
@app.route('/api/incidents', methods=['GET'])
def get_incidents():
    alerts = load_alerts()
    incidents = {}
    for alert in alerts:
        ip = alert['source_ip']
        if ip not in incidents:
            incidents[ip] = {
                "source_ip":        ip,
                "alert_count":      0,
                "techniques":       [],
                "highest_severity": "Low",
                "alerts":           []
            }
        incidents[ip]['alert_count'] += 1
        incidents[ip]['alerts'].append(alert)
        if alert['technique_id'] not in incidents[ip]['techniques']:
            incidents[ip]['techniques'].append(alert['technique_id'])
        sev_order = ['Low', 'Medium', 'High', 'Critical']
        current = incidents[ip]['highest_severity']
        if sev_order.index(alert['severity']) > sev_order.index(current):
            incidents[ip]['highest_severity'] = alert['severity']
    return jsonify(list(incidents.values()))

# GET risk scores per IP
@app.route('/api/risk', methods=['GET'])
def get_risk():
    alerts = load_alerts()
    risk_scores = {}
    sev_weight = {"Critical": 40, "High": 25, "Medium": 10, "Low": 5}
    for alert in alerts:
        ip = alert['source_ip']
        if ip not in risk_scores:
            risk_scores[ip] = {"ip": ip, "score": 0, "alert_count": 0, "techniques": []}
        risk_scores[ip]["score"] += sev_weight.get(alert["severity"], 0)
        risk_scores[ip]["alert_count"] += 1
        if alert["technique_id"] not in risk_scores[ip]["techniques"]:
            risk_scores[ip]["techniques"].append(alert["technique_id"])
    for ip in risk_scores:
        risk_scores[ip]["score"] = min(risk_scores[ip]["score"], 100)
        score = risk_scores[ip]["score"]
        if score >= 70:
            risk_scores[ip]["level"] = "Critical"
        elif score >= 40:
            risk_scores[ip]["level"] = "High"
        elif score >= 20:
            risk_scores[ip]["level"] = "Medium"
        else:
            risk_scores[ip]["level"] = "Low"
    return jsonify(list(risk_scores.values()))

# GET VirusTotal enrichment for an IP
@app.route('/api/enrich/<ip>', methods=['GET'])
def enrich_ip(ip):
    try:
        url     = f"https://www.virustotal.com/api/v3/ip_addresses/{ip}"
        headers = {"x-apikey": VT_API_KEY}
        res     = requests.get(url, headers=headers)
        data    = res.json()
        attributes = data.get("data", {}).get("attributes", {})
        stats      = attributes.get("last_analysis_stats", {})
        return jsonify({
            "ip":         ip,
            "malicious":  stats.get("malicious", 0),
            "suspicious": stats.get("suspicious", 0),
            "harmless":   stats.get("harmless", 0),
            "country":    attributes.get("country", "Unknown"),
            "owner":      attributes.get("as_owner", "Unknown"),
            "reputation": attributes.get("reputation", 0),
            "verdict":    "malicious"  if stats.get("malicious", 0)  > 0 else
                          "suspicious" if stats.get("suspicious", 0) > 0 else "clean"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
