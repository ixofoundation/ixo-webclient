import * as React from 'react'
import styled from 'styled-components'
import Fingerprint from '../../assets/icons/Fingerprint'
import Flash from '../../assets/icons/Flash'
import Eye from '../../assets/icons/Eye'
import EyeOff from '../../assets/icons/EyeOff'
import Lock from '../../assets/icons/Lock'
import Settings from '../../assets/icons/Settings'
import SettingsActive from '../../assets/icons/SettingsActive'
import Internet from '../../assets/icons/Internet'
import Help from '../../assets/icons/Help'
import Sync from '../../assets/icons/Sync'
import Back from '../../assets/icons/Back'
import Menu from '../../assets/icons/Menu'
import Approved from '../../assets/icons/Approved'
import ApprovedTick from '../../assets/icons/ApprovedTick'
import Calendar from '../../assets/icons/Calendar'
import ClaimsActive from '../../assets/icons/ClaimsActive'
import Claims from '../../assets/icons/Claims'
import Claims2 from '../../assets/icons/Claims2'
import Close from '../../assets/icons/Close'
import Down from '../../assets/icons/Down'
import EvaluatorsActive from '../../assets/icons/EvaluatorsActive'
import Evaluators from '../../assets/icons/Evaluators'
import Home from '../../assets/icons/Home'
import HomeActive from '../../assets/icons/HomeActive'
import Expand from '../../assets/icons/Expand'
import Export from '../../assets/icons/Export'
import Facebook from '../../assets/icons/Facebook'
import FavouriteActive from '../../assets/icons/FavouriteActive'
import Funding from '../../assets/icons/Funding'
import Github from '../../assets/icons/Github'
import Heart from '../../assets/icons/Heart'
import Impacts from '../../assets/icons/Impacts'
import IndicatorUp from '../../assets/icons/IndicatorUp'
import IndicatorDown from '../../assets/icons/IndicatorDown'
import Info from '../../assets/icons/Info'
import Instagram from '../../assets/icons/Instagram'
import LogoIxo from '../../assets/icons/LogoIxo'
import IxoX from '../../assets/icons/IxoX'
import Kyc from '../../assets/icons/Kyc'
import Linkedin from '../../assets/icons/Linkedin'
import Location from '../../assets/icons/Location'
import Medium from '../../assets/icons/Medium'
import Pending from '../../assets/icons/Pending'
import Plus from '../../assets/icons/Plus'
import Project from '../../assets/icons/Project'
import RegisterNo from '../../assets/icons/RegisterNo'
import RegistrationYes from '../../assets/icons/RegistrationYes'
import Rejected from '../../assets/icons/Rejected'
import RejectedCross from '../../assets/icons/RejectedCross'
import Search from '../../assets/icons/Search'
import ServiceProviders from '../../assets/icons/ServiceProviders'
import ServiceProvidersActive from '../../assets/icons/ServiceProvidersActive'
import Share from '../../assets/icons/Share'
import Success from '../../assets/icons/Success'
import Telegram from '../../assets/icons/Telegram'
import Trash from '../../assets/icons/Trash'
import Twitter from '../../assets/icons/Twitter'
import Upload from '../../assets/icons/Upload'
import World from '../../assets/icons/World'

const IconsContainer = styled.div`
  background: black;
  margin: 20px auto;

  i {
    font-size: 17px;
    display: inline-block;
    padding: 10px;
  }

  svg {
    margin: 10px;
  }

  i:before {
    color: white;
  }
`

export interface ParentProps {
  title: string
}

export const Icons: React.SFC<ParentProps> = props => {
  return (
    <IconsContainer className="container">
      <div className="row">
        <div
          className="icon-col-md-12"
          style={{
            color: 'white',
            fontFamily: 'Roboto sans-serif !important',
            fontSize: '22px',
            background: 'aqua',
          }}
        >
          <Fingerprint width="17" fill="#fff" />
          <Flash width="17" fill="#fff" />
          <Eye width="17" fill="#fff" />
          <EyeOff width="17" fill="#fff" />
          <Lock width="17" fill="#fff" />
          <Settings width="17" fill="#fff" />
          <Internet width="17" fill="#fff" />
          <Help width="17" fill="#fff" />
          <Sync width="17" fill="#fff" />
          <Back width="17" fill="#fff" />
          <Menu width="17" fill="#fff" />
          <Linkedin width="17" fill="#fff" />
          <Approved width="17" fill="#fff" />
          <ApprovedTick width="17" fill="#fff" />
          <Calendar width="17" fill="#fff" />
          <ClaimsActive width="17" fill="#fff" />
          <Claims width="17" fill="#fff" />
          <Claims2 width="17" fill="#fff" />
          <Close width="17" fill="#fff" />
          <Down width="17" fill="#fff" />
          <EvaluatorsActive width="17" fill="#fff" />
          <Evaluators width="17" fill="#fff" />
          <Expand width="17" fill="#fff" />
          <Export width="17" fill="#fff" />
          <Facebook width="17" fill="#fff" />
          <FavouriteActive width="17" fill="#fff" />
          <Funding width="17" fill="#fff" />
          <Github width="17" fill="#fff" />
          <Heart width="17" fill="#fff" />
          <HomeActive width="17" fill="#fff" />
          <Home width="17" fill="#fff" />
          <Impacts width="17" fill="#fff" />
          <IndicatorUp width="17" fill="#fff" />
          <IndicatorDown width="17" fill="#fff" />
          <Info width="17" fill="#fff" />
          <Instagram width="17" fill="#fff" />
          <LogoIxo width="17" fill="#fff" />
          <IxoX width="17" fill="#fff" />
          <Kyc width="17" fill="#fff" />
          <Linkedin width="17" fill="#fff" />
          <Location width="17" fill="#fff" />
          <Medium width="17" fill="#fff" />
          <Pending width="17" fill="#fff" />
          <Plus width="17" fill="#fff" />
          <Project width="17" fill="#fff" />
          <RegisterNo width="17" fill="#fff" />
          <RegistrationYes width="17" fill="#fff" />
          <Rejected width="17" fill="#fff" />
          <RejectedCross width="17" fill="#fff" />
          <Search width="17" fill="#fff" />
          <ServiceProviders width="17" fill="#fff" />
          <ServiceProvidersActive width="17" fill="#fff" />
          <SettingsActive width="17" fill="#fff" />
          <Share width="17" fill="#fff" />
          <Success width="17" fill="#fff" />
          <Telegram width="17" fill="#fff" />
          <Trash width="17" fill="#fff" />
          <Twitter width="17" fill="#fff" />
          <Upload width="17" fill="#fff" />
          <World width="17" fill="#fff" />
        </div>
      </div>
    </IconsContainer>
  )
}
