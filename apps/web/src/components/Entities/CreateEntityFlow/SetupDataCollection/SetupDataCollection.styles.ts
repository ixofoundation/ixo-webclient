import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .svc-creator {
    &__banner {
      display: none;
    }
  }
`
export const Row = styled.div`
  width: 100%;
`

export const QuestionsListWrapper = styled.div`
  .dragged {
    > div > div {
      opacity: 0.8;
      border-style: dashed;
    }
  }
`
