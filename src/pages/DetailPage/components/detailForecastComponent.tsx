import { Grid } from '@mui/material'
import Chart from './chart'
import React from 'react'

const DetailForecastComponent = ({
  list,
}: {
  list: Array<{
    dt: number
    dt_txt: string
    temperature: number
    feelsLike: number
  }>
}) => {
  const predefinedArr = list.slice(0, 9).map((item) => {
    const time = item.dt_txt.slice(-8, -3)
    return {
      name: `${time}`,
      temp: +item.temperature.toFixed(1),
    }
  })

  return (
    <Grid container sx={{ justifyContent: 'center' }}>
      <Chart data={predefinedArr} />
    </Grid>
  )
}

export default DetailForecastComponent
