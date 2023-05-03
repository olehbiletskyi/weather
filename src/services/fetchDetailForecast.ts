import { SECONDARY_URL } from 'constants/urls'
import { ICoordinates } from 'types'

const fetchDetailForecast = ({ lat, lon }: ICoordinates) => {
  return fetch(
    `${SECONDARY_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
  )
}

export { fetchDetailForecast }
