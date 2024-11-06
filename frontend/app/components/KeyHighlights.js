export default function KeyHighlights({ data }) {
    if (!data || data.length === 0) {
        return <div className="dashboard-item">No data available</div>;
    }

    const topPerformer = data.reduce((max, item) => 
        item.social_interactions > (max?.social_interactions || 0) ? item : max, 
        null
    );

    const totalInteractions = data.reduce((sum, item) => sum + item.social_interactions, 0);

    const bestMonth = data.reduce((best, item) => 
        item.social_interactions > (best?.social_interactions || 0) ? item : best, 
        null
    );

    return (
        <div className="dashboard-item">
            <h2 className="text-xl font-semibold mb-4">Key Highlights</h2>
            {topPerformer && (
                <div className="mb-4">
                    <h3 className="font-medium">Top Performer</h3>
                    <p>{topPerformer.service} in {topPerformer.month}</p>
                    <p>{topPerformer.social_interactions} interactions</p>
                </div>
            )}
            <div>
                <h3 className="font-medium">Overall Performance</h3>
                <p>Total: {totalInteractions} interactions</p>
                {bestMonth && (
                    <p>Best Month: {bestMonth.month}</p>
                )}
            </div>
        </div>
    );
}