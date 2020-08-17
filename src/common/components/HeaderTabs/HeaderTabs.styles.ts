import styled from 'styled-components';
import { deviceWidth } from '../../../lib/commonData';

export const PositionController = styled.div`
  position: fixed;
  z-index: 9;
  left: 50%;
  top: 79px;
  transform: translate(-50%, -50%);
  @media (min-width: ${deviceWidth.tablet}px) {
    left: initial;
    right: 190px;
    top: 3.5rem;
    transform: none;
  }
`;
