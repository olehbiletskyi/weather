import { combineReducers } from '@reduxjs/toolkit'
import citiesSlice from './citiesSlice/citiesSlice'

const rootReducer = combineReducers({
  [citiesSlice.name]: citiesSlice.reducer,
})

export default rootReducer
