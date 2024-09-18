import styled from 'styled-components'
import { deviceWidth } from 'constants/device'

type TabsContainerProps = {
  background?: string
  color?: string
  borderColor?: string
  active?: {
    background?: string
    color?: string
  }
}

export const TabsContainer = styled.div<{ activetabcolor: string, tabBgColor?: string } & TabsContainerProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 100%;
  border: 1px solid ${(props): string => props.borderColor ?? props.theme.ixoMediumBlue};
  border-radius: 4px;

  & > div:first-child a,
  & > a:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  & > div:last-child a,
  & > a:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  & > div a {
    height: 100%;
  }

  & > div button {
    height: 100%;
  }

  a {
    background: ${(props): string => props.background ?? props.theme.ixoGradientDark2};
    font-family: ${(props): string => props.theme.primaryFontFamily};
    color: ${(props): string => props.color ?? props.theme.ixoWhite};
    text-transform: uppercase;
    font-weight: 400;
    font-size: 14px;
    padding: 10px 20px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;
    border-right: 1px solid ${(props): string => props.borderColor ?? props.theme.ixoMediumBlue};
    
    i {
      margin-right: 10px;
      font-size: 22px;
      &:before {
        // transition: all 0.3s ease;
      }
    }

    p {
      margin-bottom: 0;
      white-space: nowrap;
    }

    &:hover {
      text-decoration: none;
      color: ${(props: any): string => props.theme.ixoNewBlue};
    }

    &.active {
      background: ${(props): string => props.active?.background || props.theme.ixoMediumBlue};
      color: ${(props): string => props.active?.color || props.theme.ixoWhite};
      font-weight: bold;
    }

    &.in-active {
      pointer-events: none;
      cursor: default;
      i {
        opacity: 0.3;
      }
      p {
        opacity: 0.3;
      }
    }
  }

  button {
    background: linear-gradient(123.17deg, #0c5173 0%, #002a3f 101.44%);
    border: none;
    width: 50px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  img {
    padding: 0 5px;
  }

  @media (min-width: ${deviceWidth.mobileSmall}px) {
    a {
      min-width: 100px;
      width: 100%;
    }
  }
  @media (min-width: ${deviceWidth.mobile}px) {
    a {
      min-width: 168px;
      width: 100%;
    }
  }
  @media (max-width: ${deviceWidth.tablet}px) {
    a {
      flex: 1;
      font-size: 10px;
      line-height: 1.4;
      font-weight: bold;
      padding-left: 10px;
      padding-right: 10px;

      i {
        font-size: 16px;
        margin-right: 5px;
      }

      &:not(.active) {
        i {
          display: block;
        }
        p {
          display: none;
        }
      }
    }
  }
`
