import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

// get all cities
const allCitiesSelector = (state: RootState) => state.cities

// get city by ID
const cityByIdSelector = (id: number | string) =>
  createSelector([allCitiesSelector], (cities) => {
    return cities.cities.find((item) => item.id === +id)
  })

// get detail forecast
const getDetailForecastSelector = (state: RootState) => state.cities.detailForecast

export { allCitiesSelector, cityByIdSelector, getDetailForecastSelector }
