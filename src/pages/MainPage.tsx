import React, { FC, useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { AddNewCityBtn, CityCard, ErrorAlertDialog, Loader } from 'components'
import { useAppDispatch, useAppSelector } from 'hooks'
import { allCitiesSelector } from 'store/citiesSelector/citiesSelector'
import { initializeCitiesController, cancelError, fetchCityAsync } from 'store/citiesSlice/citiesSlice'

const MainPage: FC = () => {
  const [showErrorMsg, setShowErrorMsg] = useState(false)

  const dispatch = useAppDispatch()

  const { citiesController, cities, status, error } = useAppSelector(allCitiesSelector) // get all cities from redux

  console.log('citiesController', citiesController)

  useEffect(() => {

    dispatch(initializeCitiesController({}))
  }, [])


  useEffect(() => {
    if(citiesController) {
      citiesController.forEach((item) => {
        dispatch(fetchCityAsync({ cityName: item }))
      })
    }
  }, [citiesController])

  useEffect(() => {
    if (error) {
      setShowErrorMsg(true)
    }
  }, [error])

  const handleCloseErrorMsg = () => {
    setShowErrorMsg(false)
    dispatch(cancelError({}))
  }

  return (
    <Box component='main' sx={{ p: 3 }}>
      {cities.length === 0 && (
        <Typography
          sx={{ textAlign: 'center', mt: '2rem' }}
          variant={'h5'}
          component={'h3'}
          color={'grey'}
        >
          Add cities to track the weather
        </Typography>
      )}

      {error && (
        <ErrorAlertDialog
          message={'City not found or an error occurred!'}
          isOpen={showErrorMsg}
          handleClose={handleCloseErrorMsg}
        />
      )}

      {status === 'pending' && <Loader />}

      <Grid container spacing={2}>
        {cities?.map((item) => {
          return <CityCard key={item.id} data={item} />
        })}
      </Grid>

      <Grid
        container
        sx={{ height: '6rem', mt: '2rem', justifyContent: 'center', alignItems: 'center' }}
      >
        <AddNewCityBtn />
      </Grid>
    </Box>
  )
}

export default MainPage
