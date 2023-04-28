import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import ThunderstormSharpIcon from '@mui/icons-material/ThunderstormSharp'

const Header = () => {
  return (
    <AppBar sx={{ height: '5.5rem' }} position={'static'}>
      <Toolbar sx={{ justifyContent: 'center', height: 'inherit' }}>
        <WbSunnyIcon fontSize={'large'} />
        <Typography variant={'h4'} component={'span'} sx={{ marginX: '1.5rem' }}>
          Weather forecast
        </Typography>
        <ThunderstormSharpIcon fontSize={'large'} />
      </Toolbar>
    </AppBar>
  )
}

export default Header
