import { Inner, NoPadLeft, StatusBox, StatusText, UserBox, Light, LightLoading, LightReady, Ping } from './components'

export const WalletConnector = (): JSX.Element => {
  const { address, registered } = {address: "", "registered": true}

  const renderLightIndicator = (): JSX.Element => {
    if (address) {
      if (registered) {
        return <LightReady />
      } else {
        return <LightLoading />
      }
    } else {
      return <Light />
    }
  }

  return (
      <NoPadLeft>
        <Inner>
          <UserBox color={"blue"}>
            <StatusBox>
            <Ping>{renderLightIndicator()}</Ping>
              <StatusText color={"blue"}>
                {!address ? 'Not Connected' : 'Connected'}
              </StatusText>
            </StatusBox>
          </UserBox>
        </Inner>
      </NoPadLeft>
  )
}

