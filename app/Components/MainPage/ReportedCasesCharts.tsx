import React, { useEffect, useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useAppSelector } from '../../Redux/hook'
import { shallowEqual } from 'react-redux'
import classes from './Charts.module.scss'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const ReportedCasesCharts = (): JSX.Element => {
  const [countryNewCases, setCountryNewCases] = useState<number[]>([])
  const [currentChart, setCurrentChart] = useState('total')
  const [countryCases, setCountryCases] = useState<number[]>([])

  const { selectedCountry } = useAppSelector(({ main }) => main.data, shallowEqual)

  useEffect(() => {
    setCountryCases(
      selectedCountry.data.map(({ total_cases: totalCases }) =>
        totalCases === undefined ? 0 : totalCases,
      ),
    )
    setCountryNewCases(
      selectedCountry.data.map(({ new_cases: newCases }) =>
        newCases === undefined ? 0 : newCases,
      ),
    )
  }, [selectedCountry])
  const data = useMemo(
    () => ({
      labels: countryCases.map((_, i) => 'day ' + i),
      datasets: [
        {
          label: 'total cases',
          data: countryCases,
          fill: true,
          backgroundColor: 'transparent',
          borderColor: 'rgba(245, 133, 112,1)',
          pointStyle: 'circle',
          pointRadius: 0.5,
          pointBackgroundColor: 'rgba(245, 133, 112,1)',
        },
      ],
    }),
    [countryCases],
  )

  const data2 = useMemo(
    () => ({
      labels: countryNewCases.map((_, i) => 'day ' + i),
      datasets: [
        {
          label: 'new cases',
          data: countryNewCases,
          fill: true,
          backgroundColor: 'transparent',
          borderColor: '#47a17f',
          pointStyle: 'circle',
          pointRadius: 0.5,
          pointBackgroundColor: '#47a17f',
        },
      ],
    }),
    [countryNewCases],
  )
  return (
    <div>
      <Line data={currentChart === 'total' ? data : data2} />
      <div className={classes.switchCharts}>
        <span id='total' onClick={(e) => setCurrentChart(e.currentTarget.id)}>
					Total Cases
        </span>
        <span id='new' onClick={(e) => setCurrentChart(e.currentTarget.id)}>
					New Cases
        </span>
      </div>
    </div>
  )
}

export default ReportedCasesCharts
