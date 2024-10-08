import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import styles from './WeatherGraph.module.css'

Chart.register(...registerables);
//TODO: Separate out graphs into appropriate categories (one graph for temp, one for percent-based values, etc.)
const WeatherGraph = ({ data }) => {
	const periods = data.properties.periods;
	const labels = periods.map(period => new Date(period.startTime));
	const temperatures = periods.map(period => period.temperature);
	const dewPoints = periods.map(period => period.dewpoint.value * 1.8 + 32);
	const precipitationChances = periods.map(period => period.probabilityOfPrecipitation.value);
	const windSpeeds = periods.map(period => {
		const match = period.windSpeed.match(/\d+/);
		return match ? parseInt(match[0], 10) : 0;
	});

	const [dayRange, setDayRange] = useState(1);

	const handleSliderChange = (event, newValue) => {
		setDayRange(newValue);
	};
	
	const remifyFont = (remSize) => {
		return parseFloat(getComputedStyle(document.body).fontSize) * remSize;
	}

	const filteredLabels = labels.slice(0, dayRange * 24);
	const filteredTemperatures = temperatures.slice(0, dayRange * 24);
	const filteredDewPoints = dewPoints.slice(0, dayRange * 24);
	const filteredPrecipitationChances = precipitationChances.slice(0, dayRange * 24);
	const filteredWindSpeeds = windSpeeds.slice(0, dayRange * 24);

	const [datasetsVisibility, setDatasetsVisibility] = useState({
		temperature: true,
		dewPoint: true,
		precipitation: true,
		windSpeed: true,
	});

	const handleToggle = (dataset) => {
		setDatasetsVisibility(prevState => ({
			...prevState,
			[dataset]: !prevState[dataset],
		}));
	};

	const dataConfig = {
		labels: filteredLabels.map(date => format(date, 'EEE, MMM do h a')),
		datasets: [
			{
				label: 'Temperature (°F)',
				data: datasetsVisibility.temperature ? filteredTemperatures : [],
				borderColor: 'red',
				fill: false,
				yAxisID: 'y-axis-1',
			},
			{
				label: 'Dew Point (°F)',
				data: datasetsVisibility.dewPoint ? filteredDewPoints : [],
				borderColor: 'blue',
				fill: false,
				yAxisID: 'y-axis-1',
			},
			{
				label: 'Precipitation Chance (%)',
				data: datasetsVisibility.precipitation ? filteredPrecipitationChances : [],
				borderColor: 'green',
				fill: false,
				yAxisID: 'y-axis-2',
			},
			{
				label: 'Wind Speed (mph)',
				data: datasetsVisibility.windSpeed ? filteredWindSpeeds : [],
				borderColor: 'orange',
				fill: false,
				yAxisID: 'y-axis-2',
			},
		],
	};

	const options = {
		scales: {
			x: {
				display: true,
				title: {
					type: 'time',
					font: {
						size: remifyFont(1.1),
					},
				},
				ticks: {
					font: {
						size: remifyFont(0.9),
					},
					maxTicksLimit: Math.ceil(filteredLabels.length),
				},
			},
			
			'y-axis-1': {
				type: 'linear',
				display: true,
				position: 'left',
				title: {
					display: true,
					text: 'Temp / Dewpoint (°F)',
					font: {
						size: remifyFont(1),
					},
				},
				ticks: {
					font: {
						size: remifyFont(0.9),
					},
				},
			},
			'y-axis-2': {
				type: 'linear',
				display: true,
				position: 'right',
				title: {
					display: true,
					text: 'Precip (%) / Wind Spd (mph)',
					font: {
						size: remifyFont(1),
					},
				},
				ticks: {
					font: {
						size: remifyFont(0.9),
					},
				},
				grid: {
					drawOnChartArea: true,
				},
			},
		},
		responsive: true,
		plugins: {
			legend: {
				display: true,
				labels: {
					font: {
						size: remifyFont(1.1),
					},
				},
				onClick: (e, legendItem) => {
					const index = legendItem.datasetIndex;
					const meta = e.chart.getDatasetMeta(index);
					meta.hidden = !meta.hidden;
					e.chart.update();
				},
			},
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 1.0)',
				titleFont: {
					size: remifyFont(1.2),
				},
				bodyFont: {
					size: remifyFont(1),
				},
				padding: remifyFont(0.8),
				boxPadding: remifyFont(0.2),
				cornerRadius: remifyFont(0.4),
			}
		},
	};

	return (
		<div className={styles.weatherGraphContainer}>
			<Box sx={{ width: '75%', textAlign: 'center'}}>
				<h3 className={styles.weatherGraphTypography}>Day Range</h3>
				<Slider
					value={dayRange}
					onChange={handleSliderChange}
					min={1}
					max={7}
					step={1}
					slotProps={{
						markLabel: { 
							style: { 
								fontSize: '1.35rem'
							}
						}
					}}
					marks={Array.from({ length: 7 }, (_, i) => ({
						value: i + 1,
						label: format(new Date(labels[i * 24]), 'EEE dd'),
					}))}
				/>
			</Box>
			<Typography className={styles.weatherGraphLegendInstruction}>Click on the appropriate-colored box below to remove or add the line from the graph</Typography>
			<Line data={dataConfig} options={options} />
		</div>
	);
};

export default WeatherGraph;
