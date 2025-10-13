// App.js
import React, { useEffect, useState, useRef } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
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
  Filler
} from "chart.js";

// --- Chart.js Setup ---
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Required for fill under line
);

export default function ViewProgress() {  
  const chartRef = useRef(null);

  // --- 10 days sample data ---
  const [progressData, setProgressData] = useState([
    { date: "2025-09-14", timespent: 20 },
    { date: "2025-09-15", timespent: 35 },
    { date: "2025-09-16", timespent: 25 },
    { date: "2025-09-17", timespent: 40 },
    { date: "2025-09-18", timespent: 30 },
    { date: "2025-09-19", timespent: 50 },
    { date: "2025-09-20", timespent: 45 },
    { date: "2025-09-21", timespent: 60 },
    { date: "2025-09-22", timespent: 55 },
    { date: "2025-09-23", timespent: 70 },
  ]);

  // --- Fetch backend data ---
  useEffect(() => {
    fetch("http://localhost:5000/progress")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setProgressData(data);
      })
      .catch((err) => console.error("Error fetching progress data:", err));
  }, []);

  const times = progressData.map((entry) => entry.timespent);
  const maxTime = Math.max(...times);
  const minTime = Math.min(...times);

  // --- Gradient line with shadow ---
  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      chartArea.right,
      chartArea.top
    );
    gradient.addColorStop(0, "#ad11b8ff");
    gradient.addColorStop(1, "#ad11b8ff");
    return gradient;
  };

  const chartData = {
    labels: progressData.map((entry) => entry.date),
    datasets: [
      {
        label: "Time Spent (minutes)",
        data: progressData.map((entry) => entry.timespent),
        borderColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "#ad11b8ff";
          return getGradient(ctx, chartArea);
        },
        backgroundColor: "rgba(173,17,184,0.2)", // shadow color under the line
        fill: true,
        borderWidth: 3,
        tension: 0.1,
        pointRadius: progressData.map((entry) =>
          entry.timespent === maxTime || entry.timespent === minTime ? 6 : 0
        ),
        pointBackgroundColor: progressData.map((entry) =>
          entry.timespent === maxTime || entry.timespent === minTime
            ? "#ad11b8ff"
            : "#ad11b8ff"
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: { duration: 1500, easing: "easeOutQuart" },
    plugins: {
      legend: { labels: { color: "#333" } },
      tooltip: { mode: "index", intersect: false },
      title: {
        display: true,
        text: "Your Learning Progress (Time Spent Daily)",
        color: "#ad11b8ff",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      x: { ticks: { color: "#333" }, grid: { color: "#e0e0e0" } },
      y: { ticks: { color: "#333" }, grid: { color: "#e0e0e0" } },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        maxWidth: "900px",
        margin: "40px auto",
      }}
    >
        <Link to="/" className="position-absolute" style={{ top: "20px", left: "20px", color: "#0d6efd" }}>
                  <FaHome size={28} />
              </Link>
      <h2 style={{ color: "#ad11b8ff", textAlign: "center" }}>
        View Progress
      </h2>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
}
