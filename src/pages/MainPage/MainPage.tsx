import React, { FC, useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'hooks'
import { allCitiesSelector } from 'store/citiesSelector/citiesSelector'
import {
  initializeCitiesController,
  cancelError,
  fetchCityAsync,
} from 'store/citiesSlice/citiesSlice'
import { ErrorAlert, Loader } from 'components'
import WelcomeText from './components/welcomeText'
import CardsContainer from './components/cardsContainer'
import AddNewCityBtn from './components/addNewCityBtn'
import { statuses } from 'constants/statuses'

const MainPage: FC = () => {
  const [showErrorMsg, setShowErrorMsg] = useState(false)

  const dispatch = useAppDispatch()

  const { citiesController, cities, status, error } = useAppSelector(allCitiesSelector)

  useEffect(() => {
    document.title = 'Current weather'
  }, [])

  useEffect(() => {
    dispatch(initializeCitiesController({}))
  }, [])

  useEffect(() => {
    if (citiesController) {
      const citiesControllerCopy = [...citiesController]
      citiesControllerCopy.forEach((item) => {
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
      {cities.length === 0 && <WelcomeText text={'Add cities to track the weather'} />}

      {error && (
        <ErrorAlert message={error} isOpen={showErrorMsg} handleClose={handleCloseErrorMsg} />
      )}

      {status === statuses.PENDING && <Loader />}

      <CardsContainer cities={cities} />

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
