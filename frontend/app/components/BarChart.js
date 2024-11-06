import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ data, selectedServices }) {
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
            monthData.facebook += curr.social_events;
        } else if (curr.service === 'Twitter') {
            monthData.twitter += curr.social_events;
        } else if (curr.service === 'YouTube') {
            monthData.youtube += curr.social_events;
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
                backgroundColor: "#4A90E2",
            },
            {
                label: "Twitter",
                data: transformedData.map(item => item.twitter),
                backgroundColor: "#7ED321",
            },
            {
                label: "YouTube",
                data: transformedData.map(item => item.youtube),
                backgroundColor: "#D0021B",
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
              <Bar data={chartData} options={options} />
          </div>
      );
  }
