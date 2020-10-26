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
  p {
    color: white;
    font-weight: bold;
    padding: 2px 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    font-family: ${(props: any): string => props.theme.fontRoboto};
  }
`

export const ShieldLabel = styled.div`
  ${ShieldText} {
    color: black;
    font-weight: 400;
    padding: 2px 10px;
    font-family: ${(props: any): string => props.theme.fontRoboto};
  }
`
