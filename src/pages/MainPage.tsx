import React, { FC } from 'react'
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import ThunderstormSharpIcon from '@mui/icons-material/ThunderstormSharp'

const MainPage: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <WbSunnyIcon />
          <Typography variant='h6' component='div' marginX={'10px'}>
                Weather forecast
          </Typography>
          <ThunderstormSharpIcon />
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography variant='h6' component='div'>Main page</Typography>
      </Box>
    </Box>
  )
}

export default MainPage