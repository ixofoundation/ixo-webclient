import React, { Dispatch } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import CreateEntityBase from '../components/CreateEntityBase/CreateEntityBase'
import { RootState } from 'common/redux/types'
import * as createEntitySelectors from '../CreateEntity.selectors'
import * as entitiesSelectors from '../../EntitiesExplorer/EntitiesExplorer.selectors'
import FormCardWrapper from 'common/components/Wrappers/FormCardWrapper/FormCardWrapper'
import ExistingEntityCard from './components/ExistingEntityCard/ExistingEntityCard'
import TokenTemplateCard from './components/TokenTemplateCard/TokenTemplateCard'
import {
  fetchExistingEntity,
  updateAssociatedTemplates,
  addAssociatedTemplate,
  updateExistingEntityDid,
  validated,
  validationError,
  removeAssociatedTemplate,
} from './CreateTemplate.action'
import * as createEntityTemplateSelectors from './CreateTemplate.selectors'
import { importEntityPageContent } from '../CreateEntityPageContent/CreateEntityPageContent.actions'
import { selectHeaderContent } from '../CreateEntityPageContent/CreateEntityPageContent.selectors'
import { clearEntity, goToStep, newEntity } from '../CreateEntity.actions'
import { selectEntityConfig } from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.selectors'
import { EntityType } from 'modules/Entities/types'
import { AssociatedTemplateType } from './types'
import { updateTemplateType } from '../CreateSelectTemplate/CreateSelectTemplate.action'

const NewTokenTemplateLink = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #39c3e6;
  float: right;
  margin-top: -30px;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: #012639;
  }
`

class CreateTemplate extends CreateEntityBase<any> {
  onSubmitted = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getNextStep(entityType, step))
  }

  onBack = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getPreviousStep(entityType, step))
  }

  renderExistingEntityCard = (): JSX.Element => {
    this.cardRefs['existingentity'] = React.createRef()

    const { entityType, entityTypeMap } = this.props

    const {
      existingEntity,
      handleUpdateExistingEntityDid,
      handleFetchExistingEntity,
      handleResetExistingEntity,
    } = this.props

    const handleNewClick = (): void => {
      handleResetExistingEntity()
      this.setState({ method: 'new' })
    }

    const handleCopyClick = (): void => {
      handleResetExistingEntity()
      handleFetchExistingEntity(existingEntity.did, existingEntity.sourceNet)
      this.setState({ method: 'copy' })
    }
    return (
      <FormCardWrapper
        showAddSection={false}
        title={`Start with a Copy (or Create a New ${entityTypeMap[entityType].title})`}
        keyword="start"
      >
        <ExistingEntityCard
          ref={this.cardRefs['existingentity']}
          sourceNet={existingEntity.sourceNet}
          existingEntityDid={existingEntity.did}
          error={existingEntity.error}
          handleSubmitted={(): void => {
            this.props.handleValidated('existingentity')
          }}
          handleUpdateContent={handleUpdateExistingEntityDid}
          handleError={(errors): void => {
            this.props.handleValidationError('existingentity', errors)
          }}
          handleMethod={(method): void => this.setState({ method: method })}
          method={this.state.method}
          handleNewClick={handleNewClick}
          handleCopyClick={handleCopyClick}
        />
      </FormCardWrapper>
    )
  }

  renderTokenTemplate = (): JSX.Element => {
    const {
      templates,
      associatedTemplates,
      handleUpdateAssociatedTemplate,
      handleAddAssociatedTemplateSection,
      handleRemoveAssociatedTemplate,
      handleGoToStep,
      handleNewEntity,
      handleUpdateTemplateType,
      history,
    } = this.props

    const handleCreateNewTokenClassTemplate = (): void => {
      // window.open('/template/new/template', '_self')
      history.push('/template/new/template')
      handleNewEntity(EntityType.Template, true)
      handleGoToStep(2)
      handleUpdateTemplateType({
        templateType: 'Token Class',
      })
    }

    return (
      <FormCardWrapper
        title={`Tokens to be Minted`}
        showAddSection
        onAddSection={handleAddAssociatedTemplateSection}
        addSectionText="Add Another Token"
        keyword="tokens"
      >
        <NewTokenTemplateLink onClick={handleCreateNewTokenClassTemplate}>
          Create a New Token Class Template
        </NewTokenTemplateLink>
        <div className="mt-4" />

        {associatedTemplates &&
          associatedTemplates.map((template) => {
            this.cardRefs[template.id] = React.createRef()

            return (
              <TokenTemplateCard
                key={template.templateId}
                ref={this.cardRefs[template.id]}
                name={template.name}
                collection={template.collection}
                denom={template.denom}
                quantity={template.quantity}
                templateId={template.templateId}
                templates={(templates ?? []).map((template) => {
                  const { name: title, did, dateCreated, ddoTags } = template
                  return {
                    title,
                    did,
                    dateCreated: dateCreated.format('DD-MMM-YYYY'),
                    imageUrl: null,
                    previewUrl: '',
                    ddoTags,
                  }
                })}
                handleUpdateContent={(value): void => {
                  handleUpdateAssociatedTemplate({ id: template.id, ...value })
                }}
                handleRemoveSection={(): void => {
                  handleRemoveAssociatedTemplate(template.id)
                }}
                handleSubmitted={(): void => {
                  console.log('CreateTemplate', 'handleSubmitted')
                  this.props.handleValidated(template.id)
                }}
                handleError={(errors): void => {
                  console.log('CreateTemplate', 'handleError', errors)
                  this.props.handleValidationError(template.id, errors)
                }}
              />
            )
          })}
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    const { entityType, existingEntity, associatedTemplates } = this.props
    const identifiers: string[] = []
    identifiers.push('existingentity')
    associatedTemplates.forEach((template) => {
      identifiers.push(template.id)
    })

    return (
      <>
        {this.renderExistingEntityCard()}
        {entityType === EntityType.Asset && this.renderTokenTemplate()}
        {(this.state.method === 'new' ||
          (this.state.method === 'copy' && existingEntity.error === '')) &&
          this.renderButtonGroup(identifiers, false)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  templates: entitiesSelectors.selectTokenClassTemplateEntities(state),
  step: createEntitySelectors.selectStep(state),
  entityType: createEntitySelectors.selectEntityType(state),
  entityTypeMap: selectEntityConfig(state),
  existingEntity: createEntityTemplateSelectors.selectExistingEntity(state),
  associatedTemplates:
    createEntityTemplateSelectors.selectAssociatedTemplates(state),
  validationComplete:
    createEntityTemplateSelectors.selectValidationComplete(state),
  validated: createEntityTemplateSelectors.selectValidated(state),
  header: selectHeaderContent(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateExistingEntityDid: (formData: FormData): void =>
    dispatch(updateExistingEntityDid(formData)),
  handleFetchExistingEntity: (did: string, sourceNet: string): void =>
    dispatch(fetchExistingEntity(did, sourceNet)),
  handleImportEntityPageContent: (payload: any): void =>
    dispatch(importEntityPageContent(payload)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
  handleValidated: (identifier: string): void =>
    dispatch(validated(identifier)),
  handleResetExistingEntity: (): void => dispatch(clearEntity()),
  handleUpdateAssociatedTemplate: (template: AssociatedTemplateType): void =>
    dispatch(updateAssociatedTemplates(template)),
  handleAddAssociatedTemplateSection: (): void =>
    dispatch(addAssociatedTemplate()),
  handleRemoveAssociatedTemplate: (id: string): void =>
    dispatch(removeAssociatedTemplate(id)),
  handleNewEntity: (entityType: EntityType, forceNew: boolean): void =>
    dispatch(newEntity(entityType, forceNew)),
  handleUpdateTemplateType: (formData: FormData): void =>
    dispatch(updateTemplateType(formData)),
  handleValidationError: (identifier: string, errors: string[]): void =>
    dispatch(validationError(identifier, errors)),
})

export const CreateTemplateConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTemplate)
