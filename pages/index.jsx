import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HourlyForecast from '../components/HourlyForecast/HourlyForecast';
import WeatherGraph from '../components/WeatherGraph/WeatherGraph';
import CurrentConditions from '../components/CurrentConditions/CurrentConditions';
import styles from './index.module.css';

export default function Home() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [city, setCity] = useState();
  const [stateDesc, setStateDesc] = useState();
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const pointsResponse = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`);
        const hourlyForecastUrl = pointsResponse.data.properties.forecastHourly;
        const hourlyForecastResponse = await axios.get(hourlyForecastUrl);
        setCity(pointsResponse.data.properties.relativeLocation.properties.city);
        setStateDesc(pointsResponse.data.properties.relativeLocation.properties.state);
        setWeatherData(hourlyForecastResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        }, (error) => {
          console.error('Error getting current location:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getCurrentLocation();
  }, []);

  return (
    <div className={styles.indexContainer}>
      <h1 className={styles.h1}>Weather Data for {city}, {stateDesc}</h1>
      {weatherData ? (
        <div>
          <Accordion sx={{ backgroundColor: 'hsl(67, 56%, 91%)' }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.indexTypography} variant="h3">Current Conditions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CurrentConditions data={weatherData} />
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: 'hsl(67, 56%, 91%)' }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.indexTypography} variant="h3">GraphCast</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <WeatherGraph data={weatherData} />
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: 'hsl(67, 56%, 91%)' }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={styles.indexTypography} variant="h3">Seven Day Hourly Forecast</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <HourlyForecast data={weatherData} />
            </AccordionDetails>
          </Accordion>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
}
