import styled from 'styled-components';

export const theme = {
  ixoBlue: '#49BFE0', // button borders, small hero numbers, SDG numbers
  ixoOrange: '#F89D28',
  bg: {
    blue: '#002233', // dashboard background
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
  },
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
  grey: '#E9E8E8', // borders for project list cards, progress bar background on projects list
  darkGrey: '#656969', // "load more projects" button on project list
  lightGrey: '#B6B6B6',
  widgetBorder: '#0C3550', // border color for graphs/ charts, etc.
  graphGradient: 'linear-gradient(to right, #016480 0%, #03d0FE 100%)', // gradient fill for graphs/bars/charts
  red: '#E2223B',
};

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
`;

export const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
