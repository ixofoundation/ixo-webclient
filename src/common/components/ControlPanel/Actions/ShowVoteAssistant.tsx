import React, { Dispatch, useEffect } from 'react'
import { connect } from 'react-redux'
import { ToogleAssistantPayload } from 'modules/Account/types'
import { toggleAssistant } from 'modules/Account/Account.actions'
import { RootState } from 'common/redux/types'
import * as entitySelectors from 'modules/Entities/SelectedEntity/SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'

interface Props {
  userDid: string
  bondDid: string
  toggleAssistant: (param: ToogleAssistantPayload) => void
}

const ShowVoteAssistant: React.FunctionComponent<Props> = ({ userDid, bondDid, toggleAssistant }) => {
  useEffect(() => {
    toggleAssistant({
      fixed: true,
      intent: `/relayer_vote{ "trigger":"proto_msg", "type":"bonds/MsgBuy", "user_did":","${userDid}", "bond_did":"${bondDid}"`,
    })
    // eslint-disable-next-line
  }, [])

  return null
}

const mapStateToProps = (state: RootState): any => ({
  bondDid: entitySelectors.selectEntityBondDid(state),
  userDid: accountSelectors.selectUserDid(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  toggleAssistant: (param: ToogleAssistantPayload): void => dispatch(toggleAssistant(param)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowVoteAssistant)
