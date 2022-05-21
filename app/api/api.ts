import axios from 'axios'
import { IGetAllDataResponse } from './model'

export const getAllData = (): Promise<IGetAllDataResponse> =>
  axios.get('https://covid.ourworldindata.org/data/owid-covid-data.json').then((res) => res.data)
