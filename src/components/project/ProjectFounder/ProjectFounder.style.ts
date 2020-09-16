import styled from 'styled-components'
import { deviceWidth } from 'lib/commonData'

export const FounderContent = styled.div`
  color: #7b8285;
  font-size: 16px;
  line-height: 30px;
  flex-grow: 1;

  h4 {
    color: black;
    font-size: 1.5rem;
    line-height: 1.2;
    font-family: Roboto;
    font-weight: bold;
    letter-spacing: 0.3px;
  }

  .ProjectFounder-link-wrapper {
    margin-top: 1rem;
    display: flex;
    flex-flow: row wrap;
    @media (min-width: ${deviceWidth.tablet}px) {
      flex-flow: row-reverse nowrap;
      align-items: center;
      justify-content: space-between;
    }
    .ProjectFounder-social-links {
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
          fill: ${(props: any): string => props.theme.fontBlue};
        }
      }
    }
    .ProjectFounder-website-link {
      font-weight: bold;
      color: #39c3e6;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`

export const FounderImageWrapper = styled.div`
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

export const FounderWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  @media (min-width: ${deviceWidth.tablet}px) {
    flex-flow: row nowrap;
  }
`
