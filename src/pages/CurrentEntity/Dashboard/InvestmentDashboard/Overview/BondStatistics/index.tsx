import { FlexBox } from 'components/App/App.styles'
import { useGetBondDid } from 'graphql/bonds'
import React from 'react'

interface Props {
  bondDid: string
}

const BondStatistics: React.FC<Props> = ({ bondDid }) => {
  const { data: bondDetail } = useGetBondDid(bondDid)

  console.log({ bondDetail })

  return <FlexBox width='100%' gap={4} alignItems='stretch'></FlexBox>
}

export default BondStatistics
