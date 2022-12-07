import { FunctionComponent, useState, Fragment } from 'react'
import Header from 'components/Bonds/BondsSummaryHeader/Header'
import { BondState } from './Overview.style'
import { useSelectedEntity } from 'hooks/entity'

const Overview: FunctionComponent = () => {
  const [selectedHeader, setSelectedHeader] = useState('price')
  const { bondDetail } = useSelectedEntity()

  return (
    <Fragment>
      <BondState>{bondDetail?.state}</BondState>
      <Header isDark selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />
      {/* <BondChartScreen selectedHeader={selectedHeader} isDark={true} />
      <BondTable selectedHeader={selectedHeader} isDark={true} /> */}
    </Fragment>
  )
}

export default Overview
