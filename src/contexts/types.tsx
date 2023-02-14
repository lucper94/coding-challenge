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
	"location":location
}

export interface  locat{
	"id": string,
	"name": string,
	"country": string
}

export type Prueba = {
	campuses:campuses[]
	locations:locat[]
	country:country
	setCountry:(country:country) => void
}