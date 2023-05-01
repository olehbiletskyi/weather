import React, { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { AddNewCityBtn, CityCard } from 'components'
import { useAppSelector } from 'hooks'
import { allCitiesSelector } from 'store/citiesSelector/citiesSelector'

const MainPage: FC = () => {
  const { cities, status, error } = useAppSelector(allCitiesSelector) // get all cities from redux
  console.log('status', status)
  console.log('cities', cities)
  console.log('error', error)

  return (
    <Box component='main' sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {cities?.map((item) => {
          return <CityCard key={item.id} data={item} />
        })}
      </Grid>

      {error && (
        <Grid container spacing={2} justifyContent={'center'}>
          <Typography variant={'h3'}>An error occured: {error}</Typography>
        </Grid>
      )}

      {status === 'pending' && (
        <Grid container spacing={2} justifyContent={'center'}>
          <Typography variant={'h3'}>Loading...</Typography>
        </Grid>
      )}

      <Grid
        container
        sx={{ height: '6rem', mt: '2rem', justifyContent: 'center', alignItems: 'center' }}
      >
        <AddNewCityBtn />
      </Grid>
    </Box>
  )
}

export default MainPage
