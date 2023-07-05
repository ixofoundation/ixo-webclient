import { Box } from 'components/App/App.styles'
import { useTheme } from 'styled-components'

interface AvatarProps {
  url?: string
  size?: number
  borderWidth?: number
}
const Avatar: React.FC<AvatarProps> = ({ url, size = 100, borderWidth = 2 }): JSX.Element => {
  const theme: any = useTheme()
  return (
    <Box
      background={`url(${url}), ${theme.ixoGrey500}`}
      width={size + 'px'}
      height={size + 'px'}
      backgroundSize='contain'
      borderRadius='100%'
      borderColor='white'
      borderWidth={`${borderWidth}px`}
      borderStyle='solid'
    />
  )
}

export default Avatar
