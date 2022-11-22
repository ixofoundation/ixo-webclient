import styled from 'styled-components'

export const theme = {
  ixoBlue: '#49BFE0', // button borders, small hero numbers, SDG numbers
  ixoOrange: '#F89D28',
  ixoGreen: '#5AB946',
  ixoRed: '#E2223B',
  ixoWhite: '#FFFFFF',
  ixoNewBlue: '#00D2FF',
  ixoLightGrey: '#F3F3F3',
  ixoLightGrey2: '#E8E8E9',
  ixoMediumGrey: '#A8ADAE',
  ixoBlack: '#000000',
  ixoColor1: '#436779',
  ixoColor2: '#828E94',
  ixoNewOrange: '#ED9526',
  ixoDarkRed: '#A11C43',
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
  primaryFontFamily: 'Roboto, sans-serif',
  secondaryFontFamily: 'Roboto Condensed, sans-serif',
  fontSkyBlue: '#39C3E6',
  fontLightGreyBlue: '#688EA0',
  fontGreen: '#6FCF97',
  fontYellow: '#E4D33D',
  grey: '#E9E8E8', // borders for project list cards, progress bar background on projects list
  darkGrey: '#656969', // "load more projects" button on project list
  lightGrey: '#B6B6B6',
  neutralLighterGrey: '#F0F3F9',
  neutralLightGrey: '#D7DEE8',
  neutralMediumGrey: '#878F9F',
  neutralDarkGrey: '#333333',
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
  highlight: {
    light: '#49bfe0',
    dark: '#027b9b',
  },
}

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  font-family: ${(props): string => props.theme.primaryFontFamily};

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

export const Typography = styled.span<{
  fontFamily?: string
  fontSize?: string
  color?: string
  fontWeight?: number
  lineHeight?: string
  letterSpacing?: string
}>`
  font-family: ${(props): string =>
    props.fontFamily ?? props.theme.primaryFontFamily};
  font-size: ${(props): string => props.fontSize ?? '12px'};
  color: ${(props): string => props.color ?? '#000000'};
  font-weight: ${(props): number => props.fontWeight ?? 300};
  line-height: ${(props): string => props.lineHeight ?? '14px'};
  letter-spacing: ${(props): string => props.letterSpacing ?? 'normal'};
`

export const Box = styled.div``
