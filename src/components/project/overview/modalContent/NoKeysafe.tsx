import * as React from 'react';
import styled from 'styled-components';
import { ButtonTypes, Button } from 'common/components/Form/Buttons';

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

  hr {
    background: #004c61;
    height: 1.5px;
  }

  > span {
    font-size: 12px;
    font-family: ${/*eslint-disable-line*/ props =>
    props.theme.fontRobotoCondensed};
    display: block;
    text-align: center;
  }
`;

const KeySafeLink = styled.a`
  color: white;
  text-decoration: underline;
  font-size: 13px;
  display: block;
  text-align: center;
  font-weight: 200;

  :hover {
    color: ${/*eslint-disable-line*/ props => props.theme.ixoBlue};
  }
`;

const Container = styled.div`
  max-width: 360px;
  font-family: ${/*eslint-disable-line*/ props => props.theme.fontRoboto};

  p {
    font-weight: 200;
  }
`;

const AppImages = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const AppImg = styled.img`
  width: 115px;
  margin-right: 10px;
`;

export interface ParentProps {
  role: string
}

export const NoKeysafe: React.SFC<ParentProps> = ({ role }) => {
  const renderByLine = (): JSX.Element | string => {
    switch (role) {
      case 'SA':
        return (
          <p>
            Service Providers work on projects and make claims about their
            contributions.{' '}
          </p>
        );
      case 'EA':
        return (
          <p>
            {' '}
            Evaluators are individuals or entities with knowledge and experience
            in any given field. Using this experience, your role is to approve
            or reject the claims submmitted on the project.
          </p>
        );
      default:
        return 'role not found';
    }
  };

  return (
    <Container>
      {renderByLine()}
      <BorderBox>
        <h3>
          <div>
            <i className="icon-pending" />
          </div>
          <div>
            You need to install the ixo Keysafe and{' '}
            <span>refresh your browser</span>
          </div>
        </h3>
        <p>
          ixo Keysafe is a browser extension that enables you to connect to the
          ixo blockchain
        </p>
        <Button
          type={ButtonTypes.dark}
          href="https://chrome.google.com/webstore/detail/ixo-keysafe/nnlfaleaeoefglohpacnfgoeldfakkjk"
          target="_blank"
        >
          install ixo Keysafe
        </Button>
        <KeySafeLink
          href="https://medium.com/ixo-blog/the-ixo-keysafe-kyc-and-becoming-an-ixo-member-ef33d9e985b6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tell me more about the ixo keysafe
        </KeySafeLink>
        <hr />
        <span>OR REGISTER VIA IXO MOBILE</span>
        <AppImages>
          <a
            href="https://play.google.com/store/apps/details?id=com.ixo&hl=en"
            rel="noopener noreferrer"
          >
            <AppImg
              src={require('../../../../assets/images/home/googlePlay.png')}
              alt="Play Store"
            />
          </a>
          <a
            href="https://itunes.apple.com/za/app/ixo/id1441394401?mt=8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppImg
              src={require('../../../../assets/images/home/appleStore.png')}
              alt="Apple Store"
            />
          </a>
        </AppImages>
      </BorderBox>
    </Container>
  );
};
