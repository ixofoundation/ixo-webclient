import styled from 'styled-components'

export const InputContainer = styled.div`
  font-family: ${/* eslint-disable */ (props) => props.theme.primaryFontFamily};
  border-radius: 0;

  p {
    margin-bottom: 0;
    position: relative;
    pointer-events: none;
    line-height: 15px;
    font-weight: 300;
  }

  input {
    border: 0;
    background: none;
    border-radius: 0;
  }

  input:focus {
    background: none;
  }

  input:focus ~ p,
  input:not(:placeholder-shown) ~ p {
    bottom: 85px;
    font-weight: 500;
  }

  .search-input {
    margin: 0;
    font-size: 1rem;
    position: relative;
    height: 100%;
    display: flex;
    align-content: center;
    input {
      color: #a5adb0;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      border-radius: 3px;
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
    }

    input::-webkit-input-placeholder {
      opacity: 0;
    }
    input:-moz-placeholder {
      opacity: 0;
    }
    input::-moz-placeholder {
      opacity: 0;
    }
    input:-ms-input-placeholder {
      opacity: 0;
    }

    input:focus {
      color: ${/* eslint-disable */ (props) => props.theme.darkGrey};
    }

    input:focus ~ p,
    input:not(:placeholder-shown) ~ p {
      display: none;
    }

    p {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: ${/* eslint-disable */ (props) => props.theme.darkGrey};
      padding-left: 15px;

      transition:
        padding-left 0.2s ease,
        bottom 0.2s ease,
        font-size 0.2s ease;
    }
  }

  .modal-input {
    margin: 20px 0;
    font-size: 15px;

    input {
      color: white;
      border-bottom: 1px solid ${/* eslint-disable */ (props) => props.theme.colors.blue[5]};
    }

    input::-webkit-input-placeholder {
      opacity: 0;
    }
    input:-moz-placeholder {
      opacity: 0;
    }
    input::-moz-placeholder {
      opacity: 0;
    }
    input:-ms-input-placeholder {
      opacity: 0;
    }

    input:focus {
      color: white;
      border-bottom: 1px solid #5ab946;
    }

    input:focus ~ p,
    input:not(:placeholder-shown) ~ p {
      bottom: 50px;
      font-size: 11px;
    }

    p {
      bottom: 23px;
      color: #83d9f2;
      transition:
        font-size 0.2s ease,
        bottom 0.2s ease;
    }
  }

  .standard-input {
    margin: 40px 0;
    font-size: 16px;
    text-transform: uppercase;

    input {
      color: ${/* eslint-disable */ (props) => props.theme.darkGrey};
      border: 1px solid ${/* eslint-disable */ (props) => props.theme.lightGrey};
      padding-top: 15px;
      padding-bottom: 15px;
      border-radius: 3px;
    }

    input::-webkit-input-placeholder {
      opacity: 0;
    }
    input:-moz-placeholder {
      opacity: 0;
    }
    input::-moz-placeholder {
      opacity: 0;
    }
    input:-ms-input-placeholder {
      opacity: 0;
    }

    input:focus {
      color: ${/* eslint-disable */ (props) => props.theme.darkGrey};
      border: 1px solid ${/* eslint-disable */ (props) => props.theme.darkBlue};
    }

    input:focus ~ p,
    input:not(:placeholder-shown) ~ p {
      bottom: 85px;
      font-size: 11px;
      font-weight: 500;
      padding-left: 0;
    }

    p {
      bottom: 36px;
      color: ${/* eslint-disable */ (props) => props.theme.darkGrey};
      padding-left: 15px;

      transition:
        padding-left 0.2s ease,
        bottom 0.2s ease,
        font-size 0.2s ease;
    }
  }

  .disabled-input {
    margin: 40px 0;
    font-size: 16px;
    text-transform: uppercase;

    input {
      color: ${/* eslint-disable */ (props) => props.theme.darkGrey};
      border: 1px solid ${/* eslint-disable */ (props) => props.theme.darkBlue};
      padding-top: 15px;
      padding-bottom: 15px;
      border-radius: 3px;
    }

    p {
      color: ${/* eslint-disable */ (props) => props.theme.darkGrey};
      bottom: 85px;
      font-size: 11px;
      font-weight: 500;
      padding-left: 0;
    }
  }

  input::-webkit-input-placeholder {
    opacity: 0;
  }
  input:-moz-placeholder {
    opacity: 0;
  }
  input::-moz-placeholder {
    opacity: 0;
  }
  input:-ms-input-placeholder {
    opacity: 0;
  }
`
