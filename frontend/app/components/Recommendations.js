// app/components/Recommendations.js
export default function Recommendations({ data }) {
    const twitterEngagement = data.filter(item => item.service === 'Twitter').reduce((acc, item) => acc + item.social_events, 0);
    const facebookEngagement = data.filter(item => item.service === 'Facebook').reduce((acc, item) => acc + item.social_events, 0);

    const recommendation = twitterEngagement > facebookEngagement
        ? "Focus on Twitter for maximum engagement."
        : "Focus on Facebook for maximum engagement.";

    return (
        <div className="dashboard-item recommendations">
            <h2>Recommendations</h2>
            <p>{recommendation}</p>
        </div>
    );
}
