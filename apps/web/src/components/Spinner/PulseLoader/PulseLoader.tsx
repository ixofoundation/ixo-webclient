import { PulseLoaderWrapper } from './PulseLoader.styles'

interface Props {
  children: any
  repeat: boolean
  style?: any
  borderColor?: string
}

const PulseLoader = ({
  children,
  repeat,
  style,
  borderColor = '#dfe3e8',
}: Props) => {
  return (
    <PulseLoaderWrapper
      className={`${repeat ? 'repeat' : ''}`}
      style={style}
      borderColor={borderColor}
    >
      {children}
    </PulseLoaderWrapper>
  )
}

export default PulseLoader
