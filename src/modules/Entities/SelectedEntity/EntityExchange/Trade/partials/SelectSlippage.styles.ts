import styled from 'styled-components'

export const SlippageContainer = styled.div`
  background: linear-gradient(180deg, #01273A 0%, #002D42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: -13px 20px 42px rgba(0, 0, 0, 0.47);
  border-radius: 10px;
  padding: 20px;
  position: absolute;
  top: -20px;
  left: 20px;
  z-index: 102;
`

export const SlippageText = styled.div`
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
`

export const ValueRadio = styled.div`
  display: inline-block;
  background-color: #002233;
  border-radius: 50px;
  width: 60px;
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background .2s ease-in;
  text-align: center;

  &.active {
    background-color: #00D2FF;
  }

  &:hover {
    background-color: #00D2FF;
  }
`