import { IGetAllDataResponseData } from '../../../api/model'

export interface IMainState {
	isLoading: boolean
	mode: 'light' | 'dark'
	data: {
		selectedCountry: IMainStateDataSelectedCountry
	}
}
export interface IMainStateDataSelectedCountry {
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

	extreme_poverty?: number
	female_smokers?: number
	hospital_beds_per_thousand?: number
	human_development_index?: number
	male_smokers?: number
}
