import React from 'react';
import styles from './CurrentConditions.module.css';
import CategorizeWeather from '../../utils/CategorizeWeather';
import WeatherCategoryIcons from '../../utils/WeatherCategoryIcons';

//TODO: Create Icons for each of the following on this page: https://www.weather.gov/forecast-icons/

const CurrentConditions = (props) => {

	const { data, isDaytime, weatherIconDescription } = props;

	if (!data || !data.properties || data.properties.periods.length === 0) {
		return <p>No current conditions available.</p>;
	}
	console.log(weatherIconDescription);
	const period = data.properties.periods[0];
	const weatherKey = CategorizeWeather(period.shortForecast);
	const timeOfDay = isDaytime ? 'day' : 'night';
	const iconClass = WeatherCategoryIcons[weatherKey]?.[timeOfDay] || 'wi-day-sunny';

	return (
		<div className={styles.currentConditionsContainer}>
			<div>
				<i className={`wi ${iconClass} ${styles.iconLarge}`}></i>
			</div>
			<div>
				<p className={styles.shortForecastText}>{period.shortForecast}</p>
				<p className={styles.text}><b>Temperature:</b> {period.temperature}°{period.temperatureUnit}</p>
				<p className={styles.text}><b>Relative Humidity:</b> {period.relativeHumidity?.value}%</p>
				<p className={styles.text}><b>Dewpoint:</b> {(period.dewpoint.value * 1.8 + 32).toFixed(0)}°F</p>
				<p className={styles.text}><b>Wind:</b> {period.windSpeed === '0 mph' ? 'Calm' : period.windSpeed} {period.windDirection}</p>
			</div>
		</div>
	);
};

export default CurrentConditions;

