import styled from 'styled-components'

export const EntityCardWrapper = styled.div`
  border: 1px solid #dfe3e8;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: default;
  background: #fff;

  &.selected {
    border: 1px solid #39c3e6;
  }

  h2 {
    font-size: 16px;
    line-height: 24px;
  }

  .info {
    padding: 1rem;
    .date {
      font-size: 12px;
      color: #a5adb0;
    }
  }
`
