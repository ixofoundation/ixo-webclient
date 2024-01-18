import { MantineThemeColorsOverride, MantineThemeOverride } from '@mantine/core'

export const mantineThemeColors: MantineThemeColorsOverride = {
  'ixo-blue': [
    '#DFFEFF', // 0
    '#CAF8FF', // 1
    '#83D9F2', // 2 // ixoLightBlue
    '#64E4FF', // 3
    '#3DDBFE', // 4
    '#25D6FE', // 5
    '#00D2FF', // 6 // ixoBlue
    '#107591', // 7 // ixoMediumBlue
    '#143F54', // 8 // ixoNavyBlue
    '#022739', // 9 // ixoDarkestBlue
  ],
}

const mantineTheme: MantineThemeOverride = {
  fontFamily: 'Roboto, sans-serif',
  fontFamilyMonospace: 'Roboto Condensed, sans-serif',
  primaryColor: 'ixo-blue',
  defaultRadius: 'xs',
  colors: mantineThemeColors,
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        w: 160,
        color: 'white',
      },
    },
  },
}

export default mantineTheme
