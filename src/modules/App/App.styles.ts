import styled from 'styled-components'

export const theme = {
  ixoBlue: '#49BFE0', // button borders, small hero numbers, SDG numbers
  ixoOrange: '#F89D28',
  bg: {
    blue: '#002233', // dashboard background,
    modal: '#002233',
    green: '#5AB946',
    darkBlue: '#01151F', // Tooltips background
    lightBlue: '#017492', // active button background for tabs on hero section
    lightGrey: '#F6F6F6', // light background for projects list
    gradientBlue: 'linear-gradient(to bottom, #012639 0%,#002d42 100%)', // background for widgets (charts, graphs, tabs, etc.)
    gradientDarkBlue: 'linear-gradient(180deg, #038FB8 0%, #036C93 100%)', // claims
    gradientButton: 'linear-gradient(to bottom, #03D0FB 0%, #016480 100%)',
    gradientButtonGreen: 'linear-gradient(180deg, #5AB946 0%, #339F1C 100%)',
    gradientButtonRed: 'linear-gradient(180deg, #C5202D 0%, #AB101C 100%)',
    darkButton: '#0C3550',
    gradientWhite: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)',
    heavyDarkBlue: '#012131',
  },
  fontBlueDisabled: '#436779',
  fontBlueButtonNormal: 'white',
  fontBlueButtonHover: '#83D9F2',
  fontDarkBlueButtonNormal: 'white',
  fontDarkBlueButtonHover: '#00D2FF',
  fontBlue: '#49BFE0', // Same as ixoBlue
  fontDarkBlue: '#013C4F',
  fontDarkGrey: '#282828',
  fontLightBlue: '#83D9F2', // big hero section numbers, widgets big numbers
  fontGrey: '#282828', // generally text on white background
  fontRoboto: 'Roboto, sans-serif',
  fontRobotoCondensed: 'Roboto Condensed, sans-serif',
  fontSkyBlue: '#39C3E6',
  fontLightGreyBlue: '#688EA0',
  fontGreen: '#6FCF97',
  fontYellow: '#E4D33D',
  grey: '#E9E8E8', // borders for project list cards, progress bar background on projects list
  darkGrey: '#656969', // "load more projects" button on project list
  lightGrey: '#B6B6B6',
  widgetBorder: '#0C3550', // border color for graphs/ charts, etc.
  graphGradient: 'linear-gradient(to right, #016480 0%, #03d0FE 100%)', // gradient fill for graphs/bars/charts
  red: '#E2223B',
  rejected: '#E2223B',
  approved: '#5ab946',
  disputed: '#ed9526',
  pending: '#49bfe0',
  remained: '#033c50',
  saved: '#143F54',
  rejectedGradient: 'linear-gradient(270deg, #E2223B 0%, #CD1C33 85.47%)',
  approvedGradient: 'linear-gradient(270deg, #6FCF97 0%, #52A675 100%)',
  disputedGradient: 'linear-gradient(270deg, #fcc44a 0%, #f89e2a 100%)',
  pendingGradient: 'linear-gradient(270deg, #04D0FB 0%, #49BFE0 100%)',
}

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  font-family: roboto;

  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  a {
  }
  font-weight: 300;
`
export const HeaderDropdownBackground = styled.div`
  position: absolute;
  top: 0;
  padding: 0 15px;
  background: black;
  width: 100%;
  height: 76px;
`

export const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100%;
`

export const AssistantContainer = styled.div``
