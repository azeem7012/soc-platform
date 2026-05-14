import { useState } from "react";

function ThreatHuntPanel({ alerts }) {
  const [ipFilter,        setIpFilter]        = useState("");
  const [techniqueFilter, setTechniqueFilter] = useState("");
  const [severityFilter,  setSeverityFilter]  = useState("");

  const filtered = alerts.filter(a => {
    const matchIp        = a.source_ip.includes(ipFilter);
    const matchTechnique = a.technique_id.toLowerCase().includes(techniqueFilter.toLowerCase()) ||
                           a.technique_name.toLowerCase().includes(techniqueFilter.toLowerCase());
    const matchSeverity  = severityFilter === "" || a.severity === severityFilter;
    return matchIp && matchTechnique && matchSeverity;
  });

  const severityColor = {
    Critical: "bg-red-600",
    High:     "bg-orange-500",
    Medium:   "bg-yellow-500",
    Low:      "bg-blue-500",
  };

  return (
    <div className="bg-gray-900 rounded p-4">
      <h2 className="text-white text-lg font-semibold mb-4">
        Threat Hunt Panel
        <span className="ml-2 text-sm text-gray-400 font-normal">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <input
          className="bg-gray-800 text-white text-sm rounded px-3 py-2 border border-gray-700 focus:border-blue-500 outline-none"
          placeholder="Search by IP..."
          value={ipFilter}
          onChange={e => setIpFilter(e.target.value)}
        />
        <input
          className="bg-gray-800 text-white text-sm rounded px-3 py-2 border border-gray-700 focus:border-blue-500 outline-none"
          placeholder="Search by technique (e.g. T1110)..."
          value={techniqueFilter}
          onChange={e => setTechniqueFilter(e.target.value)}
        />
        <select
          className="bg-gray-800 text-white text-sm rounded px-3 py-2 border border-gray-700 focus:border-blue-500 outline-none"
          value={severityFilter}
          onChange={e => setSeverityFilter(e.target.value)}
        >
          <option value="">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">No alerts match your query.</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="pb-2 pr-4">Time</th>
              <th className="pb-2 pr-4">Source IP</th>
              <th className="pb-2 pr-4">Technique</th>
              <th className="pb-2 pr-4">Tactic</th>
              <th className="pb-2 pr-4">Description</th>
              <th className="pb-2">Severity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(alert => (
              <tr key={alert.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                <td className="py-2 pr-4 text-gray-400 whitespace-nowrap">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </td>
                <td className="py-2 pr-4 text-green-400 font-mono">{alert.source_ip}</td>
                <td className="py-2 pr-4">
                  <span className="text-purple-400 font-mono">{alert.technique_id}</span>
                  <span className="text-gray-300 ml-2">{alert.technique_name}</span>
                </td>
                <td className="py-2 pr-4 text-gray-300">{alert.tactic}</td>
                <td className="py-2 pr-4 text-gray-400">{alert.description}</td>
                <td className="py-2">
                  <span className={`${severityColor[alert.severity]} text-white text-xs px-2 py-1 rounded`}>
                    {alert.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ThreatHuntPanel;
