export interface IGetAllDataResponse {
	[key: string]: {
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
}

export interface IGetAllDataResponseData {
	date: string
	new_cases: number
	new_cases_per_million: number
	stringency_index: number
	total_cases: number
	total_cases_per_million: number

	hosp_patients: number
	hosp_patients_per_million: number
	icu_patients: number
	icu_patients_per_million: number
	new_cases_smoothed: number
	new_cases_smoothed_per_million: number
	new_deaths: number
	new_deaths_per_million: number
	new_deaths_smoothed: number
	new_deaths_smoothed_per_million: number
	total_deaths: number
	total_deaths_per_million: number
	weekly_hosp_admissions: number
	weekly_hosp_admissions_per_million: number
	weekly_icu_admissions: number
	weekly_icu_admissions_per_million: number
}
