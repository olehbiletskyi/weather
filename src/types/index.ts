interface ISystem {
  country: string
  sunrise: string
  sunset: string
}

interface ICoordinates {
  lon: number
  lat: number
}

interface IWeatherItem {
  id: number
  main: string
  description: string
  icon: string
}

interface IWeather extends Array<IWeatherItem> {}

interface IMain {
  temperature: string
  feels_like: string
  pressure: string
  humidity: string
}

interface IWind {
  speed: number
}

interface IClouds {
  all: number
}

interface ICityWeather {
  name: string
  code: number
  id: number
  timezone: string
  sys: ISystem
  coord: ICoordinates
  weather: IWeather
  main: IMain
  visibility: number
  wind: IWind
  clouds: IClouds
}

export { IClouds, IMain, IWind, IWeatherItem, IWeather, ISystem, ICoordinates, ICityWeather }
