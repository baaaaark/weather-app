import React from 'react';
import styles from './CurrentConditions.module.css';

//TODO: Create Icons for each of the following on this page: https://www.weather.gov/forecast-icons/

const CurrentConditions = ({ data }) => {
	if (!data || data.properties.periods.length === 0) {
		return <p>No current conditions available.</p>;
	}

	const period = data.properties.periods[0];

	return (
		<div className={styles.currentConditionsContainer}>
			<div>
				<img src={period.icon} alt="weather icon" className={styles.icon} />
			</div>
			<div className={styles.conditionsTextContainer}>
				<p className={styles.shortForecastText}>{period.shortForecast}</p>
				<div>
					<p className={styles.text}><b>Temperature:</b> {period.temperature}°{period.temperatureUnit}</p>
					<p className={styles.text}><b>Relative Humidity:</b> {period.relativeHumidity?.value}%</p>
					<p className={styles.text}><b>Dewpoint:</b> {(period.dewpoint.value * 1.8 + 32).toFixed(0)}°F</p>
					<p className={styles.text}><b>Wind:</b> {period.windSpeed === '0 mph' ? 'Calm' : period.windSpeed} {period.windDirection}</p>
				</div>
			</div>
		</div>
	);
};

export default CurrentConditions;

