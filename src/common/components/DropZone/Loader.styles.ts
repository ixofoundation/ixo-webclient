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

  .file-preview {
    margin: 0 auto 1.25rem;
    display: block;
    width: 100%;
  }

  .desktop-upload-item {
    color: #FFFFFF;
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
