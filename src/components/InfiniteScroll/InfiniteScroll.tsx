import ReactInfiniteScroll from 'react-infinite-scroll-component'

interface Props {
  dataLength: number
  hasMore: boolean
  columns: number
  next: () => void
  children: React.ReactNode
}

const InfiniteScroll: React.FC<Props> = ({ dataLength, hasMore, next, columns, children }) => {
  return (
    <ReactInfiniteScroll
      dataLength={dataLength} //This is important field to render the next data
      next={next}
      hasMore={hasMore}
      loader={<h4 style={{ width: '100%' }}>Loading...</h4>}
      endMessage={
        <p style={{ width: '100%', textAlign: 'center', gridColumn: `span ${columns}` }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      scrollableTarget='root'
      style={{ width: '100%', display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gridGap: '30px' }}
    >
      {children}
    </ReactInfiniteScroll>
  )
}

export default InfiniteScroll
