import { FlexBox, HTMLDivProps, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { ITypographyProps } from 'components/Typography/Typography'
import { useTheme } from 'styled-components'

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
}): JSX.Element => {
  const theme: any = useTheme()
  return (
    <FlexBox
      $alignItems='center'
      $gap={2}
      $borderRadius='8px'
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
        <SvgBox $svgWidth={6} $svgHeight={6}>
          {preIcon}
        </SvgBox>
      )}
      <Typography size={textSize} $noWrap>
        {children}
      </Typography>
    </FlexBox>
  )
}

export default TabButton
