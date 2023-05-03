import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCityByName } from 'services'
import { statuses } from 'constants/statuses'
import { addCityToLocalStorage, deleteCityFromLocalStorage, getCitiesFromLocalStorage } from 'utils'
import { ICityWeather } from 'types'

type statusTypes = `${statuses}`

type stateType = {
  citiesController: Array<string>
  cities: Array<ICityWeather>
  status: statusTypes
  error: any
}

const initialState: stateType = {
  citiesController: [],
  cities: [],
  status: statuses.IDLE,
  error: null,
}

const fetchCityAsync = createAsyncThunk(
  'cities/fetchCityAsync',
  async (thunkArg: { cityName: string }, thunkAPI: any) => {
    // why any?  - cause there is some troubles with thunkApi
    // https://redux-toolkit.js.org/usage/usage-with-typescript
    // (`Also, as TS cannot mix explicit and inferred generic parameters,
    // from this point on you'll have to define the Returned and ThunkArg generic parameter as well.`)
    try {
      const state = thunkAPI.getState()
      const isHasCity = state?.cities?.cities.some(
        (item: ICityWeather) => item.name === thunkArg.cityName,
      )
      if (!isHasCity) {
        const response = await fetchCityByName(thunkArg.cityName)
        if (!response.ok) {
          throw new Error('Server error or the city was not found!')
        }
        const data = await response.json()
        thunkAPI.dispatch(addCity({ ...data }))
        return data
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

const updateCityAsync = createAsyncThunk(
  'cities/updateCityAsync',
  async (thunkArg: { cityName: string }, thunkAPI: any) => {
    // why any?  - cause there is some troubles with thunkApi
    // https://redux-toolkit.js.org/usage/usage-with-typescript
    try {
      const response = await fetchCityByName(thunkArg.cityName)
      if (!response.ok) {
        throw new Error('Server Error!')
      }
      const data = await response.json()
      thunkAPI.dispatch(updateCity({ ...data }))
      return data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

// const fetchDetailForecast = createAsyncThunk() // todo for future

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    initializeCitiesController(state, action) {
      const citiesFromLocalStorage = getCitiesFromLocalStorage('Cities')
      if (citiesFromLocalStorage) {
        state.citiesController = citiesFromLocalStorage
      }
    },
    addCity(state, action) {
      const isHasAlreadyNewCityAtStore = state.cities.some((item) => item.id === action.payload.id)
      if (!isHasAlreadyNewCityAtStore) {
        state.cities.push(action.payload)
        if (!state.citiesController.includes(action.payload.name)) {
          state.citiesController.push(action.payload.name)
        }
        addCityToLocalStorage('Cities', action.payload.name)
      }
    },
    updateCity(state, action) {
      state.cities.forEach((item) => (item.id !== action.payload.id ? item : action.payload))
    },
    removeCity(state, action: PayloadAction<{ id: number }>) {
      const deletedCity = state.cities.find((item) => item.id === action.payload.id)
      if (deletedCity) {
        state.cities = state.cities.filter((item) => item.id !== action.payload.id)
        state.citiesController = state.citiesController.filter((item) => item !== deletedCity.name)
        deleteCityFromLocalStorage('Cities', deletedCity?.name)
      }
    },
    generateError(state, action) {
      state.error = action.payload.title
      state.status = statuses.FAILED
    },
    cancelError(state, action) {
      state.error = null
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    // fetchCityAsync
    builder.addCase(fetchCityAsync.pending, (state, action) => {
      state.status = statuses.PENDING
      state.error = null
    })
    builder.addCase(fetchCityAsync.fulfilled, (state, action) => {
      state.status = statuses.SUCCEEDED
      state.error = null
    })
    builder.addCase(fetchCityAsync.rejected, (state, action) => {
      state.status = statuses.FAILED
      state.error = action.payload
    })
    // updateCityAsync
    builder.addCase(updateCityAsync.pending, (state, action) => {
      state.status = statuses.PENDING
      state.error = null
    })
    builder.addCase(updateCityAsync.fulfilled, (state, action) => {
      state.status = statuses.SUCCEEDED
      state.error = null
    })
    builder.addCase(updateCityAsync.rejected, (state, action) => {
      state.status = statuses.FAILED
      state.error = action.payload
    })
  },
})

export { fetchCityAsync, updateCityAsync }

export const {
  initializeCitiesController,
  addCity,
  updateCity,
  removeCity,
  generateError,
  cancelError,
} = citiesSlice.actions

export default citiesSlice
