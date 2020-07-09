import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const DropZoneStyles = {
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export const UploadingWrapper = styled.div``

export const LoaderWrapper = styled.div`
  position: relative;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 2;
  letter-spacing: 0.3px;
  color: #000000;

  svg,
  p {
    margin-bottom: 0.75rem;
  }

  button {
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.5;
    color: #ffffff;
    background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
    border-radius: 4px;
    border: none;
    box-shadow: none;
    outline: none !important;
    padding: 10px 33px;
  }

  small {
    font-size: 0.75rem;
    line-height: 2;
    color: #7b8285;
  }

  .icon-wrapper {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 5.25rem;
    height: 5.25rem;
    border-radius: 50%;
    /* border: 2px solid #dfe3e8; */
    border: 2px solid #39c3e6;
    svg {
      margin: 0;
    }
  }

  .mobile-upload-item {
    display: none;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    .mobile-upload-item {
      display: flex;
    }
    .desktop-upload-item {
      display: none;
    }
    button {
      width: 100%;
    }
  }

  .image-example {
    margin-bottom: 1.25rem;
    max-width: 600px;
  }

  ${UploadingWrapper} {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;

    .icon-pulse-wrapper {
      padding: 1rem;
      border-radius: 50%;
      width: 5.25rem;
      height: 5.25rem;
      position: relative;
      z-index: 1;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      @keyframes iconPulse {
        0% {
          transform: scale(1.1);
          opacity: 1;
        }
        100% {
          transform: scale(1.5);
          opacity: 0;
        }
      }
      &:after {
        content: '';
        display: block;
        position: absolute;
        z-index: -1;
        top: -1px;
        left: -1px;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        border-radius: 50%;
        border: 2px solid #dfe3e8;
        opacity: 0;
        animation-delay: 1s;
        animation: iconPulse 1s ease-in-out;
        transform-origin: center;
      }
      &.repeat:after {
        animation-delay: 0;
        animation: iconPulse 1s infinite ease-in-out;
      }
      svg {
        margin: 0;
      }
    }
  }
`
