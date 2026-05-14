import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./components/StatCard";
import AlertTable from "./components/AlertTable";
import MitreHeatmap from "./components/MitreHeatmap";
import RiskScorePanel from "./components/RiskScorePanel";
import ThreatHuntPanel from "./components/ThreatHuntPanel";

function App() {
  const [stats,  setStats]  = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [risks,  setRisks]  = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats")
      .then(res => setStats(res.data));
    axios.get("http://localhost:5000/api/alerts")
      .then(res => setAlerts(res.data));
    axios.get("http://localhost:5000/api/risk")
      .then(res => setRisks(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">SOC Detection Platform</h1>
        <p className="text-gray-400 text-sm">
          Real-time threat monitoring · MITRE ATT&CK mapped · IOC enrichment · Threat hunting
        </p>
      </div>

      {/* Stat Cards */}
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Alerts" value={stats.total}    color="blue"   />
          <StatCard label="Critical"     value={stats.critical} color="red"    />
          <StatCard label="High"         value={stats.high}     color="orange" />
          <StatCard label="Open"         value={stats.open}     color="yellow" />
        </div>
      )}

      {/* MITRE + Risk Score */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <MitreHeatmap techniques={stats.techniques} />
          <RiskScorePanel risks={risks} />
        </div>
      )}

      {/* Threat Hunt Panel */}
      <div className="mb-6">
        <ThreatHuntPanel alerts={alerts} />
      </div>

      {/* Alert Feed */}
      <AlertTable alerts={alerts} />

    </div>
  );
}

export default App;
