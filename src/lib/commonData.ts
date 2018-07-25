export const SDGArray = [
	{ ico: 'nopoverty', title: 'NO POVERTY' },
	{ ico: 'zerohunger', title: 'ZERO HUNGER' },
	{ ico: 'goodhealth', title: 'GOOD HEALTH AND WELL-BEING' },
	{ ico: 'qualityeducation', title: 'QUALITY EDUCATION' },
	{ ico: 'genderequality', title: 'GENDER EQUALITY' },
	{ ico: 'cleanwater', title: 'CLEAN WATER AND SANITATION' },
	{ ico: 'affordableenergy', title: 'AFFORDABLE AND CLEAN ENERGY' },
	{ ico: 'decentwork', title: 'DECENT WORK AND ECONOMIC GROWTH' },
	{ ico: 'industry', title: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE' },
	{ ico: 'reduced', title: 'REDUCED INEQUALITIES' },
	{ ico: 'sustainablecities', title: 'SUSTAINABLE CITIES AND COMMUNITIES' },
	{ ico: 'consumption', title: 'RESPONSIBLE CONSUMPTION AND PRODUCTION' },
	{ ico: 'climateaction', title: 'CLIMATE ACTION' },
	{ ico: 'lifebelowwater', title: 'LIFE BELOW WATER' },
	{ ico: 'lifeonland', title: 'LIFE ON LAND' },
	{ ico: 'peace', title: 'PEACE, JUSTICE AND STRONG INSTITUTIONS' },
	{ ico: 'partnership', title: 'PARTNERSHIPS FOR THE GOALS' }
];

export const deviceWidth = {
	mobile: '576',
	tablet: '768',
	desktop: '992',
	desktopLarge: '1200',
};
export const imgArray = () => {
	const tempArray: string[] = [];
	for (let i = 0; i < 9; i++) {
		tempArray[i] = require(`../assets/images/image${i + 1}.jpg`);
	}
	return tempArray;
};
export const iconUpload = () => {
	return require(`../assets/images/icon-upload.svg`);
};
export const SocialMediaLinks = ['http://www.instagram.com', 'http://www.twitter.com', 'http://www.facebook.com', 'http://www.website.com'];
const countryLatLng = require('../lib/maps/countryLatLng.json');
var isoCountriesTmp = {};
var isoCountriesLatLngTmp = {};

countryLatLng.map( (value) => {
	isoCountriesTmp[value.alpha2] = value.country;
	isoCountriesLatLngTmp[value.alpha2] = {lat: value.latitude, lng: value.longitude};
});

export const isoCountries = isoCountriesTmp;
export const isoCountriesLatLng = isoCountriesLatLngTmp;

// tslint:disable-next-line:max-line-length
export const testProjectData = JSON.stringify(require('./json/project.json'));
export const blankProjectData = JSON.stringify(require('./json/blankProject.json'));

export const claimJson = JSON.stringify(require('./json/claimForm.json'));
export const onboardJson = JSON.stringify(require('./json/onboardingForm.json'));
export const testClaimSchema = JSON.stringify(require('./json/claimSchema.json'));
export const agentJson = JSON.stringify(require('./json/agentForm.json'));

export const testClaimForm = '{}';
export const testAgentData = '{"email":"don@ixo.com","name":"Don","role":"EA","agentDid":"did:sov:Tp25vz5iHoLJ4ktk7pKYC6","projectDid":"did:ixo:3vDYCPWvwCsj9Co3RqXp3z"}';
export const testSig = {
	type: 'ed25519-sha-256',
	created: '2018-06-06T09:18:47Z',
	creator: 'did:sov:Tp25vz5iHoLJ4ktk7pKYC6',
	publicKey: 'BGcahyLmkPeuteRemDXMUPu1W9Tc6ghuCSud4mD7fTG3',
	signatureValue: '6A548060AEB78449D17C1B825F941028728ADBBD5A4952CDF7782F128B2582A648D0697670AA3164434B8C27D18FDC213333DE7A8ADC574940B509B6B2AD590E'
};
export const formJson = {
	'fields': [
		{
			'label': 'Name',
			'name': 'name',
			'type': 'text'
		},
		{
			'label': 'Number',
			'name': 'Number',
			'type': 'number'
		},
		{
			'label': 'theimage',
			'name': 'theimage',
			'type': 'image'
		},
		{
			'label': 'Owner email',
			'name': 'email',
			'type': 'text'
		},
		{
			'label': 'About',
			'name': 'about',
			'type': 'textarea'
		},
		{
			'label': 'Country',
			'name': 'country',
			'type': 'country'
		},
		{
			'label': 'Agent Template',
			'name': 'agentTemplate.name',
			'type': 'template'
		},
		{
			'label': 'Attended School',
			'name': 'attended',
			'type': 'select',
			'options': [
				{
					'label': 'Yes',
					'value': 'true'
				},
				{
					'label': 'No',
					'value': 'false'
				}
			]
		}
	]
};