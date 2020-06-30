import * as React from 'react'
import styled from 'styled-components'
import { ButtonTypes, Button } from 'src/common/components/Form/Buttons'
import Success from '../../../../assets/icons/Success'

const ModalData = styled.div`
  max-width: 380px;
  text-align: center;
  padding: 20px 20px 30px;

  h3 {
    margin-top: 10px;
    font-size: 18px;
    font-family: ${/* eslint-disable-line */ props =>
      props.theme.fontRobotoCondensed};
  }

  p {
    font-size: 15px;
    font-weight: 300;

    span {
      color: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
    }
  }
`

const InfoLink = styled.a`
  color: white;
  font-size: 12px;
  text-decoration: underline;

  :hover {
    color: ${/* eslint-disable-line */ props => props.theme.ixoBlue};
  }
`

const Container = styled.div`
  max-width: 360px;
  font-family: ${/* eslint-disable-line */ props => props.theme.fontRoboto};

  p {
    font-weight: 200;
  }
`

export interface ParentProps {
  modalResponse: string
  closeModal: () => void
  ledgerDid: () => void
}

export const NotLedgered: React.SFC<ParentProps> = props => {
  if (props.modalResponse.length > 0) {
    return (
      <Container>
        <ModalData>
          <p>{props.modalResponse}</p>
          <Button
            type={ButtonTypes.dark}
            onClick={(): void => props.closeModal()}
          >
            CONTINUE
          </Button>
        </ModalData>
      </Container>
    )
  } else {
    return (
      <Container>
        <ModalData>
          <Success width="64" fill="#49BFE0" />
          <h3>YOU HAVE SUCCESSFULLY INSTALLED THE IXO KEYSAFE</h3>
          <p>
            <span>LAST STEP - </span>create your self-sovereign credentials on
            the ixo blockchain.
          </p>
          <Button type={ButtonTypes.dark} onClick={props.ledgerDid}>
            SIGN NOW USING KEYSAFE
          </Button>
          <InfoLink
            href="https://medium.com/ixo-blog/the-ixo-keysafe-kyc-and-becoming-an-ixo-member-ef33d9e985b6"
            target="_blank"
          >
            Why do I need to sign my credentials?
          </InfoLink>
        </ModalData>
      </Container>
    )
  }
}
