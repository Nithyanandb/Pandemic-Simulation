import React, { useEffect, useState } from 'react';
import './App.css';
import CountUp from 'react-countup';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import {
  getTotalCasesByCountry,
  calculateTotalCases,
  getDoughnutData,
  getBarData,
} from './chartData';
import video from './video/4K Planet Earth Spinning in Space _ Free HD Videos - No Copyright.mp4';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [countdown, setCountdown] = useState(7);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pandemic-backend-production.up.railway.app/api/simulation/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newData = await response.json();
      setData(newData);
      setLoading(false);
      updateCountryData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  const updateCountryData = (newData) => {
    const randomStart = Math.floor(Math.random() * Math.max(newData.length - 4, 1));
    const limitedData = newData.slice(randomStart, randomStart + 4);
    setCountryData(limitedData);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 6000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 6));
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  const renderInsights = () => {
    const insights = calculateTotalCases(countryData);
    return (
      <>
        <div>Total Confirmed Cases: <CountUp end={insights.totalConfirmed} duration={10} separator="," /></div>
        <div style={{ color: 'red' }}>Total Deaths: <CountUp end={insights.totalDeaths} duration={0.02} separator="," /></div>
        <div>Total Recovered: <CountUp end={insights.totalRecovered} duration={2} separator="," /></div>
        <div>Total Active Cases: <CountUp end={insights.totalActive} duration={0.1} separator="," /></div>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pandemic Simulation</h1>
        <div className="event-counter">
          <p>Simulation data is Updated every   <span className="countdown">{countdown}</span> seconds</p>
        </div>
        <p>Simulation data is limited to 4 random entries.</p>
      </header>

      <div className="video-container">
        <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
        </video>
      </div>

      {loading && <div>Loading data...</div>}
      {error && <div className='er'>{error}</div>}

      <div className="grid-container">
        <div className="grid-item1">
          <h3>Total Cases by Country</h3>
          <Line data={getTotalCasesByCountry(countryData)} options={{ responsive: true, plugins: { title: { display: true, text: 'Total Cases by Country' } } }} />
        </div>

        <div className="grid-item2">
          <h3>Active Cases by Country</h3>
          <Bar data={getBarData(countryData)} options={{ responsive: true }} />
        </div>
        <div className="grid-item3">
          <h3>Active vs Total Cases</h3>
          <Doughnut data={getDoughnutData(countryData)} options={{ responsive: true }} />
        </div>
      </div>
      <div className='in'>
        {renderInsights()}
      </div>
    </div>
  );
}

export default App;