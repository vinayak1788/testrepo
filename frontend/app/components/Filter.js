
'use client'
import { useState } from "react";

export default function Filter({ onFilterChange }) {
    const [dateRange, setDateRange] = useState("3months");
    const [service, setService] = useState("all");

    const handleDateRangeChange = (event) => {
        setDateRange(event.target.value);
        onFilterChange(event.target.value, service);
    };

    const handleServiceChange = (event) => {
        setService(event.target.value);
        onFilterChange(dateRange, event.target.value);
    };

    return (
        <div className="filters">
            <label>Date Range:</label>
            <select value={dateRange} onChange={handleDateRangeChange}>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
            </select>
            <label>Services:</label>
            <select value={service} onChange={handleServiceChange}>
                <option value="all">All</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="YouTube">YouTube</option>
            </select>
        </div>
    );
}



