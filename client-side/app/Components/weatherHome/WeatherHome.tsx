import { fromUnixTime, format } from 'date-fns';
import {
  WiDaySunny,
  WiCloud,
  WiStrongWind,
  WiThermometer,
  WiDust,
  WiRaindrop,
} from 'react-icons/wi';
import { useState, useEffect } from 'react';
import {
  getCurrentCityForecastData,
  type OpenWeatherForecastResponse,
} from '../../api/openWeatherApi.js';
import { Bounce, toast } from 'react-toastify';

export interface MappedWeatherData {
  currentCity: {
    city: string;
  };
  forecast: ForecastDisplayItem[];
}

export interface ForecastDisplayItem {
  day: string; // e.g. "Mon"
  date: string; // e.g. "23 July"
  dateLong: string; // e.g. "23 July, Sunday 12:00"
  weather: string; // or a custom type if WeatherTypeMap has known keys
  minTemp: number;
  maxTemp: number;
  humidity: string;
  pressure: string;
  temp: number;
  grnd_level: string;
  water: string;
  wind: string;
}

enum WeatherType {
  SUNNY = 'sunny',
  CLOUDY = 'cloudy',
}

const WeatherTypeMap = {
  '10n': WeatherType.SUNNY,
  '10d': WeatherType.SUNNY,
  '04d': WeatherType.CLOUDY,
  '04n': WeatherType.CLOUDY,
  '01n': WeatherType.CLOUDY,
};

const getWeatherIcon = (size = 24, color = '#fff') => {
  return {
    [WeatherType.SUNNY]: (
      <WiDaySunny size={size} color={color} style={{ margin: 'auto' }} />
    ),
    [WeatherType.CLOUDY]: (
      <WiCloud size={size} color={color} style={{ margin: 'auto' }} />
    ),
  };
};

const sampleData = {
  currentCity: {
    date: '23 July, Sunday 12:00',
    city: 'Sydney',
    minTemp: '28',
    maxTemp: '32',
    weather: WeatherType.SUNNY,
    water: '85%',
    wind: '9km/h',
    uv: '7tug',
    something: '26',
  },
  forecast: [
    {
      day: 'Monday',
      date: '24 July',
      weather: WeatherType.CLOUDY,
      minTemp: '20',
      maxTemp: '25',
    },
    {
      day: 'Tuesday',
      date: '25 July',
      weather: WeatherType.CLOUDY,
      minTemp: '20',
      maxTemp: '25',
    },
    {
      day: 'Wednesday',
      date: '26 July',
      weather: WeatherType.CLOUDY,
      minTemp: '20',
      maxTemp: '25',
    },
    {
      day: 'Thursday',
      date: '27 July',
      weather: WeatherType.CLOUDY,
      minTemp: '20',
      maxTemp: '25',
    },
  ],
  otherCities: [
    {
      city: 'Melbourne',
      weather: WeatherType.SUNNY,
      minTemp: '25',
      maxTemp: '32',
    },
    {
      city: 'Shanghai',
      weather: WeatherType.SUNNY,
      minTemp: '25',
      maxTemp: '32',
    },
    {
      city: 'New York',
      weather: WeatherType.SUNNY,
      minTemp: '25',
      maxTemp: '32',
    },
    {
      city: 'London',
      weather: WeatherType.SUNNY,
      minTemp: '25',
      maxTemp: '32',
    },
  ],
};

export function WeatherHome() {
  const [data, setData] = useState<MappedWeatherData>();
  const [searchCity, setSearchCity] = useState<string>('');

  const getWeatherData = async (city: string = 'Sydney') => {
    const weatherData = await getCurrentCityForecastData(city).catch((err) => {
      toast.error('City not found', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      return;
    });
    if (!weatherData?.data) {
      return;
    }
    const resultData = mapData(weatherData.data);
    setData(resultData);
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  const mapData = (data: OpenWeatherForecastResponse): MappedWeatherData => {
    // return 5 days data from now on
    const filteredData = data.list
      .filter((item) => {
        return item.dt_txt.includes('12:00:00');
      })
      .map((item: any) => {
        const date = fromUnixTime(Number(item.dt));

        return {
          day: format(date, 'EEEE'),
          date: format(date, 'dd LLLL'),
          dateLong: format(date, 'hh:mm a'),
          weather: WeatherTypeMap[item.weather[0].icon],
          minTemp: parseInt(item.main.temp_min),
          maxTemp: parseInt(item.main.temp_max),
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          temp: parseInt(item.main.temp),
          grnd_level: item.main.grnd_level,
          water: item.main.sea_level,
          wind: item.wind.speed,
        };
      });

    return {
      currentCity: {
        city: data.city.name,
      },
      forecast: filteredData,
    };
  };

  const onSearchCity = () => {
    console.log('fire');
    getWeatherData(searchCity);
  };

  if (!data) {
    return <>Loading...</>;
  }

  return (
    <main
      className='flex items-center justify-center pt-16 pb-4 text-black'
      style={{
        minHeight: '100vh',
        backgroundColor: '#624adc',
      }}
    >
      <div
        className='flex gap-5 p-6 rounded-xl'
        style={{ backgroundColor: '#f2f2fc' }}
      >
        <div
          style={{ backgroundColor: '#4382f7' }}
          className='rounded-xl text-white p-4'
        >
          <p className='text-xs'>{`${data.forecast[0].date}, ${data.forecast[0].day} ${data.forecast[0].dateLong}`}</p>
          <p className='text-center text-2xl py-5'>{data.currentCity.city}</p>
          <p className='text-center text-6xl'>{data.forecast[0].maxTemp}</p>
          <p className='text-center text-xs'>
            {data.forecast[0].minTemp + '~' + data.forecast[0].maxTemp}
          </p>
          <p className='text-center pt-5 pb-7'>
            {getWeatherIcon(175)[data.forecast[0].weather]}
          </p>
          <div className='flex justify-center bg-white text-black gap-2 p-3 rounded-lg'>
            <div>
              <WiRaindrop size={50} color={'#000'} />
              <p>{data?.forecast[0].water}</p>
            </div>
            <div>
              <WiStrongWind size={50} color={'#000'} />
              <p>{data.forecast[0].wind}</p>
            </div>
            <div>
              <WiDust size={50} color={'#000'} />
              <p>{data.forecast[0].pressure}</p>
            </div>
            <div>
              <WiThermometer size={50} color={'#000'} />
              <p>{data.forecast[0].temp}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex justify-between'>
            {data?.forecast?.slice(1, 5)?.map((item) => {
              return (
                <div key={item.date} className='text-center'>
                  <p className='font-bold'>{item.day}</p>
                  <p className='text-xs'>{item.date}</p>
                  <p className='mt-4'>
                    {getWeatherIcon(100, '#000')[item.weather]}
                  </p>
                  <p className='text-xs'>{item.minTemp + '~' + item.maxTemp}</p>
                </div>
              );
            })}
          </div>
          <div className='mt-30'>
            <div className='mb-5 relative' style={{ width: '80%' }}>
              <input
                type='text'
                placeholder='Search for a city'
                className='input-default'
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              ></input>
              <button
                type='button'
                className='button-default cursor-pointer me-1.5'
                onClick={onSearchCity}
              >
                Search
              </button>
            </div>
            <div className='flex gap-5 text-white justify-between'>
              {sampleData.otherCities.map((item) => {
                return (
                  <div
                    key={item.city}
                    style={{ backgroundColor: '#4382f7' }}
                    className='rounded-xl p-3 text-center'
                  >
                    <p>{getWeatherIcon(40)[item.weather]}</p>
                    <p className='font-bold mt-2'>{item.city}</p>
                    <p className='text-xs'>
                      {item.minTemp + '~' + item.maxTemp}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
