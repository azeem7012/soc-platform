function RiskScorePanel({ risks }) {
  const levelColor = {
    Critical: "text-red-400",
    High:     "text-orange-400",
    Medium:   "text-yellow-400",
    Low:      "text-blue-400",
  };

  const barColor = {
    Critical: "bg-red-500",
    High:     "bg-orange-500",
    Medium:   "bg-yellow-500",
    Low:      "bg-blue-500",
  };

  return (
    <div className="bg-gray-900 rounded p-4">
      <h2 className="text-white text-lg font-semibold mb-4">IP Risk Scores</h2>
      <div className="flex flex-col gap-4">
        {risks.sort((a,b) => b.score - a.score).map(r => (
          <div key={r.ip} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="font-mono text-green-400 text-sm">{r.ip}</span>
              <span className={`text-sm font-bold ${levelColor[r.level]}`}>
                {r.level} · {r.score}/100
              </span>
            </div>
            <div className="w-full bg-gray-800 rounded h-2">
              <div
                className={`${barColor[r.level]} h-2 rounded transition-all`}
                style={{ width: `${r.score}%` }}
              />
            </div>
            <span className="text-gray-500 text-xs">
              {r.alert_count} alert{r.alert_count > 1 ? "s" : ""} · Techniques: {r.techniques.join(", ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiskScorePanel;
