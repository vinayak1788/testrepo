import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function LineChart({ data, selectedServices }) {
    // Filter data based on selected services first
    const filteredData = selectedServices?.length 
        ? data.filter(item => selectedServices.includes(item.service))
        : data;

    // Then transform the filtered data
    const transformedData = filteredData.reduce((acc, curr) => {
        const monthData = acc.find(item => item.month === curr.month) || {
            month: curr.month,
            facebook: 0,
            twitter: 0,
            youtube: 0
        };
        
        if (curr.service === 'Facebook') {
            monthData.facebook += curr.social_interactions;
        } else if (curr.service === 'Twitter') {
            monthData.twitter += curr.social_interactions;
        } else if (curr.service === 'YouTube') {
            monthData.youtube += curr.social_interactions;
        }

        if (!acc.find(item => item.month === curr.month)) {
            acc.push(monthData);
        }
        return acc;
    }, []);

    const chartData = transformedData?.length ? {
        labels: transformedData.map(item => item.month),
        datasets: [
            {
                label: "Facebook",
                data: transformedData.map(item => item.facebook),
                borderColor: "#4A90E2",
                tension: 0.1,
            },
            {
                label: "Twitter",
                data: transformedData.map(item => item.twitter),
                borderColor: "#7ED321",
                tension: 0.1,
            },
            {
                label: "YouTube",
                data: transformedData.map(item => item.youtube),
                borderColor: "#D0021B",
                tension: 0.1,
            },
        ],
    } : {
        labels: [],
        datasets: []
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Line data={chartData} options={options}  />
        </div>
    );
}


