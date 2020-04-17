import * as React from 'react'
import { SingleStatistic } from '../../common/SingleStatistic'
import { Statistic, StatType, AgentRoles } from '../../../types/models'
import { ModalWrapper } from '../../common/ModalWrapper'
import { NewAgent } from './modalContent/NewAgent'
import { UserInfo } from '../../../modules/account/types'
import { Button, ButtonTypes } from '../../common/Buttons'
import { Fragment } from 'react'
import QRComponent from '../../common/QRComponent'
import ReactMd from 'react-md-file'
import { ProjectFounder } from './ProjectFounder'
import { NoKeysafe } from './modalContent/NoKeysafe'
import { DesktopChrome } from './modalContent/DesktopChrome'
import { isBrowser } from 'react-device-detect'
import { NotLedgered } from './modalContent/NotLedgered'
import { Header } from '../../../types/models'
import Share from '../../../assets/icons/Share'
import Twitter from '../../../assets/icons/Twitter'
import Facebook from '../../../assets/icons/Facebook'
import World from '../../../assets/icons/World'
import Instagram from 'src/assets/icons/Instagram'
import ProfileCard from '../ProfileCard/ProfileCard'
import {
  BlueBold,
  AgentIcon,
  ProjectImage,
  OverviewContainer,
  Text,
  Social,
  Sidebar,
  BarContainer,
  Claims,
  StatisticsContainer,
  LocalButton,
  Visible,
  Hidden,
  Disputed,
  ImpactAction,
  DarkBar,
  ProfileCardsSection,
  ProfileCardsWrapper,
} from './ProjectOverview.style'

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

export type Props = ParentProps

export const ProjectOverview: React.SFC<Props> = props => {
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

  const submitAgent = (role: string, agentData: any): void => {
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

  const renderModalHeader = (): Header => {
    return {
      title: props.modalData.title,
      subtitle: props.modalData.subtitle,
      icon: props.modalData.icon,
      width: '360',
    }
  }

  const handleRenderFuelButton = (): JSX.Element => {
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
        onClick={(): void => props.toggleModal(modalData, true)}
      >
        HELP FUEL THIS PROJECT
      </Button>
    )
  }

  const handleRenderEvaluatorButton = (): JSX.Element | string => {
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
          onClick={(): void => props.toggleModal(modalData, true)}
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
          onClick={(): void => props.toggleModal(modalData, true)}
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
          closeModal={(): void => props.toggleModal(null, false)}
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
          onClick={(): void => props.toggleModal(modalData, true)}
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
    // 					onClick={():void => props.toggleModal(modalData, true)}
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
          onClick={(): void => props.toggleModal(modalData, true)}
        >
          Become an evaluator
        </Button>
      )
    }
  }

  const handleRenderServiceProviderButton = (): JSX.Element | null => {
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
          onClick={(): void => props.toggleModal(modalData, true)}
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
          onClick={(): void => props.toggleModal(modalData, true)}
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
          closeModal={(): void => props.toggleModal(null, false)}
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
          onClick={(): void => props.toggleModal(modalData, true)}
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
      return null
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
          onClick={(): void => props.toggleModal(modalData, true)}
        >
          Become a Service Provider
        </Button>
      )
    }
  }

  const onProjectImageNotFound = (evt): void => {
    evt.target.src = require('../../../assets/images/ixo-placeholder-large.jpg')
  }

  const shareToTwitter = (): void => {
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
        handleToggleModal={(): void => props.toggleModal({})}
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
              {props.project.users && (
                <ProfileCardsSection>
                  <h3>Profile Card</h3>
                  <ProfileCardsWrapper>
                    {props.project.users.map(user => {
                      return <ProfileCard key={user.name} user={user} />
                    })}
                  </ProfileCardsWrapper>
                </ProfileCardsSection>
              )}
              <Social>
                {props.project.socialMedia.instagramLink && (
                  <a
                    href={props.project.socialMedia.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram width="17" />
                  </a>
                )}
                {props.project.socialMedia.twitterLink && (
                  <a
                    href={props.project.socialMedia.twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter width="17" />
                  </a>
                )}
                {props.project.socialMedia.facebookLink && (
                  <a
                    href={props.project.socialMedia.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook width="17" />
                  </a>
                )}
                {props.project.socialMedia.webLink && (
                  <a
                    href={props.project.socialMedia.webLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <World width="17" />
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
              <LocalButton>
                <Visible>
                  <Share width="22" />
                  SHARE THIS PROJECT
                </Visible>
                <Hidden>
                  <Twitter onClick={shareToTwitter} width="22" />
                </Hidden>
              </LocalButton>
              <QRComponent url={location.href} />
            </div>
          </div>
        </div>
      </OverviewContainer>
      {props.project.founder && props.project.founder.name !== '' && (
        <ProjectFounder founder={props.project.founder} />
      )}
    </div>
  )
}
