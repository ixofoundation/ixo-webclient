import * as React from 'react'
import styled from 'styled-components'
import { UserInfo } from '../../modules/Account/types'
import { connect } from 'react-redux'
import { RootState } from '../../common/redux/types'
import { errorToast, successToast } from '../../common/utils/Toast'
import { ModalWrapper } from '../../common/components/Wrappers/ModalWrapper'
import { AgentRoles } from '../../types/models'
import { Banner } from './components/Banner'
import { TextBlock } from './components/TextBlock'
import { deviceWidth } from '../../lib/commonData'
import MediaQuery from 'react-responsive'
import { Button, ButtonTypes } from '../../common/components/Form/Buttons'
import { Header } from '../../types/models'
import Kyc from '../../assets/icons/Kyc'
import Claims from '../../assets/icons/Claims'
import blocksyncApi from 'common/api/blocksync-api/blocksync-api'
import keysafe from 'common/keysafe/keysafe'

const ModalContainer = styled.div`
  width: 360px;
  margin: 0 auto;
  max-width: 100%;
  padding-bottom: 20px;

  p {
    font-weight: 300;
  }

  a {
    margin: 30px 0;
  }
`

const Section = styled.div`
  background: #f6f6f6;
`

const RelativeCol = styled.div`
  position: relative;
`

const BlueRow = styled.div`
  background: ${/* eslint-disable-line */ (props) =>
    props.theme.bg.gradientBlue};
  margin-top: 0;

  @media (min-width: ${deviceWidth.desktop}px) {
    padding-top: 70px;
  }

  @media (min-width: ${deviceWidth.desktopLarge}px) {
    margin-top: -100px;
  }
`

const KeySafe = styled.img`
  margin-bottom: -50%;
  max-width: 616px;

  @media (min-width: ${deviceWidth.desktop}px) {
    position: absolute;
    top: 0;
    right: 0;
  }
`

const Amply = styled.img`
  max-width: 110%;
  margin-left: -5%;
  margin-top: 40px;
  position: relative;
  right: 20px;
`

const SmallIconCol = styled.div`
  h2 i {
    font-size: 25px;
  }
`

const BrowserIcon = styled.img`
  position: absolute;
  left: 10px;
  top: 2px;
  width: 36px;
`

export enum ModalData {
  invite = 'INVITE',
  kyc = 'KYC',
  keysafe = 'KEYSAFE',
}

export interface State {
  didDoc: any
  isModalOpen: boolean
  hasKeySafe: boolean
  hasDid: boolean
  hasKYC: boolean
  isDidLedgered: boolean
  activeModal: ModalData
  toastShown: boolean
}

export interface StateProps {
  userInfo: UserInfo
}

export type Props = StateProps

class RegisterPage extends React.Component<Props, State> {
  state = {
    didDoc: null,
    isModalOpen: false,
    hasKeySafe: false,
    hasDid: false,
    hasKYC: false,
    isDidLedgered: false,
    activeModal: null,
    toastShown: false,
  }

  private busyLedgering = false

  toggleModal = (activeModal: any, booleanVal: boolean): void => {
    this.setState({ isModalOpen: booleanVal, activeModal })
  }

  renderModal = (): JSX.Element => {
    if (this.state.activeModal === ModalData.keysafe) {
      return (
        <ModalContainer>
          <p>
            ixo Key Safe is your connection to the ixo blockchain. It is a
            secure identity vault that allows you to manage your profile and
            sign transactions on your projects.
          </p>
          <Button
            type={ButtonTypes.dark}
            href="https://chrome.google.com/webstore/detail/ixo-keysafe/nnlfaleaeoefglohpacnfgoeldfakkjk"
            target="_blank"
          >
            <BrowserIcon
              src={require('../../assets/images/register/chrome.png')}
              alt="Chrome"
            />{' '}
            DOWNLOAD FOR CHROME
          </Button>
          <Button
            type={ButtonTypes.dark}
            href="https://addons.mozilla.org/en-US/firefox/addon/ixo-keysafe/"
            target="_blank"
          >
            <BrowserIcon
              src={require('../../assets/images/register/firefox.png')}
              alt="Firefox"
            />{' '}
            DOWNLOAD FOR FIREFOX
          </Button>
        </ModalContainer>
      )
    } else if (this.state.activeModal === ModalData.kyc) {
      return (
        <ModalContainer>
          <p>
            Verifying your identity will enable you to create, evaluate and
            participate in ixo projects.
          </p>
          <Button
            target="_blank"
            href={process.env.REACT_APP_KYC_LINK}
            type={ButtonTypes.dark}
          >
            REGISTER
          </Button>
        </ModalContainer>
      )
    } else if (this.state.activeModal === ModalData.invite) {
      return (
        <ModalContainer>
          <p>
            If you have received communications from ixo inviting you to the
            beta phase, please go ahead and begin your membership process. If
            not, please send us an email, telling us a little about the project
            you would like to create and we will be in touch with next steps.
          </p>
          <Button type={ButtonTypes.dark} href="mailto:info@ixo.world">
            CONTACT IXO
          </Button>
        </ModalContainer>
      )
    } else {
      return null
    }
  }

  renderModalHeading = (): Header => {
    if (this.state.activeModal === ModalData.keysafe) {
      return {
        title: 'IXO KEY SAFE',
        subtitle: 'Your secure identity vault.',
        image: require('../../assets/images/register/ixo-keysafeIco.png'),
        width: '365',
      }
    } else if (this.state.activeModal === ModalData.kyc) {
      return {
        title: 'MEMBERSHIP REGISTRATION',
        icon: <Kyc width="50" />,
        width: '365',
      }
    } else if (this.state.activeModal === ModalData.invite) {
      return {
        title: 'INTERESTED IN CREATING YOUR OWN PROJECTS?',
        icon: <Claims width="50" />,
        width: '365',
      }
    } else {
      return null
    }
  }

  checkState(): void {
    // If the user has a keysafe and but the hasKeySafe not set then set state
    if (keysafe && !this.state.hasKeySafe) {
      keysafe.getDidDoc((error, response) => {
        if (error) {
          if (this.state.toastShown === false) {
            this.setState({ toastShown: true })
          }
        } else {
          const newDidDoc = {
            did: response.didDoc.did,
            pubKey: response.didDoc.pubKey,
            credentials: [],
          }
          this.setState({ hasKeySafe: true, hasDid: true, didDoc: newDidDoc })
        }
      })
    }

    // So has a client side didDoc, so lets check if it is ledgered
    if (this.state.didDoc && !this.state.isDidLedgered) {
      const ledgerDid = (): void => this.ledgerDid()
      blocksyncApi.user
        .getDidDoc(this.state.didDoc.did)
        .then((didResponse: any) => {
          if (didResponse.did) {
            if (didResponse.credentials.length === 0) {
              // Has no KYC Credential (Should look at the detail here, but right now we only have one type of credential)
              this.setState({
                isDidLedgered: true,
                didDoc: didResponse,
                hasKYC: false,
              })
            } else {
              this.setState({
                isDidLedgered: true,
                didDoc: didResponse,
                hasKYC: true,
              })
            }
          } else {
            // Did not ledgered
            ledgerDid()
          }
        })
        .catch((): void => {
          // Did not ledgered
          ledgerDid()
        })
    }
    if (!this.state.hasKYC) {
      setTimeout(() => this.checkState(), 2000)
    }
  }

  componentDidMount(): void {
    setTimeout(() => this.checkState(), 2000)
    // this.checkState();
  }

  setBusyLedgeringToFalse(): void {
    this.busyLedgering = false
  }

  ledgerDid = (): void => {
    if (this.state.didDoc && !this.busyLedgering) {
      const payload = this.state.didDoc
      blocksyncApi.utils
        .getSignData(payload, 'did/AddDid', payload.verifyKey)
        .then((response: any) => {
          if (response.sign_bytes && response.fee) {
            this.busyLedgering = true
            keysafe.requestSigning(
              response.sign_bytes,
              (error, signature) => {
                if (!error) {
                  blocksyncApi.user
                    .registerUserDid(payload, signature, response.fee, 'sync')
                    .then((response: any) => {
                      if ((response.code || 0) === 0) {
                        successToast('Did document was ledgered successfully')
                      } else {
                        errorToast('Unable to ledger did at this time')
                      }
                      // Delay the update here to allow Explorer to sync
                      setTimeout(() => (this.busyLedgering = false), 3000)
                    })
                } else {
                  this.busyLedgering = false
                }
              },
              'base64',
            )
          } else {
            errorToast('Unable to ledger did at this time')
          }
        })
        .catch(() => {
          errorToast('Unable to ledger did at this time')
        })
    } else {
      if (this.state.toastShown === false) {
        // warningToast('Please log into the IXO Keysafe');
        this.setState({ toastShown: true })
      }
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <ModalWrapper
          isModalOpen={this.state.isModalOpen}
          handleToggleModal={(val): void => this.toggleModal({}, val)}
          header={this.renderModalHeading()}
        >
          {this.renderModal()}
        </ModalWrapper>
        <Banner />
        <Section>
          <div className="container">
            <div className="row">
              <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
                <div className="col-lg-6">
                  <Amply
                    src={require('../../assets/images/register/ixo-amply.png')}
                  />
                </div>
              </MediaQuery>
              <SmallIconCol className="col-lg-6">
                <TextBlock
                  activeModal={this.toggleModal}
                  title="Launch a test project"
                  icon="icon-claims2"
                  role={AgentRoles.owners}
                  keysafe={this.state.hasKeySafe}
                  KYC={this.state.hasKYC}
                >
                  <p>
                    Become the founder of your own impact initiative (for
                    testing).
                  </p>
                </TextBlock>
              </SmallIconCol>
            </div>
          </div>
          <BlueRow>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <TextBlock
                    activeModal={this.toggleModal}
                    blueBG={true}
                    title="Participate as a service provider"
                    icon="icon-serviceproviders"
                    role={AgentRoles.serviceProviders}
                    keysafe={this.state.hasKeySafe}
                    KYC={this.state.hasKYC}
                  >
                    <p>
                      Service providers deliver project impacts by submitting
                      signed impact claims e.g. planting trees or educating
                      children.
                    </p>
                  </TextBlock>
                </div>
                <MediaQuery minWidth={`${deviceWidth.desktop}px`}>
                  <RelativeCol className="col-lg-6">
                    <KeySafe
                      src={require('../../assets/images/register/ixo-keysafe.png')}
                    />
                  </RelativeCol>
                </MediaQuery>
              </div>
            </div>
          </BlueRow>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <TextBlock
                  activeModal={this.toggleModal}
                  title="Evaluate claims"
                  icon="icon-evaluators"
                  role={AgentRoles.evaluators}
                  keysafe={this.state.hasKeySafe}
                  KYC={this.state.hasKYC}
                >
                  <p>
                    Evaluators are individuals or entities with specific
                    knowledge and experience to provide an opinion on impact
                    claims (often assisted by{' '}
                    <strong>verification oracles</strong>).{' '}
                  </p>
                </TextBlock>
              </div>
              <div className="col-lg-6" />
            </div>
          </div>
        </Section>
      </div>
    )
  }
}

function mapStateToProps(state: RootState): Record<string, any> {
  return {
    userInfo: state.account.userInfo,
  }
}

export const RegisterConnected = connect(mapStateToProps)(RegisterPage as any)
