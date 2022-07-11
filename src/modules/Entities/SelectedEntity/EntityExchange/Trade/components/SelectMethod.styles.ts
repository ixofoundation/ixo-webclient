import styled from 'styled-components'

export const PopoverList = styled.div`
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  border: 1px solid #083347;
  box-sizing: border-box;
  box-shadow: -13px 20px 42px rgba(0, 0, 0, 0.47);
  border-radius: 10px;
  padding: 10px 20px;
  position: absolute;
  top: -20px;
  left: 20px;
  z-index: 102;
`

export const PopoverItem = styled.div`
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 41px;
  color: #ffffff;

  &:hover {
    color: ${(props): string => props.theme.ixoBlue};
  }
`
