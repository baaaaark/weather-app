# Weather App

## Description
A Next.js application for displaying weather data including current conditions, hourly forecasts, and weather graphs.  As a proof of concept, this project circumvents the usage of the built-in classes MaterialUI provides and instead implements a traditional approach of standard CSS.

## Features
- Simple layout which can be read on Raspberry Pi screens as small as 5" or 800px.
- Current conditions that provide simple weather information quickly
- Hourly forecast for an entire week to provide insight into any given hour of the next week
- 7-Day weather graph that plots hourly forecasts onto a graph, visualizing the data

## Future implementations
- Switch to another part of the API provided by weather.gov, and gain access to a text-based weather forecast descriptor
- Change "Current Conditions" tab to "At A Glance", adding "detailed forecast" descriptions for the rest of the week
- Integrate fully with MaterialUI, removing all or as many CSS modules as possible 
- Find colors, wallpapers, or animated background appropriate for each of the said weather conditions, changing based on the current conditions outside
- Further refine type/font sizing, quality and consistency throughout site
- Experiment with other components in MaterialUI to improve UX
- Display current weather watches and warnings at a quick glance
- Separate graph data into multiple graphs based on unit of measure, i.e °F, %, mph, etc.
- Create horizontal striping of colors for each row in weekly forecast table, to clarify reading
- Look into creating a version in React Native
- Integrate into larger Home Center project, which will store all useful information in an "Event Hub"


