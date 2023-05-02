import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICityWeather } from 'types'
import { fetchCityByName } from 'services'
import { addCityToLocalStorage, deleteCityFromLocalStorage, getCitiesFromLocalStorage } from 'utils'

const enum statusEnum {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

type statusTypes = `${statusEnum}`

type initialStateType = {
  citiesController: Array<string>
  cities: Array<ICityWeather>
  status: statusTypes
  error: any // todo
}

const initialState: initialStateType = {
  citiesController: [],
  cities: [],
  status: 'idle',
  error: null,
}

const fetchCityAsync = createAsyncThunk(
  'cities/fetchCityAsync',
  async (thunkArg: { cityName: string }, thunkAPI) => {
    try {
      const response = await fetchCityByName(thunkArg.cityName)
      if (!response.ok) {
        throw new Error('Server Error!') // todo
      }
      const data = await response.json()
      thunkAPI.dispatch(addCity({ ...data }))
      // addCityToLocalStorage('Cities', data.name)
      return data
    } catch (error: any) {
      // todo
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

const updateCityAsync = createAsyncThunk(
  'cities/updateCityAsync',
  async (thunkArg: { cityName: string }, thunkAPI) => {
    try {
      const response = await fetchCityByName(thunkArg.cityName)
      if (!response.ok) {
        throw new Error('Server Error!') // todo
      }
      const data = await response.json()
      thunkAPI.dispatch(updateCity({ ...data }))
      return data
    } catch (error: any) {
      // todo
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

// const fetchDetailForecast = createAsyncThunk() // todo

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    initializeCitiesController(state, action) {
      const citiesFromLocalStorage = getCitiesFromLocalStorage('Cities')
      console.log('cities while init Controller', citiesFromLocalStorage)
      if(citiesFromLocalStorage) {
        state.citiesController = citiesFromLocalStorage
      }
    },
    addCity(state, action) {
      state.cities.push(action.payload)
      state.citiesController.push(action.payload.name)
      addCityToLocalStorage('Cities', action.payload.name)
    },
    updateCity(state, action) {
      state.cities.forEach((item) => (item.id !== action.payload.id ? item : action.payload))
    },
    removeCity(state, action: PayloadAction<{ id: number }>) {
      const deletedCity = state.cities.find((item) => item.id === action.payload.id)
      state.cities = state.cities.filter((item) => item.id !== action.payload.id)
      if(deletedCity) {
        deleteCityFromLocalStorage('Cities', deletedCity?.name)
      }

    },
    cancelError(state, action) {
      state.error = null
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    // fetchCityAsync
    builder.addCase(fetchCityAsync.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    builder.addCase(fetchCityAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.error = null
    })
    builder.addCase(fetchCityAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    // updateCityAsync
    builder.addCase(updateCityAsync.pending, (state, action) => {
      state.status = 'pending'
      state.error = null
    })
    builder.addCase(updateCityAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.error = null
    })
    builder.addCase(updateCityAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
  },
})

export { fetchCityAsync,updateCityAsync }

export const { initializeCitiesController, addCity, updateCity, removeCity, cancelError } = citiesSlice.actions

export default citiesSlice
