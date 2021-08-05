import styled from 'styled-components'

export const PopoverList = styled.div`
  background: linear-gradient(180deg, #01273A 0%, #002D42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: -13px 20px 42px rgba(0, 0, 0, 0.47);
  border-radius: 10px;
  padding: 10px 20px;
  position: absolute;
  top: -20px;
  left: 20px;
`

export const PopoverItem = styled.div`
  font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 41px;
  color: #FFFFFF;

  &:hover {
    color: #00D2FF;
  }
`