import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import CreateEntityBase, {
  CreateEntityBaseProps,
} from '../CreateEntity/components/CreateEntityBase/CreateEntityBase'
import { FormData } from '../../common/components/JsonForm/types'
import { RootState } from '../../common/redux/types'
import FormCardWrapper from '../../common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import ClaimInfoCard from './components/ClaimInfoCard/ClaimInfoCard'
import { ClaimInfo } from './types'
import { updateClaimInfo } from './CreateEntityAttestation.actions'
import * as attestationSelectors from './CreateEntityAttestation.selectors'
import AddQuestionBar from './components/AddQuestionBar/AddQuestionBar'

interface Props extends CreateEntityBaseProps {
  claimInfo: ClaimInfo
  handleUpdateClaimInfo: (formData: FormData) => void
}

class CreateEntityAttestation extends CreateEntityBase<Props> {
  renderClaimInfo = (): JSX.Element => {
    this.cardRefs['claiminfo'] = React.createRef()

    const {
      claimInfo: { title, shortDescription },
      handleUpdateClaimInfo,
    } = this.props

    return (
      <FormCardWrapper title="Claim Info" showAddSection={false}>
        <ClaimInfoCard
          ref={this.cardRefs['header']}
          handleUpdateContent={handleUpdateClaimInfo}
          handleSubmitted={(): void => this.props.handleValidated('claiminfo')}
          handleError={(errors): void =>
            this.props.handleValidationError('claiminfo', errors)
          }
          title={title}
          shortDescription={shortDescription}
        />
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    return (
      <>
        {this.renderClaimInfo()}
        <AddQuestionBar addQuestion={(type): void => console.log(type)} />
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  claimInfo: attestationSelectors.selectClaimInfo(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateClaimInfo: (formData: FormData): void =>
    dispatch(updateClaimInfo(formData)),
})

export const CreateEntityAttestationConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntityAttestation)
