import * as React from 'react'
import { FooterLeft } from './FooterLeft/FooterLeft'
import { FooterRight } from './FooterRight/FooterRight'
import { BottomBar } from './FooterContainer.styles'

const Footer: React.FunctionComponent<{}> = () => {
  return (
    <BottomBar className="container-fluid text-white">
      <div className="row">
        <FooterLeft />
        <FooterRight />
      </div>
    </BottomBar>
  )
}

export default Footer
