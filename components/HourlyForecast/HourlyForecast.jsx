import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { format } from 'date-fns';
import styles from './HourlyForecast.module.css'

const HourlyForecast = ({ data }) => {
	const groupedByDay = data.properties.periods.reduce((acc, period) => {
		const date = new Date(period.startTime).toLocaleDateString();
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(period);
		return acc;
	}, {});
	
	return (
		<div className={styles.hourlyForecastContainer}>
			{Object.keys(groupedByDay).map((date) => (
				<Accordion sx={{ backgroundColor:'hsl(191, 56%, 91%)'}} key={date} className={styles.hourlyForecastAccordion}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<h3 className={`${styles.hourlyForecastTypography} hourlyForecastTypography`}>{format(date, 'EEEE, MMMM do')}</h3>
					</AccordionSummary>
					<AccordionDetails className={styles.hourlyForecastTableContainer}>
						<table className={styles.hourlyForecastTable}>
							<thead>
								<tr className={styles.tr}>
									<th className={styles.th}>Time</th>
									<th className={styles.th}>Forecast</th>
									<th className={styles.th}>Temp</th>
									<th className={styles.th}>Precip</th>
									<th className={styles.th}>Dewpoint</th>
									<th className={styles.th}>Humid</th>
									<th className={styles.th}>Wind</th>
								</tr>
							</thead>
							<tbody>
								{groupedByDay[date].map((period) => (
									<tr className={styles.tr} key={period.number}>
										<td className={styles.td}>{new Date(period.startTime).toLocaleTimeString([], { hour: 'numeric' })} - {new Date(period.endTime).toLocaleTimeString([], { hour: 'numeric' })} (+{period.number -1}:00)</td>
										<td className={styles.td}>{period.shortForecast}</td>
										<td className={styles.td}>{period.temperature}°{period.temperatureUnit}</td>
										<td className={styles.td}>{period.probabilityOfPrecipitation?.value || '0'}%</td>
										<td className={styles.td}>{period.dewpoint?.value * 1.8 + 32}°{period.temperatureUnit}</td>
										<td className={styles.td}>{period.relativeHumidity?.value}%</td>
										<td className={styles.td}>{period.windSpeed === '0 mph' ? 'Calm' : period.windSpeed} {period.windDirection}</td>
									</tr>
								))}
							</tbody>
						</table>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};

export default HourlyForecast;
