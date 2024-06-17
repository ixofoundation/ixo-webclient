import { MantineThemeColorsOverride, MantineThemeOverride, createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core'

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
  'ixo-green': [
    '#eaf8f0', // 0
    '#cbeed9', // 1
    '#a8e2c0', // 2
    '#9fdfba', // 3
    '#85d6a7', // 4
    '#63cb8e', // 5
    '#6FCF97', // 6 // ixoGreen
    '#349c60', // 7
    '#297a4a', // 8
    '#1d5735', // 9
  ],
}

const themeOverride: MantineThemeOverride = createTheme({
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
        radius: 'sm',
      },
    },
  },
})

const mantineTheme = mergeMantineTheme(DEFAULT_THEME, themeOverride)

export default mantineTheme
