export const getTotalCasesByCountry = (countryData) => {
    if (countryData.length === 0) {
        return {
            labels: [],
            datasets: [],
        };
    }
    const countries = countryData.map((item) => item.countryRegion);
    const infected = countryData.map((item) => item.confirmed);
    const dead = countryData.map((item) => item.deaths);
    const recovered = countryData.map((item) => item.recovered);
    const active = countryData.map((item) => item.confirmed - item.deaths - item.recovered);
    return {
        labels: countries,
        datasets: [
            { label: 'Infected', data: infected, borderColor: 'rgba(255, 99, 132, 1)', fill: false },
            { label: 'Deaths', data: dead, borderColor: 'rgba(255, 159, 64, 1)', fill: false },
            { label: 'Recovered', data: recovered, borderColor: 'rgba(75, 192, 192, 1)', fill: false },
            { label: 'Active Cases', data: active, borderColor: 'rgba(153, 102, 255, 1)', fill: false },
        ],
    };
};

export const calculateTotalCases = (countryData) => {
    const totalConfirmed = countryData.reduce((acc, item) => acc + item.confirmed, 0);
    const totalDeaths = countryData.reduce((acc, item) => acc + item.deaths, 0);
    const totalRecovered = countryData.reduce((acc, item) => acc + item.recovered, 0);
    const totalActive = totalConfirmed - totalDeaths - totalRecovered;

    return { totalConfirmed, totalDeaths, totalRecovered, totalActive };
};


export const getBarData = (countryData) => {
    const countries = countryData.map((item) => item.countryRegion);
    const activeCases = countryData.map((item) => item.confirmed - item.deaths - item.recovered);

    return {
        labels: countries,
        datasets: [
            {
                label: 'Active Cases',
                data: activeCases,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };
};

export const getBubbleChartData = (countryData) => {
    const countries = countryData.map((item) => item.countryRegion);
    const populations = countryData.map((item) => item.population);
    const activeCases = countryData.map((item) => item.confirmed - item.deaths - item.recovered);

    return {
        labels: countries,
        datasets: [
            {
                label: 'Active Cases vs Population',
                data: populations.map((pop, index) => ({
                    x: activeCases[index],
                    y: pop,
                    r: Math.sqrt(activeCases[index]) * 2,
                })),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };
};

export const getChoroplethData = (countryData) => {
    const countryMap = {};
    countryData.forEach((item) => {
        countryMap[item.countryRegion] = {
            confirmed: item.confirmed,
            deaths: item.deaths,
            recovered: item.recovered,
            active: item.confirmed - item.deaths - item.recovered,
        };
    });
    return countryMap;
};
