// page.js
'use client';
import { useEffect, useState } from "react";
import { fetchData } from "./api/getData";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import StatsCard from "./components/StatsCard";
import Filter from "./components/Filter";
import ThemeToggle from "./components/ThemeToggle";
import KeyHighlights from "./components/KeyHighlights";
import Recommendations from "./components/Recommendations";
import TopPerformers from "./components/TopPerformers";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [theme, setTheme] = useState('light');
    const [loading, setLoading] = useState(false);

    const handleFilterChange = async (dateRange, service) => {
        setLoading(true);
        const newData = await fetchData(dateRange, service);
        setData(newData);
        setLoading(false);
    };

    useEffect(() => {
        handleFilterChange("3months", "all");
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Social Media Dashboard</h1>
                <ThemeToggle onThemeChange={(newTheme) => setTheme(newTheme)} />
            </div>

            <Filter onFilterChange={handleFilterChange} />

            <div className="dashboard-content">
                <div className="charts-section">
                    <div className="chart-container">
                        <h2>Engagement Overview</h2>
                        <BarChart data={data} theme={theme} />
                    </div>
                    <div className="chart-container">
                        <h2>Trend Analysis</h2>
                        <LineChart data={data} theme={theme} />
                    </div>
                </div>

                <div className="stats-grid">
                    <StatsCard title="Facebook Shares" value="5,215" change={5} />
                    <StatsCard title="Twitter Retweets" value="571" change={7.2} />
                    <StatsCard title="Instagram Likes" value="2,892" change={3.1} />
                    <StatsCard title="LinkedIn Shares" value="1,234" change={6.5} />
                </div>

                <div className="analytics-section">
                    <KeyHighlights data={data} />
                    <Recommendations data={data} />
                    <TopPerformers data={data} />
                </div>
            </div>
        </div>
    );
}
