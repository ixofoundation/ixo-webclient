import * as React from 'react'
import styled from 'styled-components'
import { ButtonTypes, Button } from 'common/components/Form/Buttons'
import { getIxoWorldRoute } from 'common/utils/formatters'

const BorderBox = styled.div`
  border: 1px solid #004c61;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
  h3 {
    display: flex;
    font-size: 15px;
    font-weight: normal;
    text-transform: uppercase;
    font-family: ${/*eslint-disable-line*/ props =>
      props.theme.fontRobotoCondensed};
    margin-bottom: 20px;
    i {
      font-size: 36px;
      margin-right: 10px;

      :before {
        color: ${/*eslint-disable-line*/ props => props.theme.ixoBlue};
      }
    }

    span {
      color: ${/*eslint-disable-line*/ props => props.theme.ixoBlue};
    }
  }

  p {
    font-size: 13px;
  }

  > span {
    font-size: 12px;
    font-family: ${/*eslint-disable-line*/ props =>
      props.theme.fontRobotoCondensed};
    display: block;
    text-align: center;
  }
`

const KeySafeLink = styled.a`
  color: white;
  text-decoration: underline;
  font-size: 13px;
  display: block;
  text-align: center;
  font-weight: 200;
`

const Container = styled.div`
  max-width: 360px;
  font-family: ${/*eslint-disable-line*/ props => props.theme.fontRoboto};

  p {
    font-weight: 200;
  }
`

export const NoKYC: React.SFC = () => {
  return (
    <Container>
      <p>
        Evaluators are individuals or entities with knowledge and experience in
        any given field. Using this experience, your role is to approve or
        reject the claims submmitted on the project.
      </p>
      <BorderBox>
        <h3>
          <div>
            <i className="icon-pending" />
          </div>
          <div>All Evaluators must have an ixo Membership Credential</div>
        </h3>
        <Button type={ButtonTypes.dark} href={getIxoWorldRoute('/membership')}>
          become a member
        </Button>
        <KeySafeLink
          href="https://medium.com/ixo-blog/the-ixo-keysafe-kyc-and-becoming-an-ixo-member-ef33d9e985b6"
          target="_blank"
        >
          Why do I need to become a member?
        </KeySafeLink>
      </BorderBox>
    </Container>
  )
}
