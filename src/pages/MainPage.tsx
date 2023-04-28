import React, { FC } from 'react'
import { Box, Toolbar, Typography } from '@mui/material'

const MainPage: FC = () => {
  return (
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      <Typography variant='h6' component='div'>Main page</Typography>
    </Box>

  )
}

export default MainPage