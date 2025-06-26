import React from 'react';
import { getWeatherIcon } from '../WeatherHome/WeatherHome';
import type { ForecastDisplayItem } from 'app/@type/weatherDataTypes';

interface IForecastCard {
  data: ForecastDisplayItem;
}

const ForecastCard = (props: IForecastCard) => {
  const { date, day, weather, minTemp, maxTemp } = props.data;
  return (
    <div className='text-center'>
      <p className='font-bold'>{day}</p>
      <p className='text-xs'>{date}</p>
      <p className='mt-4'>{getWeatherIcon(100, '#000')[weather]}</p>
      <p className='text-xs'>{minTemp + '~' + maxTemp}</p>
    </div>
  );
};

export default ForecastCard;
