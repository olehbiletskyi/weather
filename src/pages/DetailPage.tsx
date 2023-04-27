import React, { FC } from 'react'
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material'

const DetailPage: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar>
        <Toolbar />
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography variant='h6' component='div'>Detail page</Typography>
      </Box>
    </Box>
  )
}

export default DetailPage