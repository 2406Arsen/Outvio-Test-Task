import React, { FC, memo } from 'react'
import classes from './Charts.module.scss'

import { IChartsProps } from './model'
import RankedCharts from './RankedCharts'

import ReportedCasesCharts from './ReportedCasesCharts'

const Charts: FC<IChartsProps> = memo(
  ({ allData, allCountries, activeTab, setActiveTab }): JSX.Element => {
    return (
      <div className={classes.charts}>
        <div className={classes.charts__tabs}>
          <span
            id='reported'
            onClick={(e) => setActiveTab(e.currentTarget.id)}
            className={
              activeTab === 'reported'
                ? classes.charts__tabs__tab__active
                : classes.charts__tabs__tab
            }>
						Reported Cases
          </span>
          <span
            id='ranked'
            onClick={(e) => setActiveTab(e.currentTarget.id)}
            className={
              activeTab === 'ranked'
                ? classes.charts__tabs__tab__active
                : classes.charts__tabs__tab
            }>
						Ranked charts
          </span>
        </div>
        {activeTab === 'reported' ? (
          <ReportedCasesCharts />
        ) : (
          <RankedCharts allData={allData} allCountries={allCountries} />
        )}
      </div>
    )
  },
)

export default Charts
