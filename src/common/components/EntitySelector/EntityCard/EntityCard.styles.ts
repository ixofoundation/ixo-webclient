import styled from 'styled-components'

export const EntityCardWrapper = styled.div`
  border: 1px solid #dfe3e8;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: default;
  background: #fff;
  cursor: pointer;

  &.selected {
    border: 1px solid ${(props): string => props.theme.highlight.light};
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

    svg > path {
      fill: ${(props): string => props.theme.highlight.light};
    }
  }
`
export const EntityTitle = styled.h4`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
`
