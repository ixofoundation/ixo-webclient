import { v4 as uuidv4 } from 'uuid'
import React, { Dispatch } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import CreateEntityBase from '../Components/CreateEntityBase/CreateEntityBase'
import { RootState } from 'redux/store'
import * as createEntitySelectors from 'redux/createEntityOld/createEntity.selectors'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import FormCardWrapper from 'components/Wrappers/FormCardWrapper/FormCardWrapper'
import ExistingEntityCard from './Components/ExistingEntityCard/ExistingEntityCard'
import TokenTemplateCard from './Components/TokenTemplateCard/TokenTemplateCard'
import {
  fetchExistingEntity,
  updateAssociatedTemplates,
  addAssociatedTemplate,
  updateExistingEntityDid,
  validated,
  validationError,
  removeAssociatedTemplate,
  updateAlphaBondInfo,
} from 'redux/createTemplate/createTemplate.action'
import * as createEntityTemplateSelectors from 'redux/createTemplate/createTemplate.selectors'
import { importEntityPageContent } from 'redux/createEntityPageContent/createEntityPageContent.actions'
import { selectHeaderContent } from 'redux/createEntityPageContent/createEntityPageContent.selectors'
import { clearEntity, goToStep, newEntity } from 'redux/createEntityOld/createEntity.actions'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { getEntities } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { EntityType, LiquiditySource } from 'types/entities'
import { AlphaBondInfo, AssociatedTemplateType } from 'redux/createTemplate/createTemplate.types'
import { updateTemplateType } from 'redux/createSelectTemplate/createSelectTemplate.action'
import ConfigureAlphaBondCard from './Components/ConfigureAlphaBondCard/ConfigureAlphaBondCard'
import { updateLiquidity } from 'redux/createEntityAdvanced/createEntityAdvanced.actions'

const NewTokenTemplateLink = styled.span`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${(props): string => props.theme.highlight.light};
  float: right;
  margin-top: -30px;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    color: #012639;
  }
`

class CreateTemplate extends CreateEntityBase<any> {
  componentDidMount(): void {
    const { handleGetEntities } = this.props

    handleGetEntities()
  }

  onSubmitted = (): void => {
    const { entityType, step, handleGoToStep, createdBondDid, handleCreatedLiquidity } = this.props

    handleGoToStep(this.getNextStep(entityType, step))

    // auto fill liquidity
    if (createdBondDid) {
      const source = LiquiditySource.Alphabond
      const liquidityId = createdBondDid

      handleCreatedLiquidity(uuidv4(), { source, liquidityId })
    }
  }

  onBack = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getPreviousStep(entityType, step))
  }

  renderExistingEntityCard = (): JSX.Element => {
    this.cardRefs['existingentity'] = React.createRef()

    const { entityType, entityTypeMap } = this.props

    const { existingEntity, handleUpdateExistingEntityDid, handleFetchExistingEntity, handleResetExistingEntity } =
      this.props

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
        keyword='start'
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
          method={this.state.method!}
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
        addSectionText='Add Another Token'
        keyword='tokens'
      >
        <NewTokenTemplateLink onClick={handleCreateNewTokenClassTemplate}>
          Create a New Token Class Template
        </NewTokenTemplateLink>
        <div className='mt-4' />

        {associatedTemplates &&
          associatedTemplates.map((template: any) => {
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
                templates={(templates ?? []).map((template: any) => {
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
                  this.props.handleValidated(template.id)
                }}
                handleError={(errors): void => {
                  this.props.handleValidationError(template.id, errors)
                }}
              />
            )
          })}
      </FormCardWrapper>
    )
  }

  renderConfigureAlphaBondCard = (): JSX.Element => {
    const { alphaBondInfo, handleUpdateAlphaBondInfo } = this.props
    return (
      <FormCardWrapper showAddSection={false} title={'Configure an AlphaBond'}>
        <ConfigureAlphaBondCard
          formData={alphaBondInfo}
          handleUpdateContent={(formData: any): void => {
            handleUpdateAlphaBondInfo({
              ...formData,
              token: formData.token ? formData.token.toUpperCase() : '',
            })
          }}
          handleSubmitted={(): void => {
            console.log('handleSubmitted')
          }}
          handleError={(errors): void => {
            console.log('handleError', errors)
          }}
        />
      </FormCardWrapper>
    )
  }

  render(): JSX.Element {
    const { entityType, existingEntity, associatedTemplates } = this.props
    const identifiers: string[] = []
    identifiers.push('existingentity')
    associatedTemplates.forEach((template: any) => {
      identifiers.push(template.id)
    })

    return (
      <>
        {this.renderExistingEntityCard()}
        {entityType === EntityType.Asset && this.renderTokenTemplate()}
        {entityType === EntityType.Investment && this.renderConfigureAlphaBondCard()}

        {(this.state.method === 'new' || (this.state.method === 'copy' && existingEntity.error === '')) &&
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
  associatedTemplates: createEntityTemplateSelectors.selectAssociatedTemplates(state),
  alphaBondInfo: createEntityTemplateSelectors.selectAlphaBondInfo(state),
  createdBondDid: createEntityTemplateSelectors.selectCreatedBondDid(state),
  validationComplete: createEntityTemplateSelectors.selectValidationComplete(state),
  validated: createEntityTemplateSelectors.selectValidated(state),
  header: selectHeaderContent(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateExistingEntityDid: (formData: FormData): void => dispatch(updateExistingEntityDid(formData)),
  handleFetchExistingEntity: (did: string, sourceNet: string): void => dispatch(fetchExistingEntity(did, sourceNet)),
  handleImportEntityPageContent: (payload: any): void => dispatch(importEntityPageContent(payload)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
  handleValidated: (identifier: string): void => dispatch(validated(identifier)),
  handleResetExistingEntity: (): void => dispatch(clearEntity()),
  handleGetEntities: (): void => dispatch(getEntities()),
  handleUpdateAssociatedTemplate: (template: AssociatedTemplateType): void =>
    dispatch(updateAssociatedTemplates(template)),
  handleAddAssociatedTemplateSection: (): void => dispatch(addAssociatedTemplate()),
  handleRemoveAssociatedTemplate: (id: string): void => dispatch(removeAssociatedTemplate(id)),
  handleUpdateAlphaBondInfo: (formData: AlphaBondInfo): void => dispatch(updateAlphaBondInfo(formData)),
  handleNewEntity: (entityType: EntityType, forceNew: boolean): void => dispatch(newEntity(entityType, forceNew)),
  handleUpdateTemplateType: (formData: FormData): void => dispatch(updateTemplateType(formData)),
  handleValidationError: (identifier: string, errors: string[]): void => dispatch(validationError(identifier, errors)),

  handleCreatedLiquidity: (id: string, formData: FormData): void => dispatch(updateLiquidity(id, formData)),
})

export const CreateTemplateConnected = connect(mapStateToProps, mapDispatchToProps)(CreateTemplate)
