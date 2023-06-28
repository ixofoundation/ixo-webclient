import styled from 'styled-components'
import { ReactComponent as SearchIcon } from 'assets/images/icon-search.svg'

export const PairListWrapper = styled.div`
  position: relative;
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);
  border: 1px solid ${(props): string => props.theme.ixoBlue};
  border-radius: 10px;
  padding: 5px 20px;
  display: flex;
  flex-direction: column;

  & .triangle-left {
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-right: 15px solid ${(props): string => props.theme.ixoBlue};
    position: absolute;
    left: 0;
    top: 60px;
    transform: translate(-100%, -50%);
  }

  & .triangle-left:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 15px solid #002d42;
    position: absolute;
    top: -10px;
    left: 1px;
  }

  & .triangle-right {
    width: 0;
    height: 0;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-left: 15px solid ${(props): string => props.theme.ixoBlue};
    position: absolute;
    right: 0;
    top: 60px;
    transform: translate(100%, -50%);
  }

  & .triangle-right:after {
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid #002d42;
    position: absolute;
    top: -10px;
    right: 2px;
  }
`

export const PairListSearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const PairListSearchInputWrapper = styled.div`
  position: relative;
`

export const PairListSearchInput = styled.input`
  color: #ffffff;
  font-size: 18px;
  line-height: 21px;
  font-weight: 400;
  border-radius: 8px;
  background: #08222f;
  padding: 5px 36px;
  border: none;
  width: 100%;

  &::placeholder {
    color: ${(props): string => props.theme.ixoDarkBlue};
  }
  &:focus {
    outline: none;
  }
`

export const PairListSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 18px;
`

export const PairListSearchAssistanceButton = styled.button`
  background: ${(props): string => props.theme.ixoNewBlue};
  border-radius: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: none;
  position: relative;

  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const PairListTokens = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
  margin-bottom: 0;
  padding: 0;
  padding-right: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 218px;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: #08222F;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props): string => props.theme.ixoNewBlue};
    border-radius: 10px;
  }
}
`

export const PairListTokenWrapper = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  padding: 8px;
  border-radius: 8px;

  & > img {
    width: 38px;
    height: 38px;
  }

  &:hover {
    background: #083347;
  }

  & .name {
    width: 130px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`
