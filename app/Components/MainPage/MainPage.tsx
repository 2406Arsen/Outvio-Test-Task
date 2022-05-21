import React, { FC, memo, useState } from 'react'
import { useAppSelector } from '../../Redux/hook'
import { IMainPageProps } from './model'

import classes from './MainPage.module.scss'
import CountrySelect from './CountrySelect'
import Charts from './Charts'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { shallowEqual, useDispatch } from 'react-redux'
import { changeMode } from '../../Redux/features/Main/mainSlice'

const MainPage: FC<IMainPageProps> = memo(({ allData }): JSX.Element => {
  const { isLoading, mode } = useAppSelector(({ main }) => main, shallowEqual)
  const allCountries = Object.keys(allData).map((key) => allData[key].location)
  const [activeTab, setActiveTab] = useState('reported')
  const dispatch = useDispatch()

  return (
    <div className={mode === 'dark' ? classes.mainPage : classes.mainPageDark}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div
          className={
            mode === 'light'
              ? classes.mainPage__container
              : classes.mainPageDark__container
          }>
          {activeTab === 'reported' && (
            <CountrySelect allData={allData} allCountries={allCountries} />
          )}
          <Charts
            allData={allData}
            allCountries={allCountries}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
      <div>
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => dispatch(changeMode(mode === 'dark' ? 'light' : 'dark'))}
          color='inherit'>
          {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
    </div>
  )
})

export default MainPage
