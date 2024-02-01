import styled from 'styled-components'

export const HeaderImage = styled.img`
  width: 100%;
  box-shadow: 0px 10px 35px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-bottom: 22px;
`

export const ImageDescription = styled.div`
  color: ${(props: any): string => props.theme.fontDarkGrey};
  font-size: 0.85rem;
`
