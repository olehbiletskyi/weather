import { BASE_URL } from 'constants/urls'

const fetchCityByName = (cityName: string) => {
  return fetch(`${BASE_URL}?q=${cityName}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
}

export { fetchCityByName }
