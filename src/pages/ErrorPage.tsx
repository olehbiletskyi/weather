import React, { FC } from 'react'
import {  Grid, Typography } from '@mui/material'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

const ErrorPage: FC = () => {
  return (
    <Grid container sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SentimentDissatisfiedIcon color={'info'} fontSize={'large'} sx={{ fontSize: '5rem', mb: '5rem' }}/>
      <Typography variant={'h1'} sx={{ mb: '3rem' }}>Oops!</Typography>
      <Typography variant={'h2'} component={'p'}>Sorry, something went wrong...</Typography>
    </Grid>
  )
}

export default ErrorPage