import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material'
import { paths } from 'constants/paths'
import { useAppDispatch } from 'hooks'
import { removeCity } from 'store/citiesSlice/citiesSlice'

interface IProps {
  id: number
  name: string
}

const CityCard = ({ id, name }: IProps) => {
  console.log(name)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // const [cityId, setCityId] = useState(id)

  const goToDetailPage = () => {
    navigate(`/${paths.DETAIL}?cityId=${id}&cityName=${name}`)
  }
  const removeCityHandler = () => dispatch(removeCity({ id }))

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            City: {id % 1000}
          </Typography>
          <Typography variant='h5' component='div'>
            Paris
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            France
          </Typography>
          <Typography variant='body2'>It will be sunny and hot. No windy.</Typography>
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
