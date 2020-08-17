import styled from 'styled-components';

export const MapWrapper = styled.div`
  :hover {
    cursor: grab;
  }

  :active {
    cursor: grabbing;
  }

  path:focus {
    outline: none !important;
  }
  g.rsm-marker {
    outline-width: 0px;
  }
`;
