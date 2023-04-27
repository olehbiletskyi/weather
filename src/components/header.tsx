import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import ThunderstormSharpIcon from '@mui/icons-material/ThunderstormSharp'

const Header = () => {
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <WbSunnyIcon />
        <Typography variant='h6' component='div' marginX={'10px'}>
            Weather forecast
        </Typography>
        <ThunderstormSharpIcon />
      </Toolbar>
    </AppBar>
  )
}

export default Header