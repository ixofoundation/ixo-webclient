import * as React from 'react'
import { ProgressBar } from '../../common/ProgressBar'
import { deviceWidth } from '../../../lib/commonData'
import styled from 'styled-components'
import { SingleStatistic } from '../../common/SingleStatistic'
import { Statistic, StatType, AgentRoles } from '../../../types/models'
import { ModalWrapper } from '../../common/ModalWrapper'
import { NewAgent } from './modalContent/NewAgent'
import { UserInfo } from '../../../types/models'
import { Button, ButtonTypes } from '../../common/Buttons'
import { Fragment } from 'react'
import QRComponent from '../../common/QRComponent'
import ReactMd from 'react-md-file'
import { ProjectFounder } from './ProjectFounder'
import { NoKeysafe } from './modalContent/NoKeysafe'
import { DesktopChrome } from './modalContent/DesktopChrome'
import { isBrowser } from 'react-device-detect'
import { NotLedgered } from './modalContent/NotLedgered'

const placeholder = require('../../../assets/images/ixo-placeholder-large.jpg')

const OverviewContainer = styled.section`
  margin-top: -86px;
  background: ${props => props.theme.bg.lightGrey};
  color: white;
  padding-bottom: 40px;
`

const ProjectImage = styled.img`
  width: 100%;
  box-shadow: 0px 10px 35px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 22px;
`

const DarkBar = styled(ProgressBar)``

const BarContainer = styled.div`
  text-align: right;

  div {
    height: 2px;
    background-color: #033c50;
  }

  div div {
    height: 4px;
    position: relative;
    top: -1px;
    z-index: 1;
  }

  span {
    font-size: 15px;
    color: white;
    font-weight: 400;
    background: ${props => props.theme.ixoOrange};
    font-family: ${props => props.theme.fontRobotoCondensed};
    padding: 0px 20px;
    border-radius: 3px;
    display: inline-flex;
    margin-bottom: 14px;
  }
`

const Sidebar = styled.div`
	background: ${props => props.theme.bg.gradientBlue};
	padding: 14px 15px 15px;
	box-shadow: 0px 15px 35px 0px rgba(0,0,0,0.35);
	margin-bottom: 35px;

	hr {
		height: 1px;
		border-radius: 2px;
		background-color: #033C50;}
	}
`

const StatisticsContainer = styled.div`
  div {
    padding: 0;
  }
  span {
    font-size: 15px;
  }
`

const Claims = styled.h4`
  font-weight: 100;
  font-size: 30px;
  margin: 15px 0 0;
  line-height: 1;

  strong {
    font-weight: 500;
  }
`
const ImpactAction = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`

const Disputed = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: 100;

  strong {
    font-weight: bold;
  }
`

const Text = styled.div`
  color: ${props => props.theme.fontDarkGrey};
  font-size: 16px;
  line-height: 30px;
`

const Social = styled.div`
  margin: 10px 0 20px;
  display: flex;
  justify-content: space-evenly;

  @media (min-width: ${deviceWidth.tablet}px) {
    margin-top: 10px;
    display: block;
  }

  i {
    font-size: 17px;
    margin-right: 28px;

    transition: transform 0.3s ease;
  }

  i:before {
    color: ${props => props.theme.fontDarkGrey};
  }

  i:hover:before {
    cursor: pointer;
    color: ${props => props.theme.darkGrey};
  }

  a:hover {
    text-decoration: none;
  }
`

const Hidden = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  opacity: 0;
  i {
    color: #282828;
    top: auto;
    margin: 0 8px;
    font-size: 20px;
  }
  .icon-facebook:hover:before {
    color: #4a67ad;
  }
  .icon-twitter:hover:before {
    color: #4ca0eb;
  }
`

const Visible = styled.div`
  i {
    font-size: 21px;
    position: relative;
    top: 3px;
    margin-right: 10px;
  }
  transition: opacity 0.3s ease;
`

const LocalButton = styled.a`
  border: 1px solid #b8b8b8;
  &&& {
    color: ${props => props.theme.fontGrey};
  }
  font-size: 16px;
  text-transform: uppercase;
  padding: 5px 20px;
  background: none;
  margin: 0 0 30px;
  width: 100%;
  font-family: ${props => props.theme.fontRobotoCondensed};
  font-weight: 500;
  display: inline-block;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  i:before {
    color: ${props => props.theme.fontGrey};
  }
  :hover {
    ${Visible} {
      opacity: 0;
    }
    ${Hidden} {
      opacity: 1;
    }
  }
`

const BlueBold = styled.strong`
  color: ${props => props.theme.ixoBlue};
`

const AgentIcon = styled.i`
  :before {
    color: ${props => props.theme.ixoBlue};
  }
`

export interface ParentProps {
  userInfo: UserInfo
  project: any
  isModalOpen: boolean
  modalData: any
  checkUserDid: () => boolean
  createAgent: (agentData: any) => void
  toggleModal: (data?: any, modalStatus?: boolean) => void
  hasCapability: (Role: [AgentRoles]) => boolean
  ledgerDid: () => void
  imageLink: string
  projectStatus: string
  ledger: {
    modalResponse: string
    isLedgering: boolean
  }
}

export const ProjectOverview: React.SFC<ParentProps> = props => {
  const { evaluators, serviceProviders } = props.project.agentStats
  const statistics: Statistic[] = [
    {
      type: StatType.decimal,
      descriptor: [{ class: 'text', value: 'Evaluators' }],
      amount: evaluators,
    },
    {
      type: StatType.decimal,
      descriptor: [{ class: 'text', value: 'Service providers' }],
      amount: serviceProviders,
    },
  ]

  const submitAgent = (role: string, agentData: any) => {
    const agentCreateJson: any = { ...agentData, role: role }
    props.createAgent(agentCreateJson)
    props.toggleModal({})
  }

  // const titleMap = {
  // 	[AgentRoles.investors]: 'Become an Investor',
  // 	[AgentRoles.evaluators]: 'Become an Evaluator',
  // 	[AgentRoles.serviceProviders]: 'Become a Service Agent',
  // };

  // const renderSubtitle = (role: string) => {
  // 	return titleMap[role];
  // };

  const renderModalHeader = () => {
    return {
      title: props.modalData.title,
      subtitle: props.modalData.subtitle,
      icon: props.modalData.icon,
      width: '360',
    }
  }

  const handleRenderFuelButton = () => {
    const content = (
      <Fragment>
        <p>
          Interested in funding <BlueBold>{props.project.title}</BlueBold>?
          <br />
          Please contact the project founder below
        </p>{' '}
        <br />
        <Button
          type={ButtonTypes.dark}
          href={`mailto:${props.project.ownerEmail}`}
        >
          GET IN CONTACT
        </Button>
      </Fragment>
    )
    const modalData = {
      title: 'HELP FUEL THIS PROJECT',
      icon: <i className="icon-ixo-x" />,
      content: content,
    }

    return (
      <Button
        type={ButtonTypes.dark}
        disabled={false}
        onClick={() => props.toggleModal(modalData, true)}
      >
        HELP FUEL THIS PROJECT
      </Button>
    )
  }

  const handleRenderEvaluatorButton = () => {
    if (navigator.userAgent.indexOf('Chrome') === -1 || isBrowser === false) {
      const modalData = {
        title: 'APPLY TO EVALUATE THIS PROJECT',
        icon: <AgentIcon className="icon-evaluators" />,
        content: <DesktopChrome role={AgentRoles.evaluators} />,
      }
      return (
        <Button
          type={ButtonTypes.dark}
          disabled={false}
          onClick={() => props.toggleModal(modalData, true)}
        >
          Become an evaluator
        </Button>
      )
    }
    if (props.userInfo === null) {
      const modalData = {
        title: 'APPLY TO EVALUATE THIS PROJECT',
        icon: <AgentIcon className="icon-evaluators" />,
        content: <NoKeysafe role={AgentRoles.evaluators} />,
      }
      return (
        <Button
          type={ButtonTypes.dark}
          disabled={false}
          onClick={() => props.toggleModal(modalData, true)}
        >
          Become an evaluator
        </Button>
      )
    }
    if (props.userInfo.ledgered === false) {
      const content = (
        <NotLedgered
          ledgerDid={props.ledgerDid}
          modalResponse={props.ledger.modalResponse}
          closeModal={() => props.toggleModal(null, false)}
        />
      )
      const modalData = {
        title: 'APPLY TO EVALUATE THIS PROJECT',
        icon: <AgentIcon className="icon-evaluators" />,
        content: content,
      }
      return (
        <Button
          type={ButtonTypes.dark}
          disabled={false}
          onClick={() => props.toggleModal(modalData, true)}
        >
          Become an evaluator
        </Button>
      )
    }
    // 		if (props.userInfo.hasKYC === false) {
    // 			const modalData = {
    // 				title: 'APPLY TO EVALUATE THIS PROJECT',
    // 				icon: <AgentIcon className="icon-evaluators" />,
    // 				content: <NoKYC />
    // 			};
    // 			return (
    // 				<Button
    // 					type={ButtonTypes.dark}
    // 					disabled={false}
    // 					onClick={() => props.toggleModal(modalData, true)}
    // 				>Become an evaluator
    // 				</Button>
    // 			);
    // 		}
    if (props.hasCapability([AgentRoles.evaluators])) {
      return (
        <Button type={ButtonTypes.dark} disabled={true}>
          You are an evaluator
        </Button>
      )
    } else if (props.hasCapability([AgentRoles.serviceProviders])) {
      return ''
    } else {
      let userName = ''
      if (props.userInfo) {
        userName = props.userInfo.name.valueOf()
      }
      const content = (
        <NewAgent
          submitAgent={submitAgent}
          role={AgentRoles.evaluators}
          name={userName}
        />
      )
      const modalData = {
        title: 'APPLY TO EVALUATE THIS PROJECT',
        icon: <AgentIcon className="icon-evaluators" />,
        content: content,
      }
      return (
        <Button
          type={ButtonTypes.dark}
          disabled={false}
          onClick={() => props.toggleModal(modalData, true)}
        >
          Become an evaluator
        </Button>
      )
    }
  }

  const handleRenderServiceProviderButton = () => {
    if (navigator.userAgent.indexOf('Chrome') === -1 || isBrowser === false) {
      const modalData = {
        title: 'SERVICE THIS PROJECT',
        icon: <AgentIcon className="icon-serviceproviders" />,
        content: <DesktopChrome role={AgentRoles.serviceProviders} />,
      }
      return (
        <Button
          type={ButtonTypes.dark}
          disabled={false}
          onClick={() => props.toggleModal(modalData, true)}
        >
          Become a Service Provider
        </Button>
      )
    }
    if (props.userInfo === null) {
      const modalData = {
        title: 'SERVICE THIS PROJECT',
        icon: <AgentIcon className="icon-serviceproviders" />,
        content: <NoKeysafe role={AgentRoles.serviceProviders} />,
      }
      return (
        <Button
          type={ButtonTypes.dark}
          disabled={false}
          onClick={() => props.toggleModal(modalData, true)}
        >
          Become a Service Provider
        </Button>
      )
    }
    if (props.userInfo.ledgered === false) {
      const content = (
        <NotLedgered
          ledgerDid={props.ledgerDid}
          modalResponse={props.ledger.modalResponse}
          closeModal={() => props.toggleModal(null, false)}
        />
      )
      const modalData = {
        title: 'SERVICE THIS PROJECT',
        icon: <AgentIcon className="icon-serviceproviders" />,
        content: content,
      }
      return (
        <Button
          type={ButtonTypes.dark}
          disabled={false}
          onClick={() => props.toggleModal(modalData, true)}
        >
          Become a Service Provider
        </Button>
      )
    }
    if (props.hasCapability([AgentRoles.serviceProviders])) {
      return (
        <Button type={ButtonTypes.dark} disabled={true}>
          You are a service provider
        </Button>
      )
    } else if (props.userInfo == null) {
      return (
        <Button type={ButtonTypes.dark} disabled={true}>
          Become a Service Provider
        </Button>
      )
    } else if (props.hasCapability([AgentRoles.evaluators])) {
      return ''
    } else {
      let userName = ''
      if (props.userInfo) {
        userName = props.userInfo.name.valueOf()
      }
      const content = (
        <NewAgent
          submitAgent={submitAgent}
          role={AgentRoles.serviceProviders}
          name={userName}
        />
      )
      const modalData = {
        title: 'SERVICE THIS PROJECT',
        icon: <AgentIcon className="icon-serviceproviders" />,
        content: content,
      }

      return (
        <Button
          type={ButtonTypes.dark}
          disabled={false}
          onClick={() => props.toggleModal(modalData, true)}
        >
          Become a Service Provider
        </Button>
      )
    }
  }

  const onProjectImageNotFound = evt => {
    evt.target.src = placeholder
  }

  const shareToTwitter = () => {
    const url = location.href
    const text =
      'It’s up to all of us to start making an impact for a positive future for humanity. Check out this venture that aims to achieve the global SDGs. If you think it’s a worthy cause, then like or share this post to show your support.'
    window.open(
      'http://twitter.com/share?url=' +
        encodeURIComponent(url) +
        '&text=' +
        encodeURIComponent(text),
      '',
      'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0',
    )
  }

  // const shareToFacebook = () => {
  // 	// @ts-ignore
  // 	FB.ui({
  // 		method: 'share',
  // 		href: location.href
  // 	});
  // };

  return (
    <div>
      <ModalWrapper
        isModalOpen={props.isModalOpen}
        handleToggleModal={() => props.toggleModal({})}
        header={renderModalHeader()}
      >
        {props.modalData.content}
      </ModalWrapper>
      <OverviewContainer className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <ProjectImage
                src={props.imageLink}
                onError={onProjectImageNotFound}
              />
              <Text>
                <ReactMd markdown={props.project.longDescription} />
              </Text>
              <Social>
                {props.project.socialMedia.instagramLink && (
                  <a
                    href={props.project.socialMedia.instagramLink}
                    target="_blank"
                  >
                    <i className="icon-instagram" />
                  </a>
                )}
                {props.project.socialMedia.twitterLink && (
                  <a
                    href={props.project.socialMedia.twitterLink}
                    target="_blank"
                  >
                    <i className="icon-twitter" />
                  </a>
                )}
                {props.project.socialMedia.facebookLink && (
                  <a
                    href={props.project.socialMedia.facebookLink}
                    target="_blank"
                  >
                    <i className="icon-facebook" />
                  </a>
                )}
                {props.project.socialMedia.webLink && (
                  <a href={props.project.socialMedia.webLink} target="_blank">
                    <i className="icon-world" />
                  </a>
                )}
              </Social>
            </div>
            <div className="col-md-4">
              <Sidebar>
                <BarContainer>
                  {props.projectStatus === 'CREATED' && <span>PENDING</span>}
                  <DarkBar
                    total={props.project.requiredClaims}
                    approved={props.project.claimStats.currentSuccessful}
                    rejected={props.project.claimStats.currentRejected}
                  />
                </BarContainer>
                {props.project.requiredClaims === 0 ? (
                  <p style={{ marginTop: '20px' }}>
                    Project is launching in 2019
                  </p>
                ) : (
                  <Fragment>
                    <Claims>
                      {props.project.claimStats.currentSuccessful}/
                      <strong>{props.project.requiredClaims}</strong>
                    </Claims>
                    <ImpactAction>{props.project.impactAction}</ImpactAction>
                    <Disputed>
                      <strong>
                        {props.project.claimStats.currentRejected}
                      </strong>{' '}
                      disputed claims
                    </Disputed>
                  </Fragment>
                )}
                <hr />
                <div className="row">
                  {statistics.map((statistic, index) => {
                    return (
                      <StatisticsContainer
                        className="col-md-6 col-lg-4 col-4"
                        key={index}
                      >
                        <SingleStatistic
                          type={statistics[index].type}
                          amount={statistics[index].amount}
                          descriptor={statistics[index].descriptor}
                        />
                      </StatisticsContainer>
                    )
                  })}
                </div>
                {handleRenderFuelButton()}
                {handleRenderEvaluatorButton()}
                {handleRenderServiceProviderButton()}
              </Sidebar>
              {/* <LocalButton><i className="icon-heart"/>SAVE TO FAVOURITES</LocalButton> */}
              <LocalButton>
                <Visible>
                  <i className="icon-share" />
                  SHARE THIS PROJECT
                </Visible>
                <Hidden>
                  <i onClick={shareToTwitter} className="icon-twitter" />
                  {/* <i onClick={shareToFacebook} className="icon-facebook" /> */}
                </Hidden>
              </LocalButton>
              <QRComponent url={location.href} />
            </div>
          </div>
        </div>
      </OverviewContainer>
      <ProjectFounder founder={props.project.founder} />
    </div>
  )
}
