import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px 40px;
  background: #f0f3f9;
  font-family: ${(props): string => props.theme.secondaryFontFamily};
  font-weight: normal;
  padding-bottom: 100px;
`
export const FigureCardsContainer = styled.div`
  padding: 1.25rem 0;
  display: flex;
  justify-content: space-between;
`

export const FigureCard = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f0f3fa 100%);
  border: 1px solid #49bfe0;
  box-sizing: border-box;
  box-shadow: 0px 4px 25px -1px #e1e5ec;
  border-radius: 4px;
  flex-grow: 1;
  flex-basis: 0;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  padding: 15px 0px;
`

export const FigureLabel = styled.div`
  font-size: 19px;
  color: #01283b;
`

export const FigureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Figure = styled.div`
  color: #39c3e6;
  font-size: 27px;
  margin-right: 0.25rem;
`

export const FigurePercent = styled.div`
  color: #85ad5c;
  font-size: 15px;
`

export const FigureSubtle = styled.div`
  color: #373d3f;
  font-size: 12px;
`

export const ChartContainer = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f2f5fb 100%);
  box-shadow: 0px 4px 25px #e1e5ec;
  border-radius: 4px;
  padding: 35px;
`
