import styled, { css } from 'styled-components'

export type TTypographyVariant = 'primary' | 'secondary'
export type TTypographySize = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
export type TTypographyWeight =
  | 'thin' // 100
  | 'extra-light' // 200
  | 'light' // 300
  | 'normal' // 400
  | 'medium' // 500
  | 'semi-bold' // 600
  | 'bold' // 700
  | 'extra-bold' // 800
  | 'black' // 900
  | 'inherit' // inherit
export type TTypographyColor =
  | 'black'
  | 'white'
  | 'light-blue'
  | 'light-grey-blue'
  | 'blue'
  | 'dark-blue'
  | 'darkest-blue'
  | 'color-2'
  | 'grey700'
  | 'grey500'
  | 'grey300'
  | 'green'
  | 'red'
  | 'inherit'

export interface ITypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TTypographyVariant
  size?: TTypographySize
  weight?: TTypographyWeight
  color?: TTypographyColor
  overflowLines?: number
  transform?: string
  noWrap?: boolean
  underline?: boolean
  wordBreak?: string
  textAlign?: string
  hover?: {
    underline?: boolean
  }
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
const xsSizeCss = css`
  font-size: 9px;
  line-height: 11px;
`
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
const xxxlSizeCss = css`
  font-size: 28px;
  line-height: 32px;
`
const xxxxlSizeCss = css`
  font-size: 32px;
  line-height: 38px;
`
const xxxxxlSizeCss = css`
  font-size: 48px;
  line-height: 56px;
`

/* weight */
const inheritWeightCss = css`
  font-weight: inherit;
`
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
const lightBlueColorCss = css`
  color: ${(props) => props.theme.ixoLightBlue};
`
const lightGreyBlueColorCss = css`
  color: ${(props) => props.theme.ixoLightGreyBlue};
`
const blueColorCss = css`
  color: ${(props) => props.theme.ixoNewBlue};
`
const darkBlueColorCss = css`
  color: ${(props) => props.theme.ixoDarkBlue};
`
const darkestBlueColorCss = css`
  color: ${(props) => props.theme.ixoDarkestBlue};
`
const color2ColorCss = css`
  color: ${(props) => props.theme.ixoColor2};
`
const grey700ColorCss = css`
  color: ${(props) => props.theme.ixoGrey700};
`
const grey500ColorCss = css`
  color: ${(props) => props.theme.ixoGrey500};
`
const grey300ColorCss = css`
  color: ${(props) => props.theme.ixoGrey300};
`
const greenCss = css`
  color: ${(props) => props.theme.ixoGreen};
`
const redCss = css`
  color: ${(props) => props.theme.ixoRed};
`
const inheritColorCss = css`
  color: inherit;
`
const currentColorCss = css`
  color: currentColor;
`

/* overflow */
const overflowCss = css<ITypographyProps>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ overflowLines }) => overflowLines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
const overflowOneLineCss = css<ITypographyProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/* decoration */
const underlineCss = css`
  text-decoration: underline;
`
const nounderlineCss = css`
  text-decoration: unset;
`

/* hoverCss */
const hoverCss = css<ITypographyProps>`
  &:hover {
    ${({ hover }) => (hover?.underline ? underlineCss : nounderlineCss)}
  }
`

/* white-space */
const noWrapCss = css`
  white-space: nowrap;
`

const Typography = styled.div<ITypographyProps>`
  display: inline-block;
  transition: all 0.2s;

  ${({ overflowLines }) => {
    return overflowLines && (overflowLines === 1 ? overflowOneLineCss : overflowCss)
  }}
  ${({ transform }) => {
    return transform && `text-transform: ${transform};`
  }}
  ${({ wordBreak }) => {
    return wordBreak && `word-break: ${wordBreak};`
  }}
  ${({ textAlign }) => {
    return textAlign && `text-align: ${textAlign};`
  }}

  ${({ hover }) => {
    return hover && hoverCss
  }}
  ${({ underline }) => {
    return underline ? underlineCss : nounderlineCss
  }}
  ${({ noWrap }) => {
    return noWrap && noWrapCss
  }}
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
      case 'xs':
        return xsSizeCss
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
      case '3xl':
        return xxxlSizeCss
      case '4xl':
        return xxxxlSizeCss
      case '5xl':
        return xxxxxlSizeCss
      default:
        return undefined
    }
  }}
  ${({ weight = 'normal' }) => {
    switch (weight) {
      case 'inherit':
        return inheritWeightCss
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
  ${({ color = 'current' }) => {
    switch (color) {
      case 'black':
        return blackColorCss
      case 'white':
        return whiteColorCss
      case 'light-blue':
        return lightBlueColorCss
      case 'light-grey-blue':
        return lightGreyBlueColorCss
      case 'blue':
        return blueColorCss
      case 'dark-blue':
        return darkBlueColorCss
      case 'darkest-blue':
        return darkestBlueColorCss
      case 'color-2':
        return color2ColorCss
      case 'grey700':
        return grey700ColorCss
      case 'grey500':
        return grey500ColorCss
      case 'grey300':
        return grey300ColorCss
      case 'green':
        return greenCss
      case 'red':
        return redCss
      case 'inherit':
        return inheritColorCss
      default:
        return currentColorCss
    }
  }}
`

export default Typography
