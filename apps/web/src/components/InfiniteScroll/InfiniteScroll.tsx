import ReactInfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'

const Wrapper = styled.div<{ columns: number; gridGap: number }>`
  width: 100%;
  .infinite-scroll-component {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    grid-gap: ${(props) => props.gridGap * 0.25}rem;
    overflow: visible !important;
  }
`

interface Props {
  dataLength: number
  hasMore: boolean
  columns: number
  gridGap?: number
  next: () => void
  children: React.ReactNode
}

const InfiniteScroll: React.FC<Props> = ({ dataLength, hasMore, next, columns, gridGap = 7.5, children }) => {
  return (
    <Wrapper columns={columns} gridGap={gridGap}>
      <ReactInfiniteScroll
        dataLength={dataLength} // This is important field to render the next data
        next={next}
        hasMore={hasMore}
        loader={<p style={{ width: '100%', gridColumn: `span ${columns}` }}>Loading...</p>}
        endMessage={
          <p style={{ width: '100%', textAlign: 'center', gridColumn: `span ${columns}` }}>
            <b>Done</b>
          </p>
        }
        scrollableTarget='root'
      >
        {children}
      </ReactInfiniteScroll>
    </Wrapper>
  )
}

export default InfiniteScroll
