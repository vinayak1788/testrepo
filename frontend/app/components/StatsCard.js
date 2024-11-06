const StatsCard = ({ title, value, change }) => {
  return (
      <div className="stats-card">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
          <p className={`mt-2 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </p>
      </div>
  );
};

export default StatsCard;