import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material'
import { paths } from 'constants/paths'

interface IProps {
  id: number
}

const CityCard = ({ id }: IProps) => {
  console.log(id)
  const navigate = useNavigate()

  const [cityId, setCityId] = useState(id)

  const goToDetailPage = (id: number): () => void => () => {
    navigate(`/${paths.DETAIL}?cityId=${cityId}&cityName=Paris` )
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            City:
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
          <Button size='small' onClick={goToDetailPage(cityId)}>
            See More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default CityCard
