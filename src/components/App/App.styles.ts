import { deviceWidth } from 'constants/device'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

export const theme = {
  ixoOrange: '#F89D28',
  ixoDarkOrange: '#ED9526',
  ixoGreen: '#5AB946',
  ixoLightGreen: '#73B556',
  ixoRed: '#E2223B',
  ixoDarkRed: '#A11C43',
  ixoYellow: '#E4D33D',

  ixoLightGreyBlue: '#688EA0',
  ixoLightBlue: '#83D9F2',
  ixoBlue: '#49BFE0', // button borders, small hero numbers, SDG numbers
  ixoNewBlue: '#00D2FF',
  ixoDarkBlue: '#436779',
  ixoNavyBlue: '#143F54',
  ixoMediumBlue: '#107591',
  ixoDarkestBlue: '#022739',

  ixoWhite: '#FFFFFF',
  ixoGrey100: '#F7F8F9',
  ixoGrey300: '#E8E8E9',
  ixoGrey500: '#D3D6D7',
  ixoGrey700: '#A8ADAE',
  ixoGrey900: '#4A4E50',
  ixoBlack: '#000000',

  ixoColor2: '#828E94',

  ixoShadow1: '10px 10px 20px rgba(0, 0, 0, 0.25)',
  ixoShadow2: '0px 4px 9px rgba(0, 0, 0, 0.18)',
  ixoGradientLight: 'linear-gradient(180deg, #FFFFFF 0%, #F3F6FC 100%)',
  ixoGradientDark2: 'linear-gradient(180deg, #01273A 0%, #002D42 100%)',

  bg: {
    gradientDarkBlue: 'linear-gradient(180deg, #038FB8 0%, #036C93 100%)', // claims
    gradientButton: 'linear-gradient(to bottom, #03D0FB 0%, #016480 100%)',
    gradientButtonGreen: 'linear-gradient(180deg, #5AB946 0%, #339F1C 100%)',
    gradientButtonRed: 'linear-gradient(180deg, #C5202D 0%, #AB101C 100%)',
    darkButton: '#0C3550',
    gradientWhite: 'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)',
    heavyDarkBlue: '#012131',
  },
  fontDarkBlue: '#013C4F',
  fontDarkGrey: '#282828',
  fontGrey: '#282828', // generally text on white background
  primaryFontFamily: 'Roboto, sans-serif',
  secondaryFontFamily: 'Roboto Condensed, sans-serif',
  fontSkyBlue: '#39C3E6',
  widgetBorder: '#0C3550', // border color for graphs/ charts, etc.
  graphGradient: 'linear-gradient(to right, #016480 0%, #03d0FE 100%)', // gradient fill for graphs/bars/charts
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

/**
 * @deprecated
 */
export const Typography = styled.span<{
  fontFamily?: string
  fontSize?: string
  color?: string
  fontWeight?: number
  lineHeight?: string
  letterSpacing?: string
}>`
  font-family: ${(props): string => props.fontFamily ?? props.theme.primaryFontFamily};
  font-size: ${(props): string => props.fontSize ?? '12px'};
  color: ${(props): string => props.color ?? '#000000'};
  font-weight: ${(props): number => props.fontWeight ?? 300};
  line-height: ${(props): string => props.lineHeight ?? '14px'};
  letter-spacing: ${(props): string => props.letterSpacing ?? 'normal'};
`

export interface HTMLElementProps {
  aspectRatio?: number
  margin?: string
  marginBottom?: number
  marginTop?: number
  marginLeft?: number
  marginRight?: number
  paddingBottom?: number
  paddingTop?: number
  paddingLeft?: number
  paddingRight?: number
  padding?: number
  p?: number
  px?: number
  py?: number
  pt?: number
  pl?: number
  pr?: number
  pb?: number
  m?: number
  mx?: number | 'auto'
  my?: number
  mt?: number
  ml?: number
  mr?: number
  mb?: number
  width?: string
  minWidth?: string
  maxWidth?: string
  height?: string
  minHeight?: string
  maxHeight?: string
  border?: string
  borderWidth?: string
  borderColor?: string
  borderStyle?: string
  borderRadius?: string
  borderRight?: string
  borderRightStyle?: string
  borderRightWidth?: string
  borderRightColor?: string
  position?: string
  left?: string
  right?: string
  top?: string
  bottom?: string
  transform?: string
  display?: string
  transition?: string
  background?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundColor?: string
  zIndex?: number
  pointerEvents?: string
  cursor?: string
  filter?: string
  overflow?: string
  overflowX?: string
  overflowY?: string
  opacity?: number
  whiteSpace?: string
  lineHeight?: string
  outline?: string
  outlineStyle?: string
  outlineColor?: string
  outlineWidth?: string
  visibility?: string
  color?: string
  fontSize?: number
  fontWeight?: number | string
  boxShadow?: string
  textAlign?: string

  className?: string
  children?: ReactNode
}

export interface HTMLDivProps extends HTMLElementProps {
  hover?: HTMLElementProps
  xs?: HTMLElementProps
  sm?: HTMLElementProps
  md?: HTMLElementProps
  onClick?: (e: any) => void
}

export interface HTMLFlexBoxProps extends HTMLDivProps {
  direction?: 'row' | 'column' | 'row-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'
  alignItems?: 'stretch' | 'center' | 'start' | 'end' | 'baseline'
  gap?: number
  flexWrap?: string
  flexBasis?: string
  flexGrow?: number
  flexShrink?: number
}

export const htmlElementCss = css<HTMLDivProps>`
  ${({ aspectRatio }) => aspectRatio && `aspect-ratio: ${aspectRatio}`};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ marginBottom }): string | undefined => (marginBottom ? `margin-bottom: ${marginBottom * 0.25}rem` : undefined)};
  ${({ marginRight }): string | undefined => (marginRight ? `margin-right: ${marginRight * 0.25}rem` : undefined)};
  ${({ marginLeft }): string | undefined => (marginLeft ? `margin-left: ${marginLeft * 0.25}rem` : undefined)};
  ${({ marginTop }): string | undefined => (marginTop ? `margin-top: ${marginTop * 0.25}rem` : undefined)};
  ${({ paddingBottom }): string | undefined =>
    paddingBottom ? `padding-bottom: ${paddingBottom * 0.25}rem` : undefined};
  ${({ paddingRight }): string | undefined => (paddingRight ? `padding-right: ${paddingRight * 0.25}rem` : undefined)};
  ${({ paddingLeft }): string | undefined => (paddingLeft ? `padding-left: ${paddingLeft * 0.25}rem` : undefined)};
  ${({ paddingTop }): string | undefined => (paddingTop ? `padding-top: ${paddingTop * 0.25}rem` : undefined)};
  ${({ padding }): string | undefined => (padding ? `padding: ${padding * 0.25}rem` : undefined)};
  ${({ p }) => p && `padding: ${p * 0.25}rem`};
  ${({ px }) => px && `padding-left: ${px * 0.25}rem; padding-right: ${px * 0.25}rem`};
  ${({ py }) => py && `padding-top: ${py * 0.25}rem; padding-bottom: ${py * 0.25}rem`};
  ${({ pl }) => pl && `padding-left: ${pl * 0.25}rem`};
  ${({ pr }) => pr && `padding-right: ${pr * 0.25}rem`};
  ${({ pt }) => pt && `padding-top: ${pt * 0.25}rem`};
  ${({ pb }) => pb && `padding-bottom: ${pb * 0.25}rem`};
  ${({ m }) => m && `margin: ${m * 0.25}rem`};
  ${({ mx }) =>
    mx === 'auto'
      ? `margin-left: ${mx}; margin-right: ${mx};`
      : mx && `margin-left: ${mx * 0.25}rem; margin-right: ${mx * 0.25}rem;`}
  ${({ my }) => my && `margin-top: ${my * 0.25}rem; margin-bottom: ${my * 0.25}rem`};
  ${({ ml }) => ml && `margin-left: ${ml * 0.25}rem`};
  ${({ mr }) => mr && `margin-right: ${mr * 0.25}rem`};
  ${({ mt }) => mt && `margin-top: ${mt * 0.25}rem`};
  ${({ mb }) => mb && `margin-bottom: ${mb * 0.25}rem`};
  ${({ width }) => width && `width: ${width}`};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}`};
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}`};
  ${({ height }) => height && `height: ${height};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
  ${({ border }): string | undefined => (border ? `border: ${border}` : undefined)};
  ${({ borderWidth }): string | undefined => (borderWidth ? `border-width: ${borderWidth}` : undefined)};
  ${({ borderStyle }): string | undefined => (borderStyle ? `border-style: ${borderStyle}` : undefined)};
  ${({ borderColor }): string | undefined => (borderColor ? `border-color: ${borderColor}` : undefined)};
  ${({ borderRadius }): string | undefined => (borderRadius ? `border-radius: ${borderRadius}` : undefined)};
  ${({ borderRight }): string | undefined => (borderRight ? `border-right: ${borderRight}` : undefined)};
  ${({ borderRightWidth }): string | undefined =>
    borderRightWidth ? `border-right-width: ${borderRightWidth}` : undefined};
  ${({ borderRightStyle }): string | undefined =>
    borderRightStyle ? `border-right-style: ${borderRightStyle}` : undefined};
  ${({ borderRightColor }): string | undefined =>
    borderRightColor ? `border-right-color: ${borderRightColor}` : undefined};
  ${({ position }): string | undefined => (position ? `position: ${position}` : undefined)};
  ${({ left }): string | undefined => (left ? `left: ${left}` : undefined)};
  ${({ right }): string | undefined => (right ? `right: ${right}` : undefined)};
  ${({ top }): string | undefined => (top ? `top: ${top}` : undefined)};
  ${({ bottom }): string | undefined => (bottom ? `bottom: ${bottom}` : undefined)};
  ${({ transform }): string | undefined => (transform ? `transform: ${transform}` : undefined)};
  ${({ display }): string | undefined => (display ? `display: ${display}` : undefined)};
  ${({ transition }): string | undefined => (transition ? `transition: ${transition}` : undefined)};
  ${({ background }): string | undefined => (background ? `background: ${background}` : undefined)};
  ${({ backgroundSize }): string | undefined => (backgroundSize ? `background-size: ${backgroundSize}` : undefined)};
  ${({ backgroundPosition }): string | undefined =>
    backgroundPosition ? `background-position: ${backgroundPosition}` : undefined};
  ${({ zIndex }): string | undefined => (zIndex ? `z-index: ${zIndex}` : undefined)};
  ${({ pointerEvents }): string | undefined => (pointerEvents ? `pointer-events: ${pointerEvents}` : undefined)};
  ${({ cursor }): string | undefined => (cursor ? `cursor: ${cursor}` : undefined)};
  ${({ filter }): string | undefined => (filter ? `filter: ${filter}` : undefined)};
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
  ${({ overflowX }) => overflowX && `overflow-x: ${overflowX};`}
  ${({ overflowY }) => overflowY && `overflow-y: ${overflowY};`}
  ${({ opacity }): string | undefined => (opacity ? `opacity: ${opacity}` : undefined)};
  ${({ whiteSpace }): string | undefined => (whiteSpace ? `white-space: ${whiteSpace}` : undefined)};
  ${({ lineHeight }): string | undefined => (lineHeight ? `line-height: ${lineHeight}` : undefined)};
  ${({ outline }): string | undefined => (outline ? `outline: ${outline}` : undefined)};
  ${({ outlineStyle }): string | undefined => (outlineStyle ? `outline-style: ${outlineStyle}` : undefined)};
  ${({ outlineWidth }): string | undefined => (outlineWidth ? `outline-width: ${outlineWidth}` : undefined)};
  ${({ outlineColor }): string | undefined => (outlineColor ? `outline-color: ${outlineColor}` : undefined)};
  ${({ visibility }): string | undefined => (visibility ? `visibility: ${visibility}` : undefined)};
  ${({ color }) => color && `color: ${color}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize * 0.25}rem`};
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight}`};
  ${({ boxShadow }) => boxShadow && `box-shadow: ${boxShadow}`};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};

  &:hover {
    ${({ hover }) => hover?.background && `background: ${hover.background};`}
    ${({ hover }) => hover?.borderWidth && `border-width: ${hover.borderWidth};`}
    ${({ hover }) => hover?.borderColor && `border-color: ${hover.borderColor};`}
    ${({ hover }) => hover?.borderStyle && `border-style: ${hover.borderStyle};`}
    ${({ hover }) => hover?.boxShadow && `box-shadow: ${hover.boxShadow};`}
    ${({ hover }) => hover?.color && `color: ${hover.color};`}
  }

  @media (max-width: ${deviceWidth.mobileSmall}px) {
    ${({ xs }) => xs?.px && `padding-left: ${xs.px * 0.25}rem; padding-right: ${xs.px * 0.25}rem`};
  }
`

const tableRowRoundCss = css<HTMLDivProps>`
  td:first-child {
    border-top-left-radius: ${(props) => props.borderRadius};
    border-bottom-left-radius: ${(props) => props.borderRadius};
  }
  td:last-child {
    border-bottom-right-radius: ${(props) => props.borderRadius};
    border-top-right-radius: ${(props) => props.borderRadius};
  }
`

export const Box = styled.div<HTMLDivProps>`
  ${htmlElementCss}
`

export const FlexBox = styled(Box)<HTMLFlexBoxProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }): string => direction};
  justify-content: ${({ justifyContent = 'start' }): string => justifyContent};
  align-items: ${({ alignItems = 'start' }): string => alignItems};
  gap: ${({ gap = 0 }): string => gap * 0.25 + 'rem'};
  borderradius: ${({ borderRadius }): string => borderRadius || 'none'};
  ${({ flexWrap }): string | undefined => (flexWrap ? `flex-wrap: ${flexWrap}` : undefined)};
  ${({ flexBasis }): string | undefined => (flexBasis ? `flex-basis: ${flexBasis}` : undefined)};
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow};`}
  ${({ flexShrink }) => flexShrink && `flex-shrink: ${flexShrink};`}
`

export const SvgBox = styled(FlexBox)<{ svgWidth?: number; svgHeight?: number }>`
  line-height: 0;

  svg {
    ${({ svgWidth }) => svgWidth && `width: ${svgWidth * 0.25}rem;`}
    ${({ svgHeight }) => svgHeight && `height: ${svgHeight * 0.25}rem;`}

    path {
      fill: currentColor !important;
      transition: all 0.2s;
    }
    circle {
      stroke: currentColor !important;
      transition: all 0.2s;
    }
  }
`

export const GridContainer = styled(Box)<{
  columns?: number
  columnGap?: number
  rowGap?: number
  gridGap?: number
  gridTemplateColumns?: string
  gridTemplateRows?: string
  gridTemplateAreas?: string
}>`
  display: grid;
  ${({ columns }) => columns && `grid-template-columns: repeat(${columns}, 1fr)`};
  ${({ gridTemplateColumns }) => gridTemplateColumns && `grid-template-columns: ${gridTemplateColumns}`};
  ${({ gridTemplateRows }) => gridTemplateRows && `grid-template-rows: ${gridTemplateRows}`};
  ${({ gridTemplateAreas }) => gridTemplateAreas && `grid-template-areas: ${gridTemplateAreas}`};
  ${({ columnGap }): string | undefined => (columnGap ? `column-gap: ${columnGap * 0.25}rem` : undefined)};
  ${({ rowGap }): string | undefined => (rowGap ? `row-gap: ${rowGap * 0.25}rem` : undefined)};
  ${({ gridGap }): string | undefined => (gridGap ? `grid-gap: ${gridGap * 0.25}rem` : undefined)};
`
export const GridItem = styled(Box)<{ gridArea?: string; alignSelf?: string }>`
  ${({ gridArea }) => gridArea && `grid-area: ${gridArea}`};
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf}`};
`

export const TableContainer = styled.table<{ width?: string; borderCollapse?: string; borderSpacing: string }>`
  ${({ width }): string | undefined => (width ? `width: ${width}` : undefined)};
  ${({ borderCollapse }): string | undefined => (borderCollapse ? `border-collapse: ${borderCollapse}` : undefined)};
  ${({ borderSpacing }): string | undefined => (borderSpacing ? `border-spacing: ${borderSpacing}` : undefined)};
`
export const TableHead = styled.thead``
export const TableBody = styled.tbody``
export const TableRow = styled.tr<HTMLDivProps>`
  ${htmlElementCss}
  ${({ borderRadius }) => borderRadius && tableRowRoundCss};
`
export const TableHeadItem = styled.th<HTMLDivProps>`
  ${htmlElementCss}
`
export const TableBodyItem = styled.td<HTMLDivProps>`
  ${htmlElementCss}
`

export const ScrollBox = styled(FlexBox)`
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: #08222f;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props): string => props.theme.ixoNewBlue};
    border-radius: 10px;
  }
`
