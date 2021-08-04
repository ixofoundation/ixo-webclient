import countryLatLng from '../lib/maps/countryLatLng.json'

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
  mobileSmall: 320,
  mobile: 576,
  tablet: 768,
  desktop: 992,
  desktopLarge: 1200,
  desktopExtra: 1366,
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

const isoCountriesTmp: any = {}
const isoCountriesLatLngTmp = {}

countryLatLng.forEach((value) => {
  isoCountriesTmp[value.alpha2] = value.country
  isoCountriesLatLngTmp[value.alpha2] = {
    lat: value.latitude,
    lng: value.longitude,
  }
})

export const isoCountries = isoCountriesTmp
export const isoCountriesLatLng = isoCountriesLatLngTmp

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
