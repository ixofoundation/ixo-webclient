import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const FooterWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  @media (min-width: ${deviceWidth.tablet}px) {
    flex-flow: row nowrap;
  }
`

export const FooterImageWrapper = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  img {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    object-fit: contain;
  }
  @media (min-width: ${deviceWidth.mobile}px) {
    margin-bottom: 0;
    padding-right: 2.5rem;
    width: initial;
  }
`

export const FooterContent = styled.div`
  color: #7b8285;
  font-size: 16px;
  line-height: 30px;
  flex-grow: 1;

  h4 {
    color: black;
    font-size: 1.5rem;
    line-height: 1.2;
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-weight: bold;
    letter-spacing: 0.3px;
  }

  .link-wrapper {
    margin-top: 1rem;
    display: flex;
    flex-flow: row wrap;
    @media (min-width: ${deviceWidth.tablet}px) {
      flex-flow: row-reverse nowrap;
      align-items: center;
      justify-content: space-between;
    }
    .social-links {
      @media (max-width: ${deviceWidth.tablet}px) {
        width: 100%;
      }
      svg {
        margin-right: 1rem;
        path {
          fill: #a5adb0;
        }
      }
      a:hover {
        text-decoration: none;
        svg path {
          fill: ${(props: any): string => props.theme.ixoNewBlue};
        }
      }
    }
    .website-link {
      font-weight: bold;
      color: ${(props): string => props.theme.ixoNewBlue};
      &:hover {
        text-decoration: underline;
      }
    }
  }
`
