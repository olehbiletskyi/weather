import React from 'react'
import { Button, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useAppDispatch } from 'hooks'
import { fetchCity } from 'store/citiesSlice/citiesSlice'
import { ICityWeather } from 'types'

const AddNewCityBtn = () => {
  const data: ICityWeather = {
    id: Date.now(),
    main: {
      feels_like: '7',
      humidity: '7',
      pressure: '7',
      temp: '7',
    },
    name: 'Paris',
    sys: {
      country: '7',
      sunrise: '7',
      sunset: '7',
    },
    visibility: 7,
    timezone: '7',
    coord: {
      lon: 7,
      lat: 7,
    },
    clouds: {
      all: 7,
    },
    code: 7,
    weather: [
      {
        id: 7,
        main: '7',
        description: '7',
        icon: '7',
      },
    ],
    wind: {
      speed: 7,
    },
  }

  const dispatch = useAppDispatch()

  // const addNewCityHandler = () => dispatch(addNewCity({ ...data }))
  const addNewCityHandler = () => dispatch(fetchCity({ cityName: 'Kyiv' }))

  return (
    <Button
      variant={'contained'}
      color={'info'}
      sx={{ height: '80px', width: '300px' }}
      onClick={addNewCityHandler}
    >
      <AddCircleIcon fontSize={'large'} sx={{ mr: '1rem' }} />
      <Typography variant={'h6'}>Add city</Typography>
    </Button>
  )
}

export default AddNewCityBtn
