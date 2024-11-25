import React, { useEffect, useState } from 'react';
import './App.css'; // Custom CSS for styling
import CountUp from 'react-countup';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

import { getTotalCasesByCountry, calculateTotalCases, getDoughnutData, getBarData } from './chartData';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [countryData, setCountryData] = useState([]);

    // Fetch data from the server
    const fetchData = () => {
        fetch('http://localhost:2000/api/simulation/data')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((newData) => {
                setData(newData);
                setLoading(false);
                updateCountryData(newData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
                setError('Failed to fetch data. Please try again later.');
            });
    };

    // Update country data (limit the data to 5 random entries)
    const updateCountryData = (newData) => {
        const randomStart = Math.floor(Math.random() * Math.max(newData.length - 6, 1));
        const limitedData = newData.slice(randomStart, randomStart + 6);
        setCountryData(limitedData);
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 6000);
        return () => clearInterval(intervalId);
    }, []);

  
    const renderInsights = () => {
        const insights = calculateTotalCases(countryData);
        return (
            <>
                <div>Total Confirmed Cases: <CountUp end={insights.totalConfirmed} duration={0.2} separator="," /></div>
                <div style={{ color: 'red' }}>Total Deaths: <CountUp end={insights.totalDeaths} duration={10} separator="," /></div>
                <div>Total Recovered: <CountUp end={insights.totalRecovered} duration={4} separator="," /></div>
                <div>Total Active Cases: <CountUp end={insights.totalActive} duration={0.1} separator="," /></div>
            </>
        );
    };

    return (
        <div className="App">
            {loading && <div>Loading data...</div>}
            {error && <div>{error}</div>}

<h1> Pandemic Simulation</h1>
            <div className="grid-container">
                <div className="grid-item`1">
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
