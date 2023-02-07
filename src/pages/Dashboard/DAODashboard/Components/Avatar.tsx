import { Box, theme } from 'components/App/App.styles'

interface AvatarProps {
  url?: string
  size?: number
}
const Avatar: React.FC<AvatarProps> = ({ url, size = 100 }): JSX.Element => (
  <Box
    background={`url(${url}), ${theme.ixoGrey500}`}
    width={size + 'px'}
    height={size + 'px'}
    backgroundSize='contain'
    borderRadius='100%'
    borderColor='white'
    borderWidth='2px'
    borderStyle='solid'
  />
)

export default Avatar
