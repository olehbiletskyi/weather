import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICityWeather } from 'types'

type initialStateType = {
  cities: Array<ICityWeather>
}

const initialState: initialStateType = {
  cities: [],
}

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    getAllCities(state, action) {
      return state
    },
    getCityById(state, action) {
      return state
    },
    addNewCity(state, action: PayloadAction<ICityWeather>) {
      state.cities.push(action.payload)
    },
    updateCity(state, action) {
      return state
    },
    removeCity(state, action: PayloadAction<{ id: number }>) {
      console.log(state, action)
      state.cities = state.cities.filter((item) => item.id !== action.payload.id)
    },
  },
})

export const { getAllCities, getCityById, addNewCity, updateCity, removeCity } = citiesSlice.actions

export default citiesSlice
