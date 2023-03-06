import { FlexBox, HTMLDivProps, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'

interface TabButtonProps extends HTMLDivProps {
  active?: boolean
  preIcon?: JSX.Element
}
const TabButton: React.FC<TabButtonProps> = ({ active, preIcon, children, ...rest }): JSX.Element => (
  <FlexBox
    alignItems='center'
    gap={1}
    borderRadius='8px'
    p={2}
    background={active ? theme.ixoNewBlue : theme.ixoDarkBlue}
    hover={{ background: theme.ixoNewBlue }}
    cursor='pointer'
    transition='all .2s'
    {...rest}
  >
    {preIcon && (
      <SvgBox svgWidth={6} svgHeight={6} color='white'>
        {preIcon}
      </SvgBox>
    )}
    <Typography size='lg' color='white'>
      {children}
    </Typography>
  </FlexBox>
)

export default TabButton
