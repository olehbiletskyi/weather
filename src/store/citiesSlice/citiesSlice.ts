import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCityByName, fetchDetailForecast } from 'services'
import { statuses } from 'constants/statuses'
import { addCityToLocalStorage, deleteCityFromLocalStorage, getCitiesFromLocalStorage } from 'utils'
import { ICityWeather, ICoordinates } from 'types'

export interface IItem
  extends Pick<ICityWeather, 'clouds' | 'main' | 'sys' | 'visibility' | 'weather' | 'wind'> {
  dt: number
  dt_txt: string
}

type statusTypes = `${statuses}`

type stateType = {
  citiesController: Array<string>
  cities: Array<ICityWeather>
  detailForecast: detailForecastType
  status: statusTypes
  error: any
}

type detailForecastType = {
  cityName: string
  cityId: number
  list: Array<{
    dt: number
    dt_txt: string
    temperature: number
    feelsLike: number
  }>
}

const initialState: stateType = {
  citiesController: [],
  cities: [],
  detailForecast: {
    cityId: 0,
    cityName: '',
    list: [],
  },
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

const fetchDetailForecastAsync = createAsyncThunk(
  'cities/fetchDetailForecastAsync',
  async (thunkArg: { coords: ICoordinates }, thunkAPI: any) => {
    try {
      const response = await fetchDetailForecast(thunkArg.coords)
      if (!response.ok) {
        throw new Error('Server Error!')
      }
      const data = await response.json()
      thunkAPI.dispatch(addDetailForecast({ ...data }))
      return data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

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
    addDetailForecast(state, action) {
      state.detailForecast.cityName = action.payload.city.name
      state.detailForecast.cityId = action.payload.city.id
      state.detailForecast.list = action.payload.list.map((item: IItem) => {
        return {
          dt: item.dt,
          dt_txt: item.dt_txt,
          temperature: item.main.temp,
          feelsLike: item.main.temp,
        }
      })
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
    // updateCityAsync
    builder.addCase(fetchDetailForecastAsync.pending, (state, action) => {
      state.status = statuses.PENDING
      state.error = null
    })
    builder.addCase(fetchDetailForecastAsync.fulfilled, (state, action) => {
      state.status = statuses.SUCCEEDED
      state.error = null
    })
    builder.addCase(fetchDetailForecastAsync.rejected, (state, action) => {
      state.status = statuses.FAILED
      state.error = action.payload
    })
  },
})

export { fetchCityAsync, updateCityAsync, fetchDetailForecastAsync }

export const {
  initializeCitiesController,
  addCity,
  updateCity,
  removeCity,
  addDetailForecast,
  generateError,
  cancelError,
} = citiesSlice.actions

export default citiesSlice
