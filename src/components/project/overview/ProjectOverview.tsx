import * as React from 'react'
import { AgentRoles } from '../../../types/models'
import { ModalWrapper } from '../../common/ModalWrapper'
import { UserInfo } from '../../../modules/Account/types'
import ReactMd from 'react-md-file'
import { ProjectFounder } from '../ProjectFounder/ProjectFounder'
import { Header } from '../../../types/models'
import ProfileCard from '../ProfileCard/ProfileCard'
import ControlPanel from '../ControlPanel/ControlPanel'
import {
  ProjectImage,
  OverviewContainer,
  Text,
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
  const renderModalHeader = (): Header => {
    return {
      title: props.modalData.title,
      subtitle: props.modalData.subtitle,
      icon: props.modalData.icon,
      width: '360',
    }
  }

  const onProjectImageNotFound = (evt): void => {
    evt.target.src = require('../../../assets/images/ixo-placeholder-large.jpg')
  }

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
            <div className="col-lg-7">
              <ProjectImage
                src={props.imageLink}
                onError={onProjectImageNotFound}
              />
              <Text>
                <ReactMd markdown={props.project.longDescription} />
              </Text>
              {props.project.users && (
                <>
                  <hr />
                  <ProfileCardsSection>
                    <h3>Profile section</h3>
                    <ProfileCardsWrapper>
                      {props.project.users.map(user => {
                        return <ProfileCard key={user.name} user={user} />
                      })}
                    </ProfileCardsWrapper>
                  </ProfileCardsSection>
                </>
              )}
              {props.project.founder && props.project.founder.name !== '' && (
                <>
                  <hr />
                  <h3>Project Founder</h3>
                  <ProjectFounder
                    founder={props.project.founder}
                    socialMedia={props.project.socialMedia}
                  />
                </>
              )}
            </div>
            <div className="col-lg-5">
              <ControlPanel />
            </div>
          </div>
        </div>
      </OverviewContainer>
    </div>
  )
}
