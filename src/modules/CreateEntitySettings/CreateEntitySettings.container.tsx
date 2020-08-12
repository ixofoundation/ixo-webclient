import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../common/redux/types";
import {
  addDisplayCredentialSection,
  addRequiredCredentialSection,
  removeDisplayCredentialSection,
  removeRequiredCredentialSection,
  updateCreator,
  updateDisplayCredential,
  updateFilters,
  updateOwner,
  updatePrivacy,
  updateRequiredCredential,
  updateStatus,
  uploadCreatorImage,
  uploadOwnerImage,
} from "./CreateEntitySettings.actions";
import * as entitySettingsSelectors from "./CreateEntitySettings.selectors";
import { FormData } from "common/components/JsonForm/types";
import {
  Owner,
  Creator,
  Status,
  Privacy,
  RequiredCredential,
  DisplayCredential,
} from "./types";
import FormCardWrapper from "../../common/components/Wrappers/FormCardWrapper/FormCardWrapper";
import OwnerCard from "./components/OwnerCard/OwnerCard";
import CreatorCard from "./components/CreatorCard/CreatorCard";
import StatusCard from "./components/StatusCard/StatusCard";
import PrivacyCard from "./components/PrivacyCard/PrivacyCard";
import RequiredCredentialCard from "./components/RequiredCredentialCard/RequiredCredentialCard";
import DisplayCredentialCard from "./components/DisplayCredentialCard/DisplayCredentialCard";
import FilterCard from "./components/FilterCard/FilterCard";
import { EntityType } from "../Entities/types";
import { entityTypeMap } from "../Entities/strategy-map";

interface Props {
  entityType: EntityType;
  owner: Owner;
  creator: Creator;
  status: Status;
  privacy: Privacy;
  requiredCredentials: RequiredCredential[];
  filters: { [name: string]: string[] };
  displayCredentials: DisplayCredential[];
  handleAddDisplayCredentialSection: () => void;
  handleAddFilterSection: () => void;
  handleAddRequiredCredentialSection: () => void;
  handlerRemoveDisplayCredentialSection: (id: string) => void;
  handlerRemoveFilterSection: (id: string) => void;
  handlerRemoveRequiredCredentialSection: (id: string) => void;
  handleUpdateCreator: (formData: FormData) => void;
  handleUpdateDisplayCredential: (id: string, formData: FormData) => void;
  handleUpdateFilters: (formData: FormData) => void;
  handleUpdateOwner: (formData: FormData) => void;
  handleUpdatePrivacy: (formData: FormData) => void;
  handleUpdateRequiredCredential: (id: string, formData: FormData) => void;
  handleUpdateStatus: (formData: FormData) => void;
  handleUploadCreatorImage: (base64EncodedImage: string) => void;
  handleUploadOwnerImage: (base64EncodedImage: string) => void;
}

class CreateEntitySettings extends React.Component<Props> {
  entityTitle;
  constructor(props: any) {
    super(props);

    this.entityTitle = entityTypeMap[this.props.entityType].title;
  }

  renderCreator = (): JSX.Element => {
    const {
      creator: {
        name,
        country,
        email,
        website,
        mission,
        identifier,
        credentialTokenId,
        imageDid,
        uploadingImage,
      },
      handleUpdateCreator,
      handleUploadCreatorImage,
    } = this.props;

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Creator`}
      >
        <CreatorCard
          name={name}
          country={country}
          email={email}
          website={website}
          mission={mission}
          identifier={identifier}
          credentialTokenId={credentialTokenId}
          imageDid={imageDid}
          uploadingImage={uploadingImage}
          handleUpdate={handleUpdateCreator}
          handleUploadImage={handleUploadCreatorImage}
        />
      </FormCardWrapper>
    );
  };

  renderOwner = (): JSX.Element => {
    const {
      owner: {
        name,
        country,
        email,
        website,
        mission,
        identifier,
        matrixId,
        imageDid,
        uploadingImage,
      },
      handleUpdateOwner,
      handleUploadOwnerImage,
    } = this.props;

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Owner`}
      >
        <OwnerCard
          name={name}
          country={country}
          email={email}
          website={website}
          mission={mission}
          identifier={identifier}
          matrixId={matrixId}
          imageDid={imageDid}
          uploadingImage={uploadingImage}
          handleUpdate={handleUpdateOwner}
          handleUploadImage={handleUploadOwnerImage}
        />
      </FormCardWrapper>
    );
  };

  renderStatus = (): JSX.Element => {
    const {
      status: { startDate, endDate, stage, status },
      handleUpdateStatus,
    } = this.props;

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Status`}
      >
        <StatusCard
          startDate={startDate}
          endDate={endDate}
          stage={stage}
          status={status}
          handleUpdate={handleUpdateStatus}
        />
      </FormCardWrapper>
    );
  };

  renderPrivacy = (): JSX.Element => {
    const {
      privacy: { entityView, pageView },
      handleUpdatePrivacy,
    } = this.props;

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Privacy Settings`}
      >
        <PrivacyCard
          pageView={pageView}
          entityView={entityView}
          handleUpdate={handleUpdatePrivacy}
        />
      </FormCardWrapper>
    );
  };

  renderRequiredCredentials = (): JSX.Element => {
    const {
      requiredCredentials,
      handleUpdateRequiredCredential,
      handleAddRequiredCredentialSection,
      handlerRemoveRequiredCredentialSection,
    } = this.props;

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Required Privacy Credentials"
        addSectionText="Add Credential"
        onAddSection={handleAddRequiredCredentialSection}
      >
        {requiredCredentials.map((requiredCredential) => {
          const { id, credential, issuer } = requiredCredential;

          return (
            <RequiredCredentialCard
              key={id}
              id={id}
              credential={credential}
              issuer={issuer}
              handleUpdate={handleUpdateRequiredCredential}
              handleRemoveSection={handlerRemoveRequiredCredentialSection}
            />
          );
        })}
      </FormCardWrapper>
    );
  };

  renderFilters = (): JSX.Element => {
    const { entityType, filters, handleUpdateFilters } = this.props;

    return (
      <FormCardWrapper
        showAddSection={false}
        title={`${this.entityTitle} Filters`}
        description="Use Ctrl (Windows) or Cmd (Mac) to select and deselect the filter tags"
      >
        <FilterCard
          entityType={entityType}
          filters={filters}
          handleUpdate={handleUpdateFilters}
        />
      </FormCardWrapper>
    );
  };

  renderDisplayCredentials = (): JSX.Element => {
    const {
      displayCredentials,
      handleUpdateDisplayCredential,
      handleAddDisplayCredentialSection,
      handlerRemoveDisplayCredentialSection,
    } = this.props;

    return (
      <FormCardWrapper
        showAddSection={true}
        title="Display Credentials"
        addSectionText="Add Credential"
        onAddSection={handleAddDisplayCredentialSection}
      >
        {displayCredentials.map((displayCredential) => {
          const { id, credential, badge } = displayCredential;

          return (
            <DisplayCredentialCard
              key={id}
              id={id}
              credential={credential}
              badge={badge}
              handleUpdate={handleUpdateDisplayCredential}
              handleRemoveSection={handlerRemoveDisplayCredentialSection}
            />
          );
        })}
      </FormCardWrapper>
    );
  };

  render(): JSX.Element {
    return (
      <>
        {this.renderCreator()}
        {this.renderOwner()}
        {this.renderStatus()}
        {this.renderPrivacy()}
        {this.renderRequiredCredentials()}
        {this.renderFilters()}
        {this.renderDisplayCredentials()}
      </>
    );
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
});

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleAddDisplayCredentialSection: (): void =>
    dispatch(addDisplayCredentialSection()),
  handleAddRequiredCredentialSection: (): void =>
    dispatch(addRequiredCredentialSection()),
  handlerRemoveDisplayCredentialSection: (id: string): void =>
    dispatch(removeDisplayCredentialSection(id)),
  handlerRemoveRequiredCredentialSection: (id: string): void =>
    dispatch(removeRequiredCredentialSection(id)),
  handleUpdateCreator: (formData: FormData): void =>
    dispatch(updateCreator(formData)),
  handleUpdateDisplayCredential: (id: string, formData: FormData): void =>
    dispatch(updateDisplayCredential(id, formData)),
  handleUpdateFilters: (formData: FormData): void =>
    dispatch(updateFilters(formData)),
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
});

export const CreateEntitySettingsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEntitySettings);
