import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, Card, CardContent, CardActions } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached'
import { removeCity, updateCityAsync } from 'store/citiesSlice/citiesSlice'
import { useAppDispatch } from 'hooks'
import { Button } from 'components'
import { paths } from 'constants/paths'
import { ICityWeather } from 'types'

interface IProps {
  data: ICityWeather
}

const CityCard = ({ data }: IProps) => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const goToDetailPage = () => {
    navigate(`/${paths.DETAIL}?cityId=${data.id}&cityName=${data.name}`)
  }
  const removeCityHandler = () => dispatch(removeCity({ id: data.id }))

  const updateCityWeatherInfo = () => {
    dispatch(updateCityAsync({ cityName: data.name }))
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={{ boxShadow: 6 }}>
        <CardContent sx={{ position: 'relative' }}>
          <CachedIcon
            sx={{
              position: 'absolute',
              right: '10px',
              top: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            color={'info'}
            onClick={updateCityWeatherInfo}
          />

          <Grid container sx={{ justifyContent: 'start', width: '100%' }}>
            <Typography variant='h5' component='div' sx={{ fontWeight: 600 }}>
              {data.name}
            </Typography>
          </Grid>
          <Typography color='text.secondary'>Country: {data.sys.country}</Typography>
          <Grid container sx={{ my: 2 }}>
            <Typography color='text.primary' variant='body1' sx={{ fontSize: '20px' }}>
              {data.weather[0].description.toUpperCase()}
            </Typography>
          </Grid>
          <Grid container sx={{ mb: 2 }}>
            <Grid container sx={{ mb: 1 }}>
              <Typography variant='body1' sx={{ mr: 1, fontWeight: 500, color: '#ff0000' }}>
                Temperature:
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                {data.main.temp}&#8451;
              </Typography>
            </Grid>
            <Grid container>
              <Typography variant='body1' sx={{ mr: 1, fontWeight: 500, color: '#ff0000' }}>
                Real feel:
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                {data.main.feels_like}&#8451;
              </Typography>
            </Grid>
          </Grid>
          <Typography variant='body1' sx={{ color: '#007bbd', fontWeight: 500 }}>
            Humidity: {data.main.humidity}%
          </Typography>
        </CardContent>

        <CardActions
          sx={{ width: '100%', justifyContent: 'space-between', boxSizing: 'border-box' }}
        >
          <Button
            onClick={removeCityHandler}
            variant='outlined'
            color={'error'}
            title={'Delete'}
          />

          <Button
              onClick={goToDetailPage}
              color={'success'}
              title={'See More'}
          />
        </CardActions>
      </Card>
    </Grid>
  )
}

export default CityCard
