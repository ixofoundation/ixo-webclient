import styled from 'styled-components';

export const RemoveButton = styled.button`
  border: none;
  color: #39c3e6;
  background: transparent;
  font-size: 0.75rem;
  font-weight: bold;
`;

export const AddButton = styled(RemoveButton)`
  &:focus {
    outline: none;
  }
  float: right;
  margin-top: -2rem;
`;
