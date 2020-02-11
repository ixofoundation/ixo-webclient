import countryLatLng from '../lib/maps/countryLatLng.json'
import testProject from './json/project.json'
import blankProject from './json/blankProject.json'
import claimJsonData from './json/claimForm.json'
import onboardJsonData from './json/onboardingForm.json'
import testClaimSchemaData from './json/claimSchema.json'
import agentJsonData from './json/agentForm.json'

export const SDGArray = [
  {
    ico: 'nopoverty',
    title: 'NO POVERTY',
    url: 'https://www.un.org/sustainabledevelopment/poverty/',
  },
  {
    ico: 'zerohunger',
    title: 'ZERO HUNGER',
    url: 'https://www.un.org/sustainabledevelopment/hunger/',
  },
  {
    ico: 'goodhealth',
    title: 'GOOD HEALTH AND WELL-BEING',
    url: 'https://www.un.org/sustainabledevelopment/health/',
  },
  {
    ico: 'qualityeducation',
    title: 'QUALITY EDUCATION',
    url: 'https://www.un.org/sustainabledevelopment/education/',
  },
  {
    ico: 'genderequality',
    title: 'GENDER EQUALITY',
    url: 'https://www.un.org/sustainabledevelopment/gender-equality/',
  },
  {
    ico: 'cleanwater',
    title: 'CLEAN WATER AND SANITATION',
    url: 'https://www.un.org/sustainabledevelopment/water-and-sanitation/',
  },
  {
    ico: 'affordableenergy',
    title: 'AFFORDABLE AND CLEAN ENERGY',
    url: 'https://www.un.org/sustainabledevelopment/energy/',
  },
  {
    ico: 'decentwork',
    title: 'DECENT WORK AND ECONOMIC GROWTH',
    url: 'https://www.un.org/sustainabledevelopment/economic-growth/',
  },
  {
    ico: 'industry',
    title: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE',
    url:
      'https://www.un.org/sustainabledevelopment/infrastructure-industrialization/',
  },
  {
    ico: 'reduced',
    title: 'REDUCED INEQUALITIES',
    url: 'https://www.un.org/sustainabledevelopment/inequality/',
  },
  {
    ico: 'sustainablecities',
    title: 'SUSTAINABLE CITIES AND COMMUNITIES',
    url: 'https://www.un.org/sustainabledevelopment/cities/',
  },
  {
    ico: 'consumption',
    title: 'RESPONSIBLE CONSUMPTION AND PRODUCTION',
    url:
      'https://www.un.org/sustainabledevelopment/sustainable-consumption-production/',
  },
  {
    ico: 'climateaction',
    title: 'CLIMATE ACTION',
    url: 'https://www.un.org/sustainabledevelopment/climate-change-2/',
  },
  {
    ico: 'lifebelowwater',
    title: 'LIFE BELOW WATER',
    url: 'https://www.un.org/sustainabledevelopment/oceans/',
  },
  {
    ico: 'lifeonland',
    title: 'LIFE ON LAND',
    url: 'https://www.un.org/sustainabledevelopment/biodiversity/',
  },
  {
    ico: 'peace',
    title: 'PEACE, JUSTICE AND STRONG INSTITUTIONS',
    url: 'https://www.un.org/sustainabledevelopment/peace-justice/',
  },
  {
    ico: 'partnership',
    title: 'PARTNERSHIPS FOR THE GOALS',
    url: 'https://www.un.org/sustainabledevelopment/globalpartnerships/',
  },
]

export const deviceWidth = {
  mobile: '576',
  tablet: '768',
  desktop: '992',
  desktopLarge: '1200',
}
export const imgArray = (): Array<string> => {
  const tempArray: string[] = []
  for (let i = 0; i < 9; i++) {
    tempArray[i] = require(`../assets/images/image${i + 1}.jpg`)
  }
  return tempArray
}
export const iconUpload = (): string => {
  return require('../assets/images/icon-upload.svg')
}
export const SocialMediaLinks = [
  'http://www.instagram.com',
  'http://www.twitter.com',
  'http://www.facebook.com',
  'http://www.website.com',
]
const isoCountriesTmp = {}
const isoCountriesLatLngTmp = {}

countryLatLng.map(value => {
  isoCountriesTmp[value.alpha2] = value.country
  isoCountriesLatLngTmp[value.alpha2] = {
    lat: value.latitude,
    lng: value.longitude,
  }
})

export const isoCountries = isoCountriesTmp
export const isoCountriesLatLng = isoCountriesLatLngTmp

export const testProjectData = JSON.stringify(testProject)
export const blankProjectData = JSON.stringify(blankProject)

export const claimJson = JSON.stringify(claimJsonData)
export const onboardJson = JSON.stringify(onboardJsonData)
export const testClaimSchema = JSON.stringify(testClaimSchemaData)
export const agentJson = JSON.stringify(agentJsonData)

export const testClaimForm = '{}'
export const testAgentData =
  '{"email":"don@ixo.com","name":"Don","role":"EA","agentDid":"did:sov:Tp25vz5iHoLJ4ktk7pKYC6","projectDid":"did:ixo:3vDYCPWvwCsj9Co3RqXp3z"}'
export const testSig = {
  type: 'ed25519-sha-256',
  created: '2018-06-06T09:18:47Z',
  creator: 'did:sov:Tp25vz5iHoLJ4ktk7pKYC6',
  publicKey: 'BGcahyLmkPeuteRemDXMUPu1W9Tc6ghuCSud4mD7fTG3',
  signatureValue:
    '6A548060AEB78449D17C1B825F941028728ADBBD5A4952CDF7782F128B2582A648D0697670AA3164434B8C27D18FDC213333DE7A8ADC574940B509B6B2AD590E',
}
export const formJson = {
  fields: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
    },
    {
      label: 'Number',
      name: 'Number',
      type: 'number',
    },
    {
      label: 'theimage',
      name: 'theimage',
      type: 'image',
    },
    {
      label: 'Owner email',
      name: 'email',
      type: 'text',
    },
    {
      label: 'About',
      name: 'about',
      type: 'textarea',
    },
    {
      label: 'Country',
      name: 'country',
      type: 'country',
    },
    {
      label: 'Agent Template',
      name: 'agentTemplate.name',
      type: 'template',
    },
    {
      label: 'Attended School',
      name: 'attended',
      type: 'select',
      options: [
        {
          label: 'Yes',
          value: 'true',
        },
        {
          label: 'No',
          value: 'false',
        },
      ],
    },
  ],
}
