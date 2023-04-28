import React, { FC } from 'react'
import { Box, Grid } from '@mui/material'
import { AddNewCityBtn, CityCard } from '../components'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const MainPage: FC = () => {
  return (
    <Box component='main' sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {arr?.map((city) => {
          return <CityCard key={city} id={city} />
        })}
      </Grid>
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
