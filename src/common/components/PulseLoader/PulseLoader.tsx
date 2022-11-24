import { PulseLoaderWrapper } from './PulseLoader.styles'

interface Props {
  children: any
  repeat: boolean
  style?: any
}

const PulseLoader: React.SFC<Props> = ({ children, repeat, style }) => {
  return (
    <PulseLoaderWrapper className={`${repeat ? 'repeat' : ''}`} style={style}>
      {children}
    </PulseLoaderWrapper>
  )
}

export default PulseLoader
