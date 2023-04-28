import { Button, Typography } from '@mui/material'
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const AddNewCityBtn = () => {
  return (
    <Button variant={'contained'} color={'info'} sx={{ height: '80px', width: '300px' }}>
      <AddCircleIcon fontSize={'large'} sx={{ mr: '1rem' }} />
      <Typography variant={'h6'}>Add city</Typography>
    </Button>
  )
}

export default AddNewCityBtn
