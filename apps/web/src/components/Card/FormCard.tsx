import { Typography } from 'components/Typography'
import React, { PropsWithChildren } from 'react'
import { Flex, useMantineTheme } from '@mantine/core'

export interface FormCardProp {
  preIcon?: JSX.Element
  title: string | JSX.Element
}

export const FormCard: React.FC<PropsWithChildren<FormCardProp>> = ({ preIcon, title, children }) => {
  const theme = useMantineTheme()
  return (
    <Flex
      direction='column'
      gap={5}
      style={{ border: `1px solid ${theme.colors.blue[5]}`, borderRadius: '0.5rem', width: '100%', padding: '7px' }}
      w='100%'
      p={7}
    >
      <Flex align='center' gap={2} w='100%'>
        {preIcon && preIcon}
        {typeof title === 'string' ? (
          <Typography size='xl' weight='medium'>
            {title}
          </Typography>
        ) : (
          title
        )}
      </Flex>
      {children}
    </Flex>
  )
}
