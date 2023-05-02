import React, { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Typography, Grid } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import AttributionIcon from '@mui/icons-material/Attribution'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import TireRepairIcon from '@mui/icons-material/TireRepair'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import AirIcon from '@mui/icons-material/Air'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import WbTwilightIcon from '@mui/icons-material/WbTwilight'
import { useAppDispatch, useAppSelector } from 'hooks'
import { cityByIdSelector } from 'store/citiesSelector/citiesSelector'
import { fetchCity } from 'store/citiesSlice/citiesSlice'
import { IndicatorItemWrapper, Loader } from 'components'
import { parseTimestamp } from 'utils'

const DetailPage: FC = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const cityIdFromSearchParams = searchParams.get('cityId') || ''
  const cityNameFromSearchParams = searchParams.get('cityName') || ''

  const city = useAppSelector(cityByIdSelector(cityIdFromSearchParams))

  if (!city) {
    dispatch(fetchCity({ cityName: cityNameFromSearchParams }))
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

      <IndicatorItemWrapper>
        <DeviceThermostatIcon color={'error'} sx={{ width: '40px', height: '40px', mr: '5px' }} />
        <Typography variant='h5' component='div'>
          Temperature: {city?.main?.temp}&#8451;
        </Typography>
      </IndicatorItemWrapper>

      <IndicatorItemWrapper>
        <AttributionIcon color={'success'} sx={{ width: '40px', height: '40px', mr: '5px' }} />
        <Typography variant='h5' sx={{ fontStyle: 'italic' }} component='div'>
          Real feel: {city?.main?.feels_like}&#8451;
        </Typography>
      </IndicatorItemWrapper>

      <IndicatorItemWrapper>
        <CloudQueueIcon color={'info'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <Typography variant='h5' component='div'>
          Clouds: {city?.clouds?.all} %
        </Typography>
      </IndicatorItemWrapper>

      <IndicatorItemWrapper>
        <InvertColorsIcon color={'info'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <Typography variant='h5' component='div'>
          Humidity: {city?.main?.humidity} %
        </Typography>
      </IndicatorItemWrapper>

      <IndicatorItemWrapper>
        <TireRepairIcon color={'error'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <Typography variant='h5' component='div'>
          Pressure: {city?.main?.pressure} hPa.
        </Typography>
      </IndicatorItemWrapper>

      <IndicatorItemWrapper>
        <DirectionsCarIcon color={'info'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <Typography variant='h5' component='div'>
          Visibility: {city?.visibility} m.
        </Typography>
      </IndicatorItemWrapper>

      <IndicatorItemWrapper>
        <AirIcon color={'warning'} sx={{ width: '40px', height: '40px', mr: 2 }} />
        <Typography variant='h5' component='div'>
          Wind speed: {city?.wind?.speed} m/s.
        </Typography>
      </IndicatorItemWrapper>

      <IndicatorItemWrapper>
        <WbSunnyIcon sx={{ width: '40px', height: '40px', mr: 2, color: '#ffcc00' }} />
        <Typography variant='h5' component='div'>
          Sunrise: {parseTimestamp(city?.sys?.sunrise)} <i>(Kyiv timezone)</i>
        </Typography>
      </IndicatorItemWrapper>

      <IndicatorItemWrapper>
        <WbTwilightIcon sx={{ width: '40px', height: '40px', mr: 2, color: '#bd7c00' }} />
        <Typography variant='h5' component='div'>
          Sunset: {parseTimestamp(city?.sys?.sunset)} <i>(Kyiv timezone)</i>
        </Typography>
      </IndicatorItemWrapper>
    </Grid>
  )
}

export default DetailPage
