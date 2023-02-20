import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

export const ProfileCardWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  color: black;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin-right: 1.75rem;
  margin-bottom: 1.75rem;
  width: 100%;

  .ProfileCard-image {
    width: 6rem;
    max-height: 6rem;
    object-fit: cover;
  }

  .ProfileCard-content {
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-weight: normal;
    line-height: 1.2;
    padding: 0.75rem 1rem;
    .ProfileCard-name {
      font-size: 1.125rem;
      font-weight: bold;
    }
    .ProfileCard-role {
      font-size: 0.75rem;
      line-height: 1.5;
      color: #a5adb0;
    }
    .ProfileCard-social-links {
      margin-top: 1rem;
      svg {
        margin-right: 0.75rem;
        path {
          fill: #a5adb0;
        }
      }
      a:hover {
        svg path {
          fill: ${(props: any): string => props.theme.ixoBlue};
        }
      }
    }
  }

  @media (min-width: ${deviceWidth.desktop}px) {
    width: calc(50% - 1.75rem);
  }
`
