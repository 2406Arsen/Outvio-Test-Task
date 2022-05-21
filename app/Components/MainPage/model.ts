import { IGetAllDataResponse, IGetAllDataResponseData } from '../../api/model'

export interface IMainPageProps {
	allData: IGetAllDataResponse
}

export interface ICountrySelectProps {
	allData: IGetAllDataResponse
	allCountries: string[]
}
export interface IChartsProps {
	allData: IGetAllDataResponse
	allCountries: string[]
	setActiveTab: React.Dispatch<React.SetStateAction<string>>
	activeTab: string
}
export interface IRankedChartsProps {
	allData: IGetAllDataResponse
	allCountries: string[]
}

export type TFilteredCountries = {
	aged_65_older: number
	aged_70_older: number
	continent: string
	diabetes_prevalence: number
	gdp_per_capita: number
	life_expectancy: number
	location: string
	median_age: number
	population: number
	population_density: number
	data: IGetAllDataResponseData[]
}
