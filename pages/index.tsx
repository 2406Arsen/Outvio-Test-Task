import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllData } from '../app/api/api'
import { IGetAllDataResponse } from '../app/api/model'
import MainPage from '../app/Components/MainPage/MainPage'
import { setLoading } from '../app/Redux/features/Main/mainSlice'

const Home: NextPage = () => {
  const dispatch = useDispatch()

  const [allData, setAllData] = useState<IGetAllDataResponse>({})
  const fetchAllData = async (): Promise<IGetAllDataResponse | null> => {
    dispatch(setLoading(true))
    try {
      const res = await getAllData()
      setAllData(res)
      dispatch(setLoading(false))

      return res
    } catch (error) {
      dispatch(setLoading(false))
      return null
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  return (
    <>
      <Head>
        <title>Outvio Task</title>
      </Head>
      <MainPage allData={allData} />
    </>
  )
}

export default Home
