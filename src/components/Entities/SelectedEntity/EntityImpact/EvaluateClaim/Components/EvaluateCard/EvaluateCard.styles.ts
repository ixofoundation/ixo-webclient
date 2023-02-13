import styled from 'styled-components'

export const Container = styled.div`
  background: white;
  border-radius: 0.25rem;
  padding: 1.5rem 0.75rem;
  padding-bottom: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export const ActionButtonContainer = styled.div`
  border: 0.5px solid #75b4d2;
  border-radius: 4px;
  width: fit-content;
  display: flex;
  margin-left: auto;

  button {
    outline: none !important;
    border: none;
    border-right: 0.5px solid #75b4d2;
    background: transparent;
    font-size: 0.75rem;
    color: #7c8e97;
    width: 90px;
    height: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.25s;

    &:hover {
      color: black;
      font-weight: 500;
    }

    svg {
      margin-left: 0.5rem;
    }

    &:nth-of-type(2) {
      svg {
        margin-left: 0rem;
      }
    }

    &:last-of-type {
      border-right: none;
      width: 33px;
      padding: 0.25rem;
      svg {
        margin-left: 0;
      }
    }

    &.hasComments {
      background: #83d9f2;
      color: white;
    }

    &.rejected {
      color: white;
      background: #e2223b;
    }

    &.approved {
      color: white;
      background: #85ad5c;
    }

    &.queried {
      background: #ed9526;
      color: white;
    }
  }
`

export const StatusContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 10px;

  button {
    display: flex;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    padding: 0;

    &:focus-within {
      outline: none;
    }
  }

  & > svg {
    width: 20px;
    height: 20px;

    &.rejected {
      color: white;
      background: #e2223b;
    }

    &.approved {
      color: white;
      background: #85ad5c;
    }

    &.queried {
      background: #ed9526;
      color: white;
    }
  }
`

export const Value = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: black;
  margin-bottom: 1rem;
`

export const Title = styled.div`
  font-size: 1.375rem;
  font-weight: 400;
  color: black;
  margin-bottom: 0.5rem;
`

export const Description = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #4a4e50;
  margin-bottom: 0.5rem;
`

export const ImageContainer = styled.div`
  min-width: 15rem;
  text-align: center;

  > img {
    max-width: 18.75rem;
  }
`

export const AudioContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  padding-top: 2rem;
`
