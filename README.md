# Weather App

## Description
A Next.js application for displaying weather data including current conditions, hourly forecasts, and weather graphs.  As a proof of concept, this project circumvents the usage of the built-in classes MaterialUI provides and instead implements a traditional approach of standard CSS.

## Features
- Simple layout with large text that can be easily used on Raspberry Pi screens.
- Current conditions tab at top for quick information about the weather right now
- Hourly forecast for an entire week
- 7-Day weather graph that plots hourly forecasts onto a graph

## Future implementations
- Switch to another part of the API provided by weather.gov, and gain access to more detailed information such as cloud cover and visibility
- Switch current conditions from estimated temperature at location to real data at the nearest weather station
- Edit CSS classes to work with MaterialUI classes
- After API change, display a "detailedForecast" at the bottom of the current conditions, for when user wants information quickly 
- Improve type/font sizing, quality and consistency throughout site
- Experiment with other components in MaterialUI to improve UX
- Display current weather watches and warnings at a quick glance
- Separate graph data into multiple graphs based on unit of measure, i.e °F, %, mph, etc.
- Create vertical striping of colors in weekly forecast table to ensure accurate reading
- Find a new icons for each of the categories on this page (https://www.weather.gov/forecast-icons/) to replace the low-quality images provided by the API
- Find colors, wallpapers, or animated background appropriate for each of the said weather conditions, changing based on the current conditions outside
- Make mobile-friendly version, or look into creating a version in React Native
- Create "current location" button to allow for anyone to use on hosted site
- Integrate into larger Home Center project, which will store all useful information in an "Event Hub"


