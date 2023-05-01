import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material'
import { paths } from 'constants/paths'
import { useAppDispatch } from 'hooks'
import { removeCity } from 'store/citiesSlice/citiesSlice'
import { ICityWeather } from 'types'

interface IProps {
  data: ICityWeather
}

const CityCard = ({ data }: IProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // const [cityId, setCityId] = useState(id)

  const goToDetailPage = () => {
    navigate(`/${paths.DETAIL}?cityId=${data.id}&cityName=${data.name}`)
  }
  const removeCityHandler = () => dispatch(removeCity({ id: data.id }))

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card sx={{ boxShadow: 6 }}>
        <CardContent>
          <Grid container sx={{ justifyContent: 'start', width: '100%' }}>
            <Typography variant='h5' component='div' sx={{ fontWeight: 600 }}>
              {data.name}
            </Typography>
          </Grid>
          <Typography color='text.secondary'>
            Country: {data.sys.country}
          </Typography>
          <Grid container sx={{ my: 2 }}>
            <Typography color='text.primary' variant='body1' sx={{ fontSize: '20px' }}>{data.weather[0].description.toUpperCase()}</Typography>
          </Grid>
          <Grid container sx={{  mb: 2 }}>
            <Grid container sx={{  mb: 1 }}>
              <Typography variant='body1' sx={{ mr: 1, fontWeight: 500, color: '#ff0000' }}>Temperature:</Typography>
              <Typography variant='body1' sx={{ fontWeight: 600 }}>{data.main.temp}&#8451;</Typography>
            </Grid>
            <Grid container>
              <Typography variant='body1' sx={{ mr: 1, fontWeight: 500, color: '#ff0000' }}>Real feel:</Typography>
              <Typography variant='body1' sx={{ fontWeight: 600 }}>{data.main.feels_like}&#8451;</Typography>
            </Grid>
          </Grid>
          <Typography variant='body1' sx={{ color: '#007bbd', fontWeight: 500 }}>Humidity: {data.main.humidity}%</Typography>
        </CardContent>

        <CardActions sx={{ width: '100%', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          <Button size='small' onClick={removeCityHandler} variant='outlined' color={'error'}>
            DELETE
          </Button>
          <Button size='small' onClick={goToDetailPage} variant='outlined' color={'success'}>
          See More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default CityCard
