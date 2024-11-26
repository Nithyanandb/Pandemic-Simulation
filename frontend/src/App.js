import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Container, Typography, Grid, CircularProgress } from '@mui/material';
import CountUp from 'react-countup';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
);

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [countryData, setCountryData] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:2000/api/simulation/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(newData => {
                setData(newData);
                setLoading(false);
                updateCountryData(newData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
                setError('Failed to fetch data. Please try again later.');
            });
    };

    const updateCountryData = (newData) => {
        const randomStart = Math.floor(Math.random() * Math.max(newData.length - 5, 1));
        const limitedData = newData.slice(randomStart, randomStart + 5);
        setCountryData(limitedData);
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 4000);
        return () => clearInterval(intervalId);
    }, []);

    const getTotalCasesByCountry = () => {
        if (countryData.length === 0) return null;

        const countries = countryData.map(item => item.countryRegion);
        const infected = countryData.map(item => item.confirmed);
        const dead = countryData.map(item => item.deaths);
        const recovered = countryData.map(item => item.recovered);
        const active = countryData.map(item => item.confirmed - item.deaths - item.recovered);

        return {
            labels: countries,
            datasets: [
                { label: 'Infected', data: infected, backgroundColor: 'rgba(255, 99, 132, 0.6)' },
                { label: 'Deaths', data: dead, backgroundColor: 'rgba(255, 159, 64, 0.6)' },
                { label: 'Recovered', data: recovered, backgroundColor: 'rgba(75, 192, 192, 0.6)' },
                { label: 'Active Cases', data: active, backgroundColor: 'rgba(153, 102, 255, 0.6)' }, // New dataset for active cases
            ],
        };
    };

    const getInsights = () => {
        if (countryData.length === 0) return null;

        const totalConfirmed = countryData.reduce((acc, item) => acc + item.confirmed, 0);
        const totalDeaths = countryData.reduce((acc, item) => acc + item.deaths, 0);
        const totalRecovered = countryData.reduce((acc, item) => acc + item.recovered, 0);
        const totalActive = totalConfirmed - totalDeaths - totalRecovered;

        return { totalConfirmed, totalDeaths, totalRecovered, totalActive };
    };

    const insights = getInsights();

    return (
        <Container maxWidth="lg" style={{ padding: "50px" }}>
            <Typography variant="h4" gutterBottom>
                Pandemic Simulation
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            {loading ? (
                <CircularProgress style={{ padding: "10px" }} />
            ) : (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Bar data={getTotalCasesByCountry()} options={{ responsive: true }} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Insights</Typography>
                        {insights && (
                            <>
                                <Typography>Total Confirmed Cases: <CountUp end={insights.totalConfirmed} duration={0.2} separator="," /></Typography>
                                <Typography style={{ color: "red" }}>Total Deaths: <CountUp end={insights.totalDeaths} duration={0.5} separator="," /></Typography>
                                <Typography>Total Recovered: <CountUp end={insights.totalRecovered} duration={0.2} separator="," /></Typography>
                                <Typography>Total Active Cases: <CountUp end={insights.totalActive} duration={0.2} separator="," /></Typography>
                            </>
                        )}
                    </Grid>

                    {insights && (
                        <Grid item xs={12} md={6}>
                            <Doughnut
                                data={{
                                    labels: ['Confirmed', 'Deaths', 'Recovered', 'Active Cases'],
                                    datasets: [
                                        {
                                            label: 'Proportions',
                                            data: [
                                                insights.totalConfirmed,
                                                insights.totalDeaths,
                                                insights.totalRecovered,
                                                insights.totalActive,
                                            ],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.6)',
                                                'rgba(255, 159, 64, 0.6)',
                                                'rgba(75, 192, 192, 0.6)',
                                                'rgba(153, 102, 255, 0.6)', // New color for active cases
                                            ],
                                        },
                                    ],
                                }}
                                options={{ responsive: true }}
                            />
                        </Grid>
                    )}
                </Grid>
            )}
        </Container>
    );
}

export default App;
