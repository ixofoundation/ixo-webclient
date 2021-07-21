import React from 'react'
import styled from 'styled-components'
import { Control } from '../../types'

interface Props {
  entityDid: string
  control: Control
}

const Image = styled.img`
  box-sizing: border-box;
  border-radius: 4px;
`

const Shield: React.FunctionComponent<Props> = ({
  entityDid,
  control: { title, iconColor, parameters },
}) => {
  const field = parameters?.find((param) => param?.name === 'field')?.value
  const shieldUrl = encodeURIComponent(
    `${process.env.REACT_APP_BLOCK_SYNC_URL}/api/project/shields/${field}/${entityDid}`,
  )

  return (
    <Image
      key={field}
      src={`https://img.shields.io/endpoint?url=${shieldUrl}&color=${iconColor}&label=${title}&style=flat-square&logo=&labelColor=FFF`}
    />
  )
}

export default Shield
