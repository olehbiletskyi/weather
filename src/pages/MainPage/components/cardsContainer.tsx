import React from 'react'
import { Grid } from '@mui/material'
import CityCard from './cityCard'
import { ICityWeather } from 'types'

interface IProps {
  cities: ICityWeather[]
}

const CardsContainer = ({ cities }: IProps) => {
  return (
    <Grid container spacing={2}>
      {cities?.map((item: ICityWeather) => {
        return <CityCard key={item.id} data={item} />
      })}
    </Grid>
  )
}

export default CardsContainer
