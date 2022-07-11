import styled from 'styled-components'

export const SlippageContainer = styled.div``

export const SlippageText = styled.div`
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
`

export const ValueRadio = styled.div`
  display: inline-block;
  background-color: #002233;
  border-radius: 50px;
  width: 60px;
  font-family: ${(props: any): string => props.theme.secondaryFontFamily};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background 0.2s ease-in;
  text-align: center;

  &.active {
    background-color: ${(props): string => props.theme.ixoBlue};
  }

  &:hover {
    background-color: ${(props): string => props.theme.ixoBlue};
  }
`
