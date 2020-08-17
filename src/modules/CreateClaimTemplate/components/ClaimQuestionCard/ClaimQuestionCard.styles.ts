import styled from 'styled-components';
import { deviceWidth } from '../../../../lib/commonData';

export const ClaimQuestionCardWrapper = styled.div`
  background: #f7f8f9;
  border: 1px solid #e8edee;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 2.125rem 1.25rem 2.5rem;
  margin-bottom: 1.25rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }

  @media (min-width: ${deviceWidth.tablet}px) {
    padding: 3.5rem 4.375rem 2.5rem;
    h2 {
      font-size: 2.25rem;
    }
  }
  .hide {
    display: none;
  }
`;

export const Toolbar = styled.div`
  border-top: 1px solid #e8edee;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-end;
  .toolbar-item {
    cursor: pointer;
    margin: 1.25rem 0.75rem;
    &:last-child {
      margin-right: 0;
    }
  }
  .divider {
    height: 1.875rem;
    width: 1px;
    margin: 0 1.125rem;
    background: #e8edee;
  }
`;
