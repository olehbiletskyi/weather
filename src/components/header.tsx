import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import ThunderstormSharpIcon from '@mui/icons-material/ThunderstormSharp'
import { paths } from 'constants/paths'

const Header = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate(`/${paths.MAIN}`)
  }
  return (
    <AppBar sx={{ height: '5.5rem' }} position={'static'}>
      <Toolbar sx={{ justifyContent: 'center', height: 'inherit' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={goToHome}>
          <WbSunnyIcon fontSize={'large'} />
          <Typography
            variant={'h4'}
            component={'span'}
            sx={{ marginX: '1.5rem', textAlign: 'center' }}
          >
            Current Weather
          </Typography>
          <ThunderstormSharpIcon fontSize={'large'} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
