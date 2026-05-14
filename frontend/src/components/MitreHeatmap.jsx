const TECHNIQUES = [
  { id: "T1110", name: "Brute Force",                  tactic: "Credential Access" },
  { id: "T1046", name: "Network Service Scanning",     tactic: "Discovery" },
  { id: "T1190", name: "Exploit Public-Facing App",    tactic: "Initial Access" },
  { id: "T1078", name: "Valid Accounts",               tactic: "Defense Evasion" },
  { id: "T1059", name: "Command & Scripting",          tactic: "Execution" },
  { id: "T1021", name: "Remote Services",              tactic: "Lateral Movement" },
];

function MitreHeatmap({ techniques }) {
  const getColor = (count) => {
    if (!count) return "bg-gray-800 text-gray-600";
    if (count >= 3)  return "bg-red-700 text-white";
    if (count >= 2)  return "bg-orange-600 text-white";
    return "bg-yellow-600 text-white";
  };

  return (
    <div className="bg-gray-900 rounded p-4">
      <h2 className="text-white text-lg font-semibold mb-4">MITRE ATT&CK Heatmap</h2>
      <div className="grid grid-cols-3 gap-3">
        {TECHNIQUES.map(t => {
          const count = techniques?.[t.id] || 0;
          return (
            <div key={t.id} className={`${getColor(count)} rounded p-3 flex flex-col gap-1`}>
              <span className="font-mono text-xs font-bold">{t.id}</span>
              <span className="text-xs">{t.name}</span>
              <span className="text-xs opacity-70">{t.tactic}</span>
              {count > 0 && (
                <span className="text-xs font-bold mt-1">{count} hit{count > 1 ? "s" : ""}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MitreHeatmap;
