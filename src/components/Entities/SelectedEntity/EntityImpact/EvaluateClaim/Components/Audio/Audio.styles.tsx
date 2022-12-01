import styled from 'styled-components'

export const Container = styled.div`
  width: 22.5rem;

  .player-btn {
    background: none;
    border: none;
    width: 1.25rem;
    padding: 0;
    outline: none;
    display: block;

    svg {
      width: 100%;
      height: 90%;
      fill: #7f7f7f;
    }
  }

  .sb-soundplayer-progress-container {
    background: #e6e6e6;
    border-radius: 3px;
    height: 3px;
    margin-left: 1.25rem;

    .sb-soundplayer-progress-inner {
      background: ${(props): string => props.theme.highlight.light};
      border-radius: 3px;
      height: 3px;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background: ${(props): string => props.theme.highlight.light};
        right: 0;
        top: 50%;
        transform: translate(50%, -50%);
        position: absolute;
      }
    }
  }
`

export const TimerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #7c8e97;
  padding-left: 2.25rem;
`

export const TrackContainer = styled.div`
  display: flex;
  align-items: center;

  > div {
    flex-grow: 1;
    padding-top: 1px;
  }
`
