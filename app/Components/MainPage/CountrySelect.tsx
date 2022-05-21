import React, { FC, memo } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { ICountrySelectProps } from './model'
import { shallowEqual, useDispatch } from 'react-redux'
import { useAppSelector } from '../../Redux/hook'
import { setCurrentCountry } from '../../Redux/features/Main/mainSlice'
import { IMainStateDataSelectedCountry } from '../../Redux/features/Main/model'

const CountrySelect: FC<ICountrySelectProps> = memo(({ allData, allCountries }): JSX.Element => {
  const dispatch = useDispatch()
  const {
    data: { selectedCountry },
    mode,
  } = useAppSelector(({ main }) => main, shallowEqual)

  return (
    <FormControl fullWidth sx={{ maxWidth: 1000, textAlign: 'center', with: '80%' }}>
      <InputLabel
        id='countriesSelect'
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
        labelId='countriesSelect'
        value={selectedCountry.location}
        label='Countries'
        onChange={(e) => {
          const selectedCountry = Object.keys(allData)
            .map((key) => allData[key])
            .find(({ location }) => location === e.target.value)
          dispatch(setCurrentCountry(selectedCountry as IMainStateDataSelectedCountry))
        }}>
        {allCountries?.map((country, i) => (
          <MenuItem value={country} key={i}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
})

export default CountrySelect
