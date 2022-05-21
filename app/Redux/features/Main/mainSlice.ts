import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMainState, IMainStateDataSelectedCountry } from './model'

const initialState: IMainState = {
  isLoading: false,
  mode: 'light',
  data: {
    selectedCountry: {
      aged_65_older: 0,
      aged_70_older: 0,
      continent: '',
      data: [],
      diabetes_prevalence: 0,
      gdp_per_capita: 0,
      life_expectancy: 0,
      location: '',
      median_age: 0,
      population: 0,
      population_density: 0,
    },
  },
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    changeMode: (state, { payload }: PayloadAction<'dark' | 'light'>) => {
      state.mode = payload
    },
    setCurrentCountry: (state, { payload }: PayloadAction<IMainStateDataSelectedCountry>) => {
      state.data.selectedCountry = payload
    },
  },
})

export const { setLoading, setCurrentCountry, changeMode } = mainSlice.actions

export const mainSelector = (state: IMainState): IMainState => state

export default mainSlice.reducer
