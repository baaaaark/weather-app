const CategorizeWeather = (condition) => {
    
    const lowerCaseCondition = condition.toLowerCase();
    
    if (lowerCaseCondition.includes('a few clouds') || lowerCaseCondition.includes('mostly sunny')|| lowerCaseCondition.includes('mostly clear')) {
    
        if (lowerCaseCondition.includes('windy')) {
            return "A_FEW_CLOUDS_WINDY";
        }
        return "A_FEW_CLOUDS";
    }

    if (lowerCaseCondition.includes('fair') || lowerCaseCondition.includes('clear') || lowerCaseCondition.includes('sunny')) {
        return "CLEAR";
    }
    
    if (lowerCaseCondition.includes('partly cloudy')) {

        if (lowerCaseCondition.includes('windy')) {
            return "PARTLY_CLOUDY_WINDY";
        }
        return "PARTLY_CLOUDY";
    }
    
    if (lowerCaseCondition.includes('mostly cloudy')) {
    
        if (lowerCaseCondition.includes('windy')) {
            return "MOSTLY_CLOUDY_WINDY";
        }
        return "MOSTLY_CLOUDY";
    }
    
    if (lowerCaseCondition.includes('overcast')) {

        if (lowerCaseCondition.includes('windy')) {
            return "OVERCAST_WINDY";
        }
        return "OVERCAST";
    }
    
    if (lowerCaseCondition.includes('freezing rain') || lowerCaseCondition.includes('freezing drizzle')) {
        
        if (lowerCaseCondition.includes('snow')) {
            return "FREEZING_RAIN_SNOW_MIX";
        }

        return "FREEZING_RAIN";
    }

    if (lowerCaseCondition.includes('light') || lowerCaseCondition.includes('drizzle')) {
        return "LIGHT_RAIN";
    }

    if (lowerCaseCondition.includes('snow')) {

        if (lowerCaseCondition.includes('ice')) {
            return "SNOW_ICE_MIX";
        }

        return "SNOW";
    }
    
    if (lowerCaseCondition.includes('rain')) {

        const wordArray = lowerCaseCondition.split(' ');
        const rainCount = wordArray.filter(word => word === 'rain').length;
    
        if (rainCount >= 2 || (lowerCaseCondition.includes('freezing drizzle') && lowerCaseCondition.includes('rain'))) {
            return "RAIN_FREEZING_RAIN_MIX";
        }
        
        if (lowerCaseCondition.includes('snow')) {
            return "RAIN_SNOW_MIX";
        }

        if (lowerCaseCondition.includes('ice')) {
            return "RAIN_ICE_MIX";
        }

        if (lowerCaseCondition.includes('fog')) {
            return "RAIN_FOG_MIX";
        }

        return "RAIN";
    
    }

    if (lowerCaseCondition.includes('ice') || lowerCaseCondition.includes('hail')) {
        return "ICE";
    }
    
    if (lowerCaseCondition.includes('showers in vicinity')) {
        return "SHOWERS_IN_VICINITY";
    }
    
    if (lowerCaseCondition.includes('thunderstorm')) {
    
        if (lowerCaseCondition.includes('thunderstorm in vicinity')) {
            return "THUNDERSTORM_IN_VICINITY";
        }

        return "THUNDERSTORM";
    }

    if (lowerCaseCondition.includes('funnel cloud') || lowerCaseCondition.includes('tornado')) {
        return "TORNADO";
    }

    if (lowerCaseCondition.includes('tropical storm') || lowerCaseCondition.includes('hurricane')) {
        return "TROPICAL_STORM";
    }

    if (lowerCaseCondition.includes('windy') || lowerCaseCondition.includes('breezy')) {
        return "WINDY";
    }

    if (lowerCaseCondition.includes('dust') || lowerCaseCondition.includes('sand')) {
        return "DUST";
    }

    if (lowerCaseCondition.includes('smoke')) {
        return "SMOKE";
    }

    if (lowerCaseCondition.includes('haze')) {
        return "HAZE";
    }

    if (lowerCaseCondition.includes('hot')) {
        return "HOT";
    }

    if (lowerCaseCondition.includes('cold')) {
        return "COLD";
    }

    if (lowerCaseCondition.includes('blizzard')) {
        return "BLIZZARD";
    }

    if (lowerCaseCondition.includes('fog')) {
        return "FOG";
    }

    return "UNKNOWN";
    
};

export default CategorizeWeather;
