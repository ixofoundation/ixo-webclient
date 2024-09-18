import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import React, { PropsWithChildren } from 'react'
import { useTheme } from 'styled-components'

export interface FormCardProp {
  preIcon?: JSX.Element
  title: string | JSX.Element
}

export const FormCard: React.FC<PropsWithChildren<FormCardProp>> = ({ preIcon, title, children }) => {
  const theme: any = useTheme()
  return (
    <FlexBox
      $direction='column'
      $gap={5}
      border={`1px solid ${theme.ixoNewBlue}`}
      $borderRadius='0.5rem'
      width='100%'
      p={7}
    >
      <FlexBox $alignItems='center' $gap={2} width='100%'>
        {preIcon && preIcon}
        {typeof title === 'string' ? (
          <Typography size='xl' weight='medium'>
            {title}
          </Typography>
        ) : (
          title
        )}
      </FlexBox>
      {children}
    </FlexBox>
  )
}
