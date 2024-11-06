export default function TopPerformers({ data }) {
    if (!data || data.length === 0) {
        return <p>No data available to display top performers.</p>;
    }

    const topPerformer = data.reduce((max, item) => 
        item.social_interactions > (max?.social_interactions || 0) ? item : max, 
        null
    );
    
    return (
        <div className="dashboard-item top-performers">
            <h2>Top Performers</h2>
            {topPerformer ? (
                <p>Top Campaign: {topPerformer.service} in {topPerformer.month} with {topPerformer.social_interactions} interactions.</p>
            ) : (
                <p>No top performer data available.</p>
            )}
        </div>
    );
}