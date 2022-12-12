import styled, { css } from 'styled-components'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  weight?:
    | 'thin' // 100
    | 'extra-light' // 200
    | 'light' // 300
    | 'normal' // 400
    | 'medium' // 500
    | 'semi-bold' // 600
    | 'bold' // 700
    | 'extra-bold' // 800
    | 'black' // 900
  color?: 'black' | 'white' | 'gray-medium' | 'blue' | 'gray-2' | 'color-1' | 'color-2' | 'inherit'
  children?: React.ReactNode
}

/* variant */
const primaryCss = css`
  font-family: ${(props): string => props.theme.primaryFontFamily};
`
const secondaryCss = css`
  font-family: ${(props): string => props.theme.secondaryFontFamily};
  letter-spacing: 0.3px;
`

/* size */
const smallSizeCss = css`
  font-size: 12px;
  line-height: 14px;
`
const mediumSizeCss = css`
  font-size: 14px;
  line-height: 16px;
`
const baseSizeCss = css`
  font-size: 16px;
  line-height: 19px;
`
const largeSizeCss = css`
  font-size: 18px;
  line-height: 22px;
`
const xlSizeCss = css`
  font-size: 20px;
  line-height: 24px;
`
const xxlSizeCss = css`
  font-size: 24px;
  line-height: 28px;
`
const xxxxxlSizeCss = css`
  font-size: 48px;
  line-height: 56px;
`

/* weight */
const thinWeightCss = css`
  font-weight: 100;
`
const extraLightWeightCss = css`
  font-weight: 200;
`
const lightWeightCss = css`
  font-weight: 300;
`
const normalWeightCss = css`
  font-weight: 400;
`
const mediumWeightCss = css`
  font-weight: 500;
`
const semiBoldWeightCss = css`
  font-weight: 600;
`
const boldWeightCss = css`
  font-weight: 700;
`
const extraBoldWeightCss = css`
  font-weight: 800;
`
const blackWeightCss = css`
  font-weight: 900;
`

/* color */
const blackColorCss = css`
  color: ${(props) => props.theme.ixoBlack};
`
const whiteColorCss = css`
  color: ${(props) => props.theme.ixoWhite};
`
const blueColorCss = css`
  color: ${(props) => props.theme.ixoNewBlue};
`
const grayMediumColorCss = css`
  color: ${(props) => props.theme.ixoMediumGrey};
`
const gray2ColorCss = css`
  color: ${(props) => props.theme.ixoLightGrey2};
`
const color1ColorCss = css`
  color: ${(props) => props.theme.ixoColor1};
`
const color2ColorCss = css`
  color: ${(props) => props.theme.ixoColor2};
`
const inheritColorCss = css`
  color: inherit;
`

const Typography = styled.div<Props>`
  display: inline-block;
  transition: all 0.2s;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return primaryCss
      case 'secondary':
        return secondaryCss
      default:
        return undefined
    }
  }}
  ${({ size = 'base' }) => {
    switch (size) {
      case 'sm':
        return smallSizeCss
      case 'md':
        return mediumSizeCss
      case 'base':
        return baseSizeCss
      case 'lg':
        return largeSizeCss
      case 'xl':
        return xlSizeCss
      case '2xl':
        return xxlSizeCss
      case '5xl':
        return xxxxxlSizeCss
      default:
        return undefined
    }
  }}
  ${({ weight = 'normal' }) => {
    switch (weight) {
      case 'thin':
        return thinWeightCss
      case 'extra-light':
        return extraLightWeightCss
      case 'light':
        return lightWeightCss
      case 'normal':
        return normalWeightCss
      case 'medium':
        return mediumWeightCss
      case 'semi-bold':
        return semiBoldWeightCss
      case 'bold':
        return boldWeightCss
      case 'extra-bold':
        return extraBoldWeightCss
      case 'black':
        return blackWeightCss
      default:
        return undefined
    }
  }}
  ${({ color = 'black' }) => {
    switch (color) {
      case 'black':
        return blackColorCss
      case 'white':
        return whiteColorCss
      case 'blue':
        return blueColorCss
      case 'gray-medium':
        return grayMediumColorCss
      case 'gray-2':
        return gray2ColorCss
      case 'color-1':
        return color1ColorCss
      case 'color-2':
        return color2ColorCss
      case 'inherit':
        return inheritColorCss
      default:
        return undefined
    }
  }}
`

export default Typography
