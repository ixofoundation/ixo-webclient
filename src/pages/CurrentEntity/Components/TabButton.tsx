import { FlexBox, HTMLDivProps, SvgBox, theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ITypographyProps } from 'components/Typography/Typography'

interface TabButtonProps extends HTMLDivProps {
  active?: boolean
  preIcon?: JSX.Element
  textSize?: ITypographyProps['size']
}
const TabButton: React.FC<TabButtonProps> = ({
  active = false,
  preIcon,
  textSize = 'lg',
  children,
  ...rest
}): JSX.Element => (
  <FlexBox
    alignItems='center'
    gap={2}
    borderRadius='8px'
    px={2}
    py={1}
    color={theme.ixoWhite}
    background={active ? theme.ixoNewBlue : theme.ixoDarkBlue}
    hover={{ background: theme.ixoNewBlue }}
    cursor='pointer'
    transition='all .2s'
    {...rest}
  >
    {preIcon && (
      <SvgBox svgWidth={6} svgHeight={6}>
        {preIcon}
      </SvgBox>
    )}
    <Typography size={textSize} noWrap>
      {children}
    </Typography>
  </FlexBox>
)

export default TabButton
