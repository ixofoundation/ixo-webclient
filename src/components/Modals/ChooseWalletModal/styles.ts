import styled from 'styled-components'

export const Container = styled.ul`
  min-width: 300px;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0px;
  margin: 0;
`

export const WalletBox = styled.li`
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: -1px 10px 30px rgba(0, 0, 0, 0.25);
  background: linear-gradient(180deg, #01273a 0%, #002d42 100%);

  display: flex;
  align-items: center;
  gap: 20px;

  img {
    width: 40px;
    height: 40px;
  }

  span {
    text-transform: uppercase;
  }
`
