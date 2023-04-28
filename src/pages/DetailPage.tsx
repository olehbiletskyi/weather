import React, { FC } from 'react'
import {  Box, Toolbar, Typography } from '@mui/material'

const DetailPage: FC = () => {
  return (
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      <Typography variant='h6' component='div'>Detail page</Typography>
    </Box>
  )
}

export default DetailPage