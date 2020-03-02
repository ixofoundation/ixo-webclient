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
          flash: <i className="icon-flash" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/flash.svg')}
            width="17"
          />
          <Flash width="17" fill="#fff" />
          <br />
          eye: <i className="icon-eye" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/eye.svg')}
            width="17"
          />
          <Eye width="17" fill="#fff" />
          <br />
          eyeoff: <i className="icon-eyeoff" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/eyeoff.svg')}
            width="17"
          />
          <EyeOff width="17" fill="#fff" />
          <br />
          lock: <i className="icon-lock" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/lock.svg')}
            width="17"
          />
          <Lock width="17" fill="#fff" />
          <br />
          settings: <i className="icon-settings" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/settings.svg')}
            width="17"
          />
          <Settings width="17" fill="#fff" />
          <br />
          internet: <i className="icon-internet" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/internet.svg')}
            width="17"
          />
          <Internet width="17" fill="#fff" />
          <br />
          help: <i className="icon-help" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/help.svg')}
            width="17"
          />
          <Help width="17" fill="#fff" />
          <br />
          sync-icon: <i className="icon-sync-icon" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sync.svg')}
            width="17"
          />
          <Sync width="17" fill="#fff" />
          <br />
          back: <i className="icon-back" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/back.svg')}
            width="17"
          />
          <Back width="17" fill="#fff" />
          <br />
          menu: <i className="icon-menu" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/menu.svg')}
            width="17"
          />
          <Menu width="17" fill="#fff" />
          <br />
          linkedin: <i className="icon-linkedin" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/linkedin.svg')}
            width="17"
          />
          <Linkedin width="17" fill="#fff" />
          <br />
          approved: <i className="icon-approved" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/approved.svg')}
            width="17"
          />
          <Approved width="17" fill="#fff" />
          <br />
          approvetick: <i className="icon-approvetick" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/approvetick.svg')}
            width="17"
          />
          <ApprovedTick width="17" fill="#fff" />
          <br />
          calendar: <i className="icon-calendar" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/calendar.svg')}
            width="17"
          />
          <Calendar width="17" fill="#fff" />
          <br />
          claims-active: <i className="icon-claims-active" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/claimsActive.svg')}
            width="17"
          />
          <ClaimsActive width="17" fill="#fff" />
          <br />
          claims: <i className="icon-claims" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/claims.svg')}
            width="17"
          />
          <Claims width="17" fill="#fff" />
          <br />
          claims2: <i className="icon-claims2" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/claims2.svg')}
            width="17"
          />
          <Claims2 width="17" fill="#fff" />
          <br />
          close: <i className="icon-close" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/close.svg')}
            width="17"
          />
          <Close width="17" fill="#fff" />
          <br />
          down: <i className="icon-down" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/down.svg')}
            width="17"
          />
          <Down width="17" fill="#fff" />
          <br />
          evaluators-active: <i className="icon-evaluators-active" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/evaluatorsActive.svg')}
            width="17"
          />
          <EvaluatorsActive width="17" fill="#fff" />
          <br />
          evaluators: <i className="icon-evaluators" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/evaluators.svg')}
            width="17"
          />
          <Evaluators width="17" fill="#fff" />
          <br />
          expand: <i className="icon-expand" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/expand.svg')}
            width="17"
          />
          <Expand width="17" fill="#fff" />
          <br />
          export: <i className="icon-export" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/export.svg')}
            width="17"
          />
          <Export width="17" fill="#fff" />
          <br />
          facebook: <i className="icon-facebook" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/facebook.svg')}
            width="17"
          />
          <Facebook width="17" fill="#fff" />
          <br />
          favourite-active: <i className="icon-favourite-active" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/favouriteActive.svg')}
            width="17"
          />
          <FavouriteActive width="17" fill="#fff" />
          <br />
          funding: <i className="icon-funding" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/funding.svg')}
            width="17"
          />
          <Funding width="17" fill="#fff" />
          <br />
          github: <i className="icon-github" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/github.svg')}
            width="17"
          />
          <Github width="17" fill="#fff" />
          <br />
          heart: <i className="icon-heart" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/heart.svg')}
            width="17"
          />
          <Heart width="17" fill="#fff" />
          <br />
          home-active: <i className="icon-home-active" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/homeActive.svg')}
            width="17"
          />
          <HomeActive width="17" fill="#fff" />
          <br />
          home: <i className="icon-home" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/home.svg')}
            width="17"
          />
          <Home width="17" fill="#fff" />
          <br />
          impacts: <i className="icon-impacts" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/impacts.svg')}
            width="17"
          />
          <Impacts width="17" fill="#fff" />
          <br />
          indicator-down: <i className="icon-indicator-down" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/indicatorDown.svg')}
            width="17"
          />
          <IndicatorUp width="17" fill="#fff" />
          <br />
          indicator-up: <i className="icon-indicator-up" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/indicatorUp.svg')}
            width="17"
          />
          <IndicatorDown width="17" fill="#fff" />
          <br />
          info: <i className="icon-info" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/info.svg')}
            width="17"
          />
          <Info width="17" fill="#fff" />
          <br />
          instagram: <i className="icon-instagram" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/instagram.svg')}
            width="17"
          />
          <Instagram width="17" fill="#fff" />
          <br />
          logo-ixo: <i className="icon-logo-ixo" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/logoIxo.svg')}
            width="17"
          />
          <LogoIxo width="17" fill="#fff" />
          <br />
          ixo-x: <i className="icon-ixo-x" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/ixoX.svg')}
            width="17"
          />
          <IxoX width="17" fill="#fff" />
          <br />
          kyc: <i className="icon-kyc" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/kyc.svg')}
            width="17"
          />
          <Kyc width="17" fill="#fff" />
          <br />
          linkedin: <i className="icon-linkedin" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/linkedin.svg')}
            width="17"
          />
          <Linkedin width="17" fill="#fff" />
          <br />
          location: <i className="icon-location" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/location.svg')}
            width="17"
          />
          <Location width="17" fill="#fff" />
          <br />
          medium: <i className="icon-medium" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/medium.svg')}
            width="17"
          />
          <Medium width="17" fill="#fff" />
          <br />
          pending: <i className="icon-pending" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/pending.svg')}
            width="17"
          />
          <Pending width="17" fill="#fff" />
          <br />
          plus: <i className="icon-plus" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/plus.svg')}
            width="17"
          />
          <Plus width="17" fill="#fff" />
          <br />
          projects: <i className="icon-projects" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/projects.svg')}
            width="17"
          />
          <Project width="17" fill="#fff" />
          <br />
          register-no: <i className="icon-register-no" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/registerNo.svg')}
            width="17"
          />
          <RegisterNo width="17" fill="#fff" />
          <br />
          registration-yes: <i className="icon-registration-yes" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/registrationYes.svg')}
            width="17"
          />
          <RegistrationYes width="17" fill="#fff" />
          <br />
          rejected: <i className="icon-rejected" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/rejected.svg')}
            width="17"
          />
          <Rejected width="17" fill="#fff" />
          <br />
          rejectedcross: <i className="icon-rejectedcross" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/rejectedcross.svg')}
            width="17"
          />
          <RejectedCross width="17" fill="#fff" />
          <br />
          sdg-affordableenergy: <i className="icon-sdg-affordableenergy" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgAffordableenergy.svg')}
            width="17"
          />
          <br />
          sdg-cleanwater: <i className="icon-sdg-cleanwater" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgCleanwater.svg')}
            width="17"
          />
          <br />
          sdg-climateaction: <i className="icon-sdg-climateaction" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgClimateaction.svg')}
            width="17"
          />
          <br />
          sdg-consumption: <i className="icon-sdg-consumption" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgConsumption.svg')}
            width="17"
          />
          <br />
          sdg-decentwork: <i className="icon-sdg-decentwork" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgDecentwork.svg')}
            width="17"
          />
          <br />
          sdg-genderequality: <i className="icon-sdg-genderequality" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgGenderequality.svg')}
            width="17"
          />
          <br />
          sdg-goodhealth: <i className="icon-sdg-goodhealth" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgGoodhealth.svg')}
            width="17"
          />
          <br />
          sdg-industry: <i className="icon-sdg-industry" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgIndustry.svg')}
            width="17"
          />
          <br />
          sdg-lifebelowwater: <i className="icon-sdg-lifebelowwater" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgLifebelowwater.svg')}
            width="17"
          />
          <br />
          sdg-lifeonland: <i className="icon-sdg-lifeonland" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgLifeonland.svg')}
            width="17"
          />
          <br />
          sdg-nopoverty: <i className="icon-sdg-nopoverty" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgNopoverty.svg')}
            width="17"
          />
          <br />
          sdg-partnership: <i className="icon-sdg-partnership" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgPartnership.svg')}
            width="17"
          />
          <br />
          sdg-peace: <i className="icon-sdg-peace" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgPeace.svg')}
            width="17"
          />
          <br />
          sdg-qualityeducation: <i className="icon-sdg-qualityeducation" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgQualityeducation.svg')}
            width="17"
          />
          <br />
          sdg-reduced: <i className="icon-sdg-reduced" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgReduced.svg')}
            width="17"
          />
          <br />
          sdg-sustainablecities: <i className="icon-sdg-sustainablecities" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgSustainablecities.svg')}
            width="17"
          />
          <br />
          sdg-zerohunger: <i className="icon-sdg-zerohunger" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/sdgZerohunger.svg')}
            width="17"
          />
          <br />
          search: <i className="icon-search" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/search.svg')}
            width="17"
          />
          <br />
          serviceproviders-active:{' '}
          <i className="icon-serviceproviders-active" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/serviceprovidersActive.svg')}
            width="17"
          />
          <br />
          serviceproviders: <i className="icon-serviceproviders" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/serviceproviders.svg')}
            width="17"
          />
          <br />
          settings-active: <i className="icon-settings-active" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/settingsActive.svg')}
            width="17"
          />
          <SettingsActive width="17" fill="#fff" />
          <br />
          share: <i className="icon-share" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/share.svg')}
            width="17"
          />
          <br />
          success: <i className="icon-success" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/success.svg')}
            width="17"
          />
          <br />
          telegram: <i className="icon-telegram" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/telegram.svg')}
            width="17"
          />
          <br />
          trash: <i className="icon-trash" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/trash.svg')}
            width="17"
          />
          <br />
          twitter: <i className="icon-twitter" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/twitter.svg')}
            width="17"
          />
          <br />
          upload: <i className="icon-upload" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/upload.svg')}
            width="17"
          />
          <br />
          world: <i className="icon-world" />{' '}
          <img
            src={require('../../assets/icons/icons-as-svg/world.svg')}
            width="17"
          />
          <br />
        </div>
      </div>
    </IconsContainer>
  )
}
