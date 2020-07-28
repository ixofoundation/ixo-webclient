import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../common/redux/types'
import {
  addDisplayCredentialSection,
  addFilterSection,
  addRequiredCredentialSection,
  removeDisplayCredentialSection,
  removeFilterSection,
  removeRequiredCredentialSection,
  updateCreator,
  updateDisplayCredential,
  updateFilter,
  updateOwner,
  updatePrivacy,
  updateRequiredCredential,
  updateStatus,
  uploadCreatorImage,
  uploadOwnerImage,
} from './CreateEntitySettings.actions'
import * as entitySettingsSelectors from './CreateEntitySettings.selectors'
import { FormData } from 'src/common/components/JsonForm/types'
import {
  Owner,
  Creator,
  Status,
  Privacy,
  RequiredCredential,
  Filter,
  DisplayCredential,
} from './types'
// import FormCardWrapper from '../../common/components/Wrappers/FormCardWrapper/FormCardWrapper'

interface Props {
  owner: Owner
  creator: Creator
  status: Status
  privacy: Privacy
  requiredCredentials: RequiredCredential[]
  filters: Filter[]
  displayCredentials: DisplayCredential[]
  handleAddDisplayCredentialSection: () => void
  handleAddFilterSection: () => void
  handleAddRequiredCredentialSection: () => void
  handlerRemoveDisplayCredentialSection: (id: string) => void
  handlerRemoveFilterSection: (id: string) => void
  handlerRemoveRequiredCredentialSection: (id: string) => void
  handleUpdateCreator: (formData: FormData) => void
  handleUpdateDisplayCredential: (id: string, formData: FormData) => void
  handleUpdateFilter: (id: string, formData: FormData) => void
  handleUpdateOwner: (formData: FormData) => void
  handleUpdatePrivacy: (formData: FormData) => void
  handleUpdateRequiredCredential: (id: string, formData: FormData) => void
  handleUpdateStatus: (formData: FormData) => void
  handleUploadCreatorImage: (base64EncodedImage: string) => void
  handleUploadOwnerImage: (base64EncodedImage: string) => void
}

class CreateEntitySettings extends React.Component<Props> {
  render(): JSX.Element {
    return <></>
  }
}

const mapStateToProps = (state: RootState): any => ({
  owner: entitySettingsSelectors.selectOwner(state),
  creator: entitySettingsSelectors.selectCreator(state),
  status: entitySettingsSelectors.selectStatus(state),
  privacy: entitySettingsSelectors.selectPrivacy(state),
  requiredCredentials: entitySettingsSelectors.selectRequiredCredentials(state),
  filters: entitySettingsSelectors.selectFilters(state),
  displayCredentials: entitySettingsSelectors.selectDisplayCredentials(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleAddDisplayCredentialSection: (): void =>
    dispatch(addDisplayCredentialSection()),
  handleAddFilterSection: (): void => dispatch(addFilterSection()),
  handleAddRequiredCredentialSection: (): void =>
    dispatch(addRequiredCredentialSection()),
  handlerRemoveDisplayCredentialSection: (id: string): void =>
    dispatch(removeDisplayCredentialSection(id)),
  handlerRemoveFilterSection: (id: string): void =>
    dispatch(removeFilterSection(id)),
  handlerRemoveRequiredCredentialSection: (id: string): void =>
    dispatch(removeRequiredCredentialSection(id)),
  handleUpdateCreator: (formData: FormData): void =>
    dispatch(updateCreator(formData)),
  handleUpdateDisplayCredential: (id: string, formData: FormData): void =>
    dispatch(updateDisplayCredential(id, formData)),
  handleUpdateFilter: (id: string, formData: FormData): void =>
    dispatch(updateFilter(id, formData)),
  handleUpdateOwner: (formData: FormData): void =>
    dispatch(updateOwner(formData)),
  handleUpdatePrivacy: (formData: FormData): void =>
    dispatch(updatePrivacy(formData)),
  handleUpdateRequiredCredential: (id: string, formData: FormData): void =>
    dispatch(updateRequiredCredential(id, formData)),
  handleUpdateStatus: (formData: FormData): void =>
    dispatch(updateStatus(formData)),
  handleUploadCreatorImage: (base64EncodedImage: string): void =>
    dispatch(uploadCreatorImage(base64EncodedImage)),
  handleUploadOwnerImage: (base64EncodedImage: string): void =>
    dispatch(uploadOwnerImage(base64EncodedImage)),
})

export const CreateEntitySettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateEntitySettings)
