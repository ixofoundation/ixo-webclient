import React from 'react'
import { Container } from './FormCardWrapper.styles'

interface Props {
  title: string
  description?: string
}

const FormCardWrapper: React.FunctionComponent<Props> = ({
  title,
  description,
  children,
}) => {
  return (
    <Container>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </Container>
  )
}

export default FormCardWrapper
