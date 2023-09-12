import styled from 'styled-components'

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;

  & > button {
    margin: 0px 10px;
    padding: 5px 10px;
    background: #143f54;
    border: 1px solid #143f54;
    border-radius: 4px;
    color: #ffffff;
    min-width: 60px;
    font-size: 12px;
    line-height: 16px;

    &:focus {
      outline: none !important;
    }
    &.active {
      border: 1px solid ${(props): string => props.theme.highlight.light};
      color: #83d9f2;
    }
    &.reset {
      display: flex;
      align-items: center;

      & > img {
        margin-right: 5px;
      }
    }
  }
`
export const InputWrapper = styled.div`
  position: relative;
  margin-left: 50px;

  & > input {
    width: 200px;
    height: 30px;
    padding: 5px 15px;
    background: #143f54;
    border: unset;
    border-radius: 4px;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;

    &::placeholder {
      color: #ffffff;
    }
    &:focus-visible {
      outline: none !important;
    }
  }
  & > img {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(-50%, -50%);
  }
`
