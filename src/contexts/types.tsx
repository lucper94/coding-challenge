export interface country {
  "code": string,
  "name": string,
}

interface location {
	"id": string,
	"country": string
}

export interface campuses {
	"id": string,
	"name": string,
	"location":location,
	"cityCountry"?: string,
	"checked"?:boolean
}

export interface  locations{
	"id": string,
	"name": string,
	"country": string,
	"checked"?:boolean
}

export type ContextStates = {
	campuses:campuses[]
	locations:locations[]
	country:country
	setCountry:(country:country) => void,
	selectedLocations:string[], 
	setSelectedLocations:(a:string[]) => void,
	setProvider:(a:string) => void,
	provider:string,
	step:string, 
	setStep:(a:string) => void
}