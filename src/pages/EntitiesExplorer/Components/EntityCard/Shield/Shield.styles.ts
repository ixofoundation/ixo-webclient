import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ShieldContainer = styled.div`
  display: flex;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`

export const ShieldText = styled.p`
  margin: 0;
  font-size: 12px;
  text-transform: capitalize;
`

export const ShieldTextContainer = styled.div`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 76px;
  text-align: center;
  p {
    color: white;
    font-weight: bold;
    padding: 2px 0px;
    font-family: ${(props: any): string => props.theme.primaryFontFamily};
  }
`

export const ShieldLabel = styled.div`
  ${ShieldText} {
    color: black;
    font-weight: 400;
    padding: 2px 10px;
    font-family: ${(props: any): string => props.theme.primaryFontFamily};
  }
`
