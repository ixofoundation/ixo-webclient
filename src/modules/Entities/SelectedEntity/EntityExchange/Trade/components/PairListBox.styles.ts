import styled from 'styled-components'

export const PairListBoxWrapper = styled.div`
  position: absolute;
  width: 100%;
  // height: 200px;
  left: 0;
  top: calc(50% + 30px);

  border: 1px solid #083347;
  border-top: unset;
  border-radius: 10px;
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);

  z-index: 105;

  padding: 30px 0px;
`

export const PairWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 30px;

  & .image {
    width: 40px;
    height: 40px;
  }

  & .denom {
    font-family: ${(props: any): string => props.theme.fontRobotoCondensed};
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-transform: uppercase;
  }

  &:hover {
    background: #01273a;
  }
`
