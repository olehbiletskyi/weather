import React, { FC } from 'react'
import { Box, Grid } from '@mui/material'

interface IProps {
  children: JSX.Element | JSX.Element[]
}

const WeatherIndicatorItemWrapper: FC<IProps> = ({ children }) => {
  return (
    <Grid container sx={{ alignItems: 'center', justifyContent: 'center', mb: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>{children}</Box>
    </Grid>
  )
}

export default WeatherIndicatorItemWrapper
