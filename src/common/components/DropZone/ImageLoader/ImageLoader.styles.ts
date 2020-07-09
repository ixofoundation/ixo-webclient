import styled from 'styled-components'
import { deviceWidth } from '../../../../lib/commonData'

export const UploadingWrapper = styled.div``

export const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: -50px;
  z-index: 10;
  background: #f7f8f9;
  min-width: 320px;
  min-height: 50vh;
  padding: 2.125rem 1.25rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  transform: translateY(-50%);

  > div {
    text-align: center;
  }

  .ReactCrop {
    margin: 0 left;
  }

  .button-wrapper {
    margin-top: 0.5rem;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    button {
      width: 120px;
      height: 50px;
      font-weight: bold;
      font-size: 1rem;
      line-height: 19px;
      border-radius: 4px;
      border: none;
      background: #fff;
      color: #39c3e6;
      outline: none;
      box-shadow: none;
      border: 1px solid #39c3e6;
      margin-bottom: 0.75rem;
      &.submit {
        background: linear-gradient(180deg, #04d0fb 0%, #49bfe0 100%);
        color: #fff;
        &:focus {
          border: 1px solid #fff;
        }
      }
      @media (max-width: ${deviceWidth.mobile}px) {
        width: 100%;
      }
    }
  }
`

export const DropZoneStyles = {
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export const ImageLoaderWrapper = styled.div`
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

  .image-example {
    margin: 0 auto 1.25rem;
    max-width: 600px;
    max-width: 100%;
    display: block;
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
