import React, { FC, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Typography, Grid } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import AttributionIcon from '@mui/icons-material/Attribution'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import TireRepairIcon from '@mui/icons-material/TireRepair'
import AirIcon from '@mui/icons-material/Air'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import WbTwilightIcon from '@mui/icons-material/WbTwilight'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useAppDispatch, useAppSelector } from 'hooks'
import { cityByIdSelector, getDetailForecastSelector } from 'store/citiesSelector/citiesSelector'
import { fetchCityAsync, fetchDetailForecastAsync } from 'store/citiesSlice/citiesSlice'
import { Loader, TextH5 } from 'components'
import WeatherIndicatorItemWrapper from './components/weatherIndicatorItemWrapper'
import DetailForecastComponent from './components/detailForecastComponent'
import { parseTimestamp } from 'utils'

const DetailPage: FC = () => {
  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()

  const cityIdFromSearchParams = searchParams.get('cityId') || ''
  const cityNameFromSearchParams = searchParams.get('cityName') || ''

  useEffect(() => {
    document.title = `Current weather - ${cityNameFromSearchParams}`
  }, [cityNameFromSearchParams])

  const city = useAppSelector(cityByIdSelector(cityIdFromSearchParams))

  const { list } = useAppSelector(getDetailForecastSelector)

  useEffect(() => {
    if (city) {
      dispatch(fetchDetailForecastAsync({ coords: { ...city?.coord } }))
    }
  }, [city])

  if (!city) {
    dispatch(fetchCityAsync({ cityName: cityNameFromSearchParams }))
    return <Loader />
  }

  return (
    <Grid component='main' sx={{ p: 3 }}>
      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-around', mb: '10px' }}>
        <Typography variant='h2' component='div' sx={{ mb: 2 }}>
          {city?.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon color={'info'} sx={{ width: '40px', height: '40px', mr: 1 }} />
          <Typography variant='h5' component='i' sx={{ mr: 2 }}>
            lon: {city?.coord?.lon};
          </Typography>
          <Typography variant='h5' component='i'>
            lat: {city?.coord?.lat};
          </Typography>
        </Box>
      </Grid>

      <WeatherIndicatorItemWrapper>
        <DeviceThermostatIcon color={'error'} sx={{ width: '40px', height: '40px', mr: '5px' }} />
        <TextH5>Temperature: {city?.main?.temp}&#8451;</TextH5>
      </WeatherIndicatorItemWrapper>

      <WeatherIndicatorItemWrapper>
        <AttributionIcon color={'success'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <Typography variant='h5' sx={{ fontStyle: 'italic' }} component='div'>
          Real feel: {city?.main?.feels_like}&#8451;
        </Typography>
      </WeatherIndicatorItemWrapper>

      <WeatherIndicatorItemWrapper>
        <CloudQueueIcon color={'info'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <TextH5>Clouds: {city?.clouds?.all} %</TextH5>
      </WeatherIndicatorItemWrapper>

      <WeatherIndicatorItemWrapper>
        <InvertColorsIcon color={'info'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <TextH5>Humidity: {city?.main?.humidity} %</TextH5>
      </WeatherIndicatorItemWrapper>

      <WeatherIndicatorItemWrapper>
        <TireRepairIcon color={'error'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <TextH5>Pressure: {city?.main?.pressure} hPa.</TextH5>
      </WeatherIndicatorItemWrapper>

      <WeatherIndicatorItemWrapper>
        <VisibilityIcon color={'success'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <TextH5>Visibility: {city?.visibility} m.</TextH5>
      </WeatherIndicatorItemWrapper>

      <WeatherIndicatorItemWrapper>
        <AirIcon color={'warning'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <TextH5>Wind speed: {city?.wind?.speed} m/s.</TextH5>
      </WeatherIndicatorItemWrapper>

      <WeatherIndicatorItemWrapper>
        <WbSunnyIcon sx={{ width: '40px', height: '40px', mr: 2, color: '#ffcc00' }} />
        <TextH5>
          Sunrise: {parseTimestamp(city?.sys?.sunrise)} <i>(UTC timezone)</i>
        </TextH5>
      </WeatherIndicatorItemWrapper>

      <WeatherIndicatorItemWrapper>
        <WbTwilightIcon sx={{ width: '40px', height: '40px', mr: 2, color: '#FA5F55' }} />
        <TextH5>
          Sunset: {parseTimestamp(city?.sys?.sunset)} <i>(UTC timezone)</i>
        </TextH5>
      </WeatherIndicatorItemWrapper>

      <DetailForecastComponent list={list} />
    </Grid>
  )
}

export default DetailPage
