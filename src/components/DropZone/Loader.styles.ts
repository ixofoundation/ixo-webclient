import styled from 'styled-components'
import { deviceWidth } from '../../constants/device'

export const StyledDropzone = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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
    background: ${(props): string => props.theme.ixoNewBlue};
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

  .file-preview {
    margin: 0 auto 1.25rem;
    display: block;
  }

  .desktop-upload-item {
    color: #ffffff;
  }

  ${UploadingWrapper} {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${deviceWidth.mobile}px) {
    button {
      width: 100%;
    }
  }
`
