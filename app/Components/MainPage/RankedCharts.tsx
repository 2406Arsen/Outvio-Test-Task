import React, { ChangeEvent, FC, memo, useEffect, useMemo, useState } from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { IRankedChartsProps, TFilteredCountries } from './model'

import classes from './Charts.module.scss'
import { useAppSelector } from '../../Redux/hook'
import { shallowEqual } from 'react-redux'

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
)
const RankedCharts: FC<IRankedChartsProps> = memo(({ allData, allCountries }): JSX.Element => {
  const { mode } = useAppSelector(({ main }) => main, shallowEqual)

  const [selectedCountryNames, setSelectedCountryNames] = useState<string[]>([])
  const [filteredCountries, setFilteredCountries] = useState<TFilteredCountries[]>([])
  const [currentChart, setCurrentChart] = useState('topCases')

  const [countriesWithMostCases, setCountriesWithMostCases] = useState<
		{
			totalDeaths: number
			totalCases: number
			countryName: string
		}[]
	>([])
  const [countriesWithMostDeaths, setCountriesWithMostDeaths] = useState<
		{
			totalDeaths: number
			totalCases: number
			countryName: string
		}[]
	>([])

  const data = useMemo(
    () => ({
      labels: selectedCountryNames,
      datasets: [
        {
          label: 'total cases',
          data: filteredCountries.map(({ data }) => data[data.length - 1].total_cases),
          backgroundColor: 'rgba(245, 133, 112,1)',
        },
      ],
    }),
    [selectedCountryNames, filteredCountries],
  )
  const data2 = useMemo(
    () => ({
      labels: selectedCountryNames,
      datasets: [
        {
          label: 'total deaths',
          data: filteredCountries.map(({ data }) => data[data.length - 1].total_deaths),
          backgroundColor: 'rgba(245, 133, 112,1)',
        },
      ],
    }),
    [filteredCountries, selectedCountryNames],
  )
  const data3 = useMemo(
    () => ({
      labels: countriesWithMostDeaths.map(({ countryName }) => countryName),
      datasets: [
        {
          label: 'top 10 deaths',
          data: countriesWithMostDeaths.map(({ totalDeaths }) => totalDeaths),
          backgroundColor: 'rgba(245, 133, 112,1)',
        },
      ],
    }),
    [countriesWithMostDeaths],
  )

  const data4 = useMemo(
    () => ({
      labels: countriesWithMostCases.map(({ countryName }) => countryName),
      datasets: [
        {
          label: 'top 10 cases',
          data: countriesWithMostCases.map(({ totalCases }) => totalCases),
          backgroundColor: 'rgba(245, 133, 112,1)',
        },
      ],
    }),
    [countriesWithMostCases],
  )

  useEffect(() => {
    const filteredData = Object.keys(allData).map((key) => ({
      totalCases: allData[key].data[allData[key].data.length - 1].total_cases,
      totalDeaths: allData[key].data[allData[key].data.length - 1].total_deaths,
      countryName: allData[key].location,
    }))

    const mostDeaths = filteredData.sort((a, b) => b.totalDeaths - a.totalDeaths).slice(0, 10)
    const mostCases = filteredData.sort((a, b) => b.totalCases - a.totalCases).slice(0, 10)

    setCountriesWithMostCases(mostCases)
    setCountriesWithMostDeaths(mostDeaths)
  }, [allData])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value)
    const filteredCountries: TFilteredCountries[] = Object.keys(allData)
      .filter((key) => e.target.value.includes(allData[key].location))
      .map((shortName) => allData[shortName])
    console.log(filteredCountries)
    setFilteredCountries(filteredCountries)
    setSelectedCountryNames(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
    )
  }

  const selectChartData = (): {
		labels: string[]
		datasets: {
			label: string
			data: number[]
			backgroundColor: string
		}[]
	} => {
    if (currentChart === 'cases') {
      return data
    } else if (currentChart === 'deaths') {
      return data2
    } else if (currentChart === 'topDeaths') {
      return data3
    } else {
      return data4
    }
  }

  return (
    <div>
      <Bar data={selectChartData()} />
      <div>
        <h3>Chart Controls:</h3>
        <div className={classes.rankedChartsControls}>
          <FormControl
            sx={{
              m: 2,
              maxWidth: 800,
              width: '80%',
              color: 'green',
            }}>
            <InputLabel
              id='demo-multiple-checkbox-label'
              sx={{
                color: mode === 'dark' ? ' white' : 'black',
                background: mode === 'dark' ? ' black' : 'white',
              }}>
							Countries
            </InputLabel>
            <Select
              sx={{
                color: mode === 'dark' ? 'white' : 'black',
                border: mode === 'dark' ? '1px solid white' : ' 1px solid black',
              }}
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={selectedCountryNames}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e) => handleChange(e as any)}
              input={<OutlinedInput label='Countries' />}
              renderValue={(selected) => selected.join(', ')}>
              {allCountries.map((country) => (
                <MenuItem key={country} value={country}>
                  <Checkbox
                    checked={selectedCountryNames.indexOf(country) > -1}
                  />
                  <ListItemText primary={country} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className={classes.switchRankedCharts}>
            <span id='cases' onClick={(e) => setCurrentChart(e.currentTarget.id)}>
							Total Cases
            </span>
            <span id='deaths' onClick={(e) => setCurrentChart(e.currentTarget.id)}>
							Total Deaths
            </span>
            <span id='topCases' onClick={(e) => setCurrentChart(e.currentTarget.id)}>
							Top 10 Cases
            </span>
            <span id='topDeaths' onClick={(e) => setCurrentChart(e.currentTarget.id)}>
							Top 10 Deaths
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default RankedCharts
