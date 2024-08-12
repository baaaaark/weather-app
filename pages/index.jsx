import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, Typography } from '@mui/material';
import HourlyForecast from '../components/HourlyForecast/HourlyForecast';
import WeatherGraph from '../components/WeatherGraph/WeatherGraph';
import CurrentConditions from '../components/CurrentConditions/CurrentConditions';
import TabPanel from '../components/TabPanel/TabPanel';
import styles from './index.module.css';

function a11yProps(index) {
	return {
	  id: `tab-${index}`,
	  'aria-controls': `tabpanel-${index}`,
	};
  }
  
export default function Home() {
  const [cityName, setCityName] = useState();
  const [stateName, setStateName] = useState();
  const [weatherData, setWeatherData] = useState();
  const [isDaytime, setIsDaytime] = useState(true);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
		try {
			const pointsResponse = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`);
			const hourlyForecastUrl = pointsResponse.data.properties.forecastHourly;
			const hourlyForecastResponse = await axios.get(hourlyForecastUrl);

			setCityName(pointsResponse.data.properties.relativeLocation.properties.city);
			setStateName(pointsResponse.data.properties.relativeLocation.properties.state);
			setWeatherData(hourlyForecastResponse.data);
		} catch (error) {
			console.error('Error fetching weather data:', error);
		}
    };

    const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
			fetchWeatherData(position.coords.latitude, position.coords.longitude);
			getDayOrNight(position.coords.latitude, position.coords.longitude);
			}, (error) => {
			console.error('Error getting current location:', error);
			});
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
    };

	const getDayOrNight = async (latitude, longitude) => {
		try {
			const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
			const { sunrise, sunset } = response.data.results;
	
			const currentTime = new Date();
			const sunriseTime = new Date(sunrise);
			const sunsetTime = new Date(sunset);
	
			if (currentTime >= sunriseTime && currentTime < sunsetTime) {
				setIsDaytime(true);
			} else {
				setIsDaytime(false);
			}
		} catch (error) {
			console.error('Error fetching day/night data:', error);
			return 'day';
		}
	};

    getCurrentLocation();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.indexContainer}>
      {weatherData ? (
        <div>
          <Tabs value={value} onChange={handleChange} aria-label="Weather data tabs" variant="fullWidth">
			<Tab label={<Typography variant="h5">Current Conditions</Typography>} {...a11yProps(0)} />
			<Tab label={<Typography variant="h5">GraphCast</Typography>} {...a11yProps(1)} />
			<Tab label={<Typography variant="h5">Seven Day Hourly Forecast</Typography>} {...a11yProps(2)} />
          </Tabs>
		  <h2 className={styles.h2}>Weather Data for {cityName}, {stateName}</h2>
          <TabPanel value={value} index={0}>
            <CurrentConditions data={weatherData} isDaytime={isDaytime} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WeatherGraph data={weatherData} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <HourlyForecast data={weatherData} />
          </TabPanel>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
}
