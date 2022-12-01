import * as React from 'react'
import { AgentRoles } from '../../../../types/models'
import { RegisterStatus } from './RegisterStatus'
import styled from 'styled-components'

const Container = styled.div`
  padding: 50px 0;
  color: #333c4e;

  h2 {
    font-family: ${/* eslint-disable-line */ (props) => props.theme.secondaryFontFamily};
    font-weight: 300;
  }

  i:before {
    color: #333c4e;
  }

  section {
    background: white;
    display: flex;
    flex-direction: column;
    padding-right: 30px;
    max-width: 100%;
  }

  strong {
    font-weight: 700;
  }
`

const ContainerWhite = styled.div`
  padding: 50px 0;
  color: white;

  h2 {
    font-family: ${/* eslint-disable-line */ (props) => props.theme.secondaryFontFamily};
    font-weight: 300;
  }

  i:before {
    color: white;
  }

  section {
    background: #053952;
    display: inline-flex;
    flex-direction: column;
    padding-right: 30px;
    max-width: 100%;
  }

  strong {
    font-weight: 700;
  }
`

export interface ParentProps {
  activeModal: any
  title: string
  icon: string
  role: AgentRoles
  KYC?: boolean
  invite?: boolean
  keysafe?: boolean
  blueBG?: boolean
}

export const TextBlock: React.SFC<ParentProps> = (props) => {
  if (props.blueBG === true) {
    return (
      <ContainerWhite>
        <h2>
          <i className={props.icon} /> {props.title}
        </h2>
        {props.children}
        <RegisterStatus
          activeModal={props.activeModal}
          role={props.role}
          hasKeySafe={props.keysafe}
          hasKYC={props.KYC}
        />
      </ContainerWhite>
    )
  } else {
    return (
      <Container>
        <h2>
          <i className={props.icon} /> {props.title}
        </h2>
        {props.children}
        <RegisterStatus
          activeModal={props.activeModal}
          role={props.role}
          hasKeySafe={props.keysafe}
          hasKYC={props.KYC}
        />
      </Container>
    )
  }
}
