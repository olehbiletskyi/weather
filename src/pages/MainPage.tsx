import React, { FC } from 'react'
import { Box, Grid } from '@mui/material'
import { CityCard } from '../components'



const arr = [1,2,3,4,5,6,7,8,9]

const MainPage: FC = () => {
  return (
    <Box component='main' sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {arr?.map(city => {
          return (
            <CityCard key={city} id={city}/>
          )
        } )}
      </Grid>
    </Box>
  )
}

export default MainPage
