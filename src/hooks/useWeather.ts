import { LocationObject } from 'expo-location';
import { useEffect, useState } from 'react';

export interface WeatherInfo {
  weatherCode: string;
  temperature: string;
}

const WEATHER_CODE_MAP = {
  0: 'Clear sky',
  1: 'Cloudy',
  2: 'Cloudy',
  3: 'Cloudy',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Light rain',
  53: 'Light rain',
  55: 'Light rain',
  56: 'Light rain',
  57: 'Light rain',
  61: 'Rainy',
  63: 'Rainy',
  65: 'Rainy',
  66: 'Rainy',
  67: 'Rainy',
  71: 'Snow',
  73: 'Snow',
  75: 'Snow',
  77: 'Snow',
  80: 'Heavy rain',
  81: 'Heavy rain',
  82: 'Heavy rain',
  85: 'Heavy snow',
  86: 'Heavy snow',
  95: 'Thunderstorm',
  96: 'Heavy thunderstorm',
  99: 'Heavy thunderstorm',
};

export const useWeather = ({
  location,
}: {
  location: LocationObject | null;
}): WeatherInfo => {
  const [weatherCode, setWeatherCode] = useState('');
  const [temperature, setTemperature] = useState('');

  useEffect(() => {
    async function getWeatherData() {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location?.coords.latitude}&longitude=${location?.coords.longitude}&current=temperature_2m,precipitation,weather_code`;
      const response = await fetch(url);
      const weatherData = await response.json();
      console.log(weatherData);
      const code = weatherData?.current
        ?.weather_code as keyof typeof WEATHER_CODE_MAP;
      setWeatherCode(
        code !== undefined && code in Object.keys(WEATHER_CODE_MAP)
          ? WEATHER_CODE_MAP[code]
          : 'Unknown',
      );

      const temp = weatherData?.current?.temperature_2m;
      const tempUnit = weatherData?.current_units?.temperature_2m;
      setTemperature(temp + tempUnit);
    }
    if (location) {
      getWeatherData();
    }
  }, [location]);

  return {
    weatherCode,
    temperature,
  };
};
