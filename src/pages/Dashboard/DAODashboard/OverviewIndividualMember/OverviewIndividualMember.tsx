import React from 'react'
import { useParams } from 'react-router-dom'

const OverviewIndividualMember: React.FC = (): JSX.Element => {
  const { address } = useParams<{ address: string }>()

  console.log('address', address)
  return (
    <>
      <>asd</>
    </>
  )
}

export default OverviewIndividualMember
