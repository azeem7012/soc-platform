function StatCard({ label, value, color }) {
  const colors = {
    red:    "border-red-500 text-red-400",
    orange: "border-orange-500 text-orange-400",
    yellow: "border-yellow-500 text-yellow-400",
    blue:   "border-blue-500 text-blue-400",
  };

  return (
    <div className={`bg-gray-900 border-l-4 ${colors[color]} rounded p-4 flex flex-col gap-1`}>
      <span className="text-gray-400 text-sm uppercase tracking-widest">{label}</span>
      <span className={`text-4xl font-bold ${colors[color].split(" ")[1]}`}>{value}</span>
    </div>
  );
}

export default StatCard;
