import React, { FC } from 'react'
import { Box, Grid } from '@mui/material'
import { AddNewCityBtn, CityCard } from 'components'
import { useAppSelector } from 'hooks'
import { allCitiesSelector } from 'store/citiesSelector/citiesSelector'

const MainPage: FC = () => {
  const cities = useAppSelector(allCitiesSelector) // get all cities from redux

  return (
    <Box component='main' sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {cities?.cities?.map((item) => {
          return <CityCard key={item.id} id={item.id} name={item.name} />
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
