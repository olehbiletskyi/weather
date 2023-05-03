import React from 'react'
import { Typography } from '@mui/material'

interface IProps {
  text: string
}

const WelcomeText = ({ text }: IProps) => {
  return (
    <Typography
      sx={{ textAlign: 'center', mt: '2rem' }}
      variant={'h5'}
      component={'h3'}
      color={'grey'}
    >
      {text}
    </Typography>
  )
}

export default WelcomeText
