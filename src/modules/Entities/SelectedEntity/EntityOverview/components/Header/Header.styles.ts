import styled from 'styled-components'

export const HeaderImage = styled.img`
  width: 100%;
  box-shadow: 0px 10px 35px 0px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-bottom: 22px;
`

export const Description = styled.div`
  color: ${(props: any): string => props.theme.fontDarkGrey};
  font-size: 16px;
  line-height: 30px;
  .react-md {
    img {
      max-width: 100%;
    }
    .first-letter {
      font-size: 2em;
      line-height: 1.75;
      margin-right: 0.75rem;
      padding: 0 1.125rem;
      background: #e8edee;
      border-radius: 4px;
      float: left;
    }
  }
`
