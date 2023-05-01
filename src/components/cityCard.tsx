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
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            City: {data.id % 1000}
          </Typography>
          <Typography variant='h5' component='div'>
            {data.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {data.sys.country}
          </Typography>
          <Typography variant='body2'>{data.main.temp}</Typography>
          <Typography variant='body2'>{data.main.feels_like}</Typography>
          <Typography variant='body2'>{data.weather[0].description}</Typography>
          <Typography variant='body2'>{data.main.humidity}</Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={goToDetailPage}>
            See More
          </Button>
          <Button size='small' onClick={removeCityHandler} variant={'contained'} color={'error'}>
            DELETE
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default CityCard
