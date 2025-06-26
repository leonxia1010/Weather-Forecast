export enum WeatherType {
  SUNNY = 'sunny',
  CLOUDY = 'cloudy',
}

export const WeatherTypeMap = {
  '10n': WeatherType.SUNNY,
  '10d': WeatherType.SUNNY,
  '04d': WeatherType.CLOUDY,
  '04n': WeatherType.CLOUDY,
  '01n': WeatherType.SUNNY,
};
