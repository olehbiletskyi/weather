import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICityWeather } from 'types'
import { fetchCityByName } from 'services'
import { addCityToLocalStorage, deleteCityFromLocalStorage } from 'utils'

const enum statusEnum {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

type statusTypes = `${statusEnum}`

type initialStateType = {
  cities: Array<ICityWeather>
  status: statusTypes
  error: any // todo
}

const initialState: initialStateType = {
  cities: [],
  status: 'idle',
  error: null,
}

export const fetchCity = createAsyncThunk(
  'cities/fetchCity',
  async (thunkArg: { cityName: string }, thunkAPI) => {
    try {
      const response = await fetchCityByName(thunkArg.cityName)
      if (!response.ok) {
        throw new Error('Server Error!') // todo
      }
      const data = await response.json()
      addCityToLocalStorage('Cities', data.name)

      return data
    } catch (error: any) {
      // todo
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const updateCity = createAsyncThunk(
  'updateCities/fetchCity',
  async (thunkArg: { cityName: string }, thunkAPI) => {
    try {
      const response = await fetchCityByName(thunkArg.cityName)
      if (!response.ok) {
        throw new Error('Server Error!') // todo
      }
      return await response.json()
    } catch (error: any) {
      // todo
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    removeCity(state, action: PayloadAction<{ id: number }>) {
      const deletedCity = state.cities.find((item) => item.id === action.payload.id)
      state.cities = state.cities.filter((item) => item.id !== action.payload.id)
      deleteCityFromLocalStorage('Cities', deletedCity?.name || '')
    },
    cancelError(state, action) {
      state.error = null
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.cities.push(action.payload)
      state.status = 'succeeded'
      state.error = null
    })
    builder.addCase(fetchCity.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    builder.addCase(fetchCity.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(updateCity.fulfilled, (state, action) => {
      state.cities.forEach((item) => (item.id === action.payload.id ? item : action.payload))
      state.status = 'succeeded'
      state.error = null
    })
    builder.addCase(updateCity.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    builder.addCase(updateCity.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
  },
})

export const { removeCity, cancelError } = citiesSlice.actions

export default citiesSlice
