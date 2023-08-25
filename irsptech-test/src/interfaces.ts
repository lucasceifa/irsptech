export interface iUsers {
	id: string
	name: string
	username: string
	email: string
	adress: iAdress
	phone: string
	website: string
	company: iCompany
}

export interface iAdress {
	street: string
	suite: string
	city: string
	zipcode: string
	geo: iGeo
}

export interface iCompany {
	name: string
	catchPhrase: string
	bs: string
}

interface iGeo {
	lat: string
	lng: string
}