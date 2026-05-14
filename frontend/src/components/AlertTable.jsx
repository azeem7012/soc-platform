function AlertTable({ alerts }) {
  const severityColor = {
    Critical: "bg-red-600",
    High:     "bg-orange-500",
    Medium:   "bg-yellow-500",
    Low:      "bg-blue-500",
  };

  return (
    <div className="bg-gray-900 rounded p-4">
      <h2 className="text-white text-lg font-semibold mb-4">Live Alert Feed</h2>
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
          {alerts.map(alert => (
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
    </div>
  );
}

export default AlertTable;
