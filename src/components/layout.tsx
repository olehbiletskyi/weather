import React, { FC, ReactNode } from 'react'
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import ThunderstormSharpIcon from '@mui/icons-material/ThunderstormSharp'

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
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
      {children}
    </Box>
  )
}

export default Layout