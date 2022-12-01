import styled from 'styled-components'

export const PageWrapper = styled.div<{ full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 50px;
  ${(props): string => (!props.full && `max-width: 760px;`) || ''}
  width: 100%;
  margin: auto;
`

export const PageRow = styled.div`
  display: flex;
  width: 100%;
`
