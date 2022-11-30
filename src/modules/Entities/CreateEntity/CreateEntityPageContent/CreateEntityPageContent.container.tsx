import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CreateEntityBase, { CreateEntityBaseProps } from '../components/CreateEntityBase/CreateEntityBase'
import * as pageContentSelectors from '../../../../redux/createEntityPageContent/createEntityPageContent.selectors'
import * as createEntitySelectors from '../../../../redux/createEntityOld/createEntity.selectors'
import { RootState } from 'redux/types'
import {
  HeaderPageContent,
  BodyPageContent,
  ImagePageContent,
  ProfilePageContent,
  SocialPageContent,
  EmbeddedPageContent,
  CreateEntityPageContentState,
} from '../../../../redux/createEntityPageContent/createEntityPageContent.types'
import HeaderCard from './components/HeaderCard/HeaderCard'
import BodyContentCard from './components/BodyContentCard/BodyContentCard'
import ImageContentCard from './components/ImageContentCard/ImageContentCard'
import ProfileContentCard from './components/ProfileContentCard/ProfileContentCard'
import SocialContentCard from './components/SocialContentCard/SocialContentCard'
import EmbeddedContentCard from './components/EmbeddedContentCard/EmbeddedContentCard'
import {
  updateHeaderContent,
  addBodySection,
  updateBodyContent,
  addImageSection,
  updateImageContent,
  addProfileSection,
  updateProfileContent,
  updateSocialContent,
  removeBodySection,
  removeImageSection,
  removeProfileSection,
  updateEmbeddedContent,
  addEmbeddedSection,
  removeEmbeddedSection,
  validated,
  validationError,
  orderEntityPageContent,
} from '../../../../redux/createEntityPageContent/createEntityPageContent.actions'
import { goToStep } from '../../../../redux/createEntityOld/createEntity.actions'
import { FormData } from 'components/JsonForm/types'
import FormCardWrapper from 'components/Wrappers/FormCardWrapper/FormCardWrapper'
import DraggableFormCardWrapper from 'components/Wrappers/FormCardWrapper/DraggableFormCardWrapper'

interface Props extends CreateEntityBaseProps {
  pageContent: CreateEntityPageContentState
  header: HeaderPageContent
  body: BodyPageContent[]
  images: ImagePageContent[]
  profiles: ProfilePageContent[]
  social: SocialPageContent
  embedded: EmbeddedPageContent[]
  handleUpdateHeaderContent: (formData: FormData) => void
  handleAddBodySection: () => void
  handleRemoveBodySection: (id: string) => void
  handleUpdateBodyContent: (id: string, formData: FormData) => void
  handleAddImageSection: () => void
  handleRemoveImageSection: (id: string) => void
  handleUpdateImageContent: (id: string, formData: FormData) => void
  handleAddProfileSection: () => void
  handleRemoveProfileSection: (id: string) => void
  handleUpdateProfileContent: (id: string, formData: FormData) => void
  handleUpdateSocialContent: (formData: FormData) => void
  handleAddEmbeddedSection: () => void
  handleRemoveEmbeddedSection: (id: string) => void
  handleUpdateEmbeddedContent: (id: string, formData: FormData) => void
  handleOrderContent: (srcId: string, dstId: string) => void
}

class CreateEntityPageContent extends CreateEntityBase<Props> {
  renderHeader = (): JSX.Element => {
    this.cardRefs['header'] = React.createRef()

    const {
      header: {
        title,
        shortDescription,
        imageDescription,
        headerFileSrc,
        logoFileSrc,
        brand,
        location,
        sdgs,
        headerFileUploading,
        logoFileUploading,
      },
      handleUpdateHeaderContent,
    } = this.props

    return (
      <FormCardWrapper
        title='Header Card'
        description='The information in this card is public and permanent'
        showAddSection={false}
      >
        <HeaderCard
          ref={this.cardRefs['header']}
          handleUpdateContent={handleUpdateHeaderContent}
          handleSubmitted={(): void => this.props.handleValidated('header')}
          handleError={(errors): void => this.props.handleValidationError('header', errors)}
          title={title}
          shortDescription={shortDescription}
          imageDescription={imageDescription}
          headerFileSrc={headerFileSrc}
          logoFileSrc={logoFileSrc}
          brand={brand}
          location={location}
          sdgs={sdgs}
          uploadingHeaderImage={headerFileUploading}
          uploadingLogoImage={logoFileUploading}
        />
      </FormCardWrapper>
    )
  }

  renderBodySections = (): JSX.Element => {
    const { body, handleUpdateBodyContent, handleAddBodySection, handleRemoveBodySection } = this.props
    return (
      <DraggableFormCardWrapper
        title='Main Section Card'
        description={`Accepts <a href="https://docs.ixo.foundation/ixo/developers/developer-tools/template-builder/styling-an-entity-page#markdown-styling-options" target="_blank">Markdown Formatting</a>.`}
        showAddSection
        onAddSection={handleAddBodySection}
        collapsible
      >
        {body.map((section) => {
          this.cardRefs[section.id] = React.createRef()

          const { id, title, content, fileSrc, uploading } = section

          return (
            <BodyContentCard
              ref={this.cardRefs[section.id]}
              key={id}
              title={title}
              content={content}
              fileSrc={fileSrc}
              uploadingImage={uploading}
              handleUpdateContent={(formData): void => handleUpdateBodyContent(id, formData)}
              handleRemoveSection={(): void => handleRemoveBodySection(id)}
              handleSubmitted={(): void => this.props.handleValidated(section.id)}
              handleError={(errors): void => this.props.handleValidationError(section.id, errors)}
            />
          )
        })}
      </DraggableFormCardWrapper>
    )
  }

  renderImageSections = (): JSX.Element => {
    const { images, handleUpdateImageContent, handleAddImageSection, handleRemoveImageSection } = this.props

    return (
      <DraggableFormCardWrapper
        title='Image Section Card'
        description={`Accepts <a href="https://docs.ixo.foundation/ixo/developers/developer-tools/template-builder/styling-an-entity-page#markdown-styling-options" target="_blank">Markdown Formatting</a>.`}
        showAddSection
        onAddSection={handleAddImageSection}
        collapsible
      >
        {images.map((section) => {
          this.cardRefs[section.id] = React.createRef()

          const { id, title, content, fileSrc, imageDescription, uploading } = section

          return (
            <ImageContentCard
              ref={this.cardRefs[section.id]}
              key={id}
              title={title}
              content={content}
              fileSrc={fileSrc}
              imageDescription={imageDescription}
              uploadingImage={uploading}
              handleUpdateContent={(formData): void => handleUpdateImageContent(id, formData)}
              handleRemoveSection={(): void => handleRemoveImageSection(id)}
              handleSubmitted={(): void => this.props.handleValidated(section.id)}
              handleError={(errors): void => this.props.handleValidationError(section.id, errors)}
            />
          )
        })}
      </DraggableFormCardWrapper>
    )
  }

  renderProfileSections = (): JSX.Element => {
    const { profiles, handleUpdateProfileContent, handleAddProfileSection, handleRemoveProfileSection } = this.props

    return (
      <DraggableFormCardWrapper
        title='Profile Card'
        description={`Accepts <a href="https://docs.ixo.foundation/ixo/developers/developer-tools/template-builder/styling-an-entity-page#markdown-styling-options" target="_blank">Markdown Formatting</a>.`}
        showAddSection
        onAddSection={handleAddProfileSection}
        collapsible
      >
        {profiles.map((section) => {
          this.cardRefs[section.id] = React.createRef()

          const { id, name, position, fileSrc, linkedInUrl, twitterUrl, uploading } = section

          return (
            <ProfileContentCard
              ref={this.cardRefs[section.id]}
              key={id}
              name={name}
              position={position}
              linkedInUrl={linkedInUrl}
              twitterUrl={twitterUrl}
              fileSrc={fileSrc}
              uploadingImage={uploading}
              handleUpdateContent={(formData): void => handleUpdateProfileContent(id, formData)}
              handleRemoveSection={(): void => handleRemoveProfileSection(id)}
              handleSubmitted={(): void => this.props.handleValidated(section.id)}
              handleError={(errors): void => this.props.handleValidationError(section.id, errors)}
            />
          )
        })}
      </DraggableFormCardWrapper>
    )
  }

  renderSocialContent = (): JSX.Element => {
    this.cardRefs['social'] = React.createRef()

    const {
      social: { linkedInUrl, facebookUrl, twitterUrl, discourseUrl, instagramUrl, telegramUrl, githubUrl, otherUrl },
      handleUpdateSocialContent,
    } = this.props

    return (
      <DraggableFormCardWrapper
        title='Social Card'
        description='The information in this card displays on the Explorer card.'
        showAddSection={false}
        collapsible
      >
        <SocialContentCard
          ref={this.cardRefs['social']}
          handleUpdateContent={handleUpdateSocialContent}
          handleSubmitted={(): void => this.props.handleValidated('social')}
          handleError={(errors): void => this.props.handleValidationError('social', errors)}
          linkedInUrl={linkedInUrl}
          facebookUrl={facebookUrl}
          twitterUrl={twitterUrl}
          discourseUrl={discourseUrl}
          instagramUrl={instagramUrl}
          telegramUrl={telegramUrl}
          githubUrl={githubUrl}
          otherUrl={otherUrl}
        />
      </DraggableFormCardWrapper>
    )
  }

  renderEmbeddedSections = (): JSX.Element => {
    const { embedded, handleUpdateEmbeddedContent, handleAddEmbeddedSection, handleRemoveEmbeddedSection } = this.props

    return (
      <DraggableFormCardWrapper
        title='Embedded Content'
        description={null!}
        showAddSection
        onAddSection={handleAddEmbeddedSection}
        collapsible
      >
        {embedded.map((section) => {
          this.cardRefs[section.id] = React.createRef()

          const { id, title, urls } = section

          return (
            <EmbeddedContentCard
              ref={this.cardRefs[section.id]}
              key={id}
              title={title}
              urls={urls}
              handleUpdateContent={(formData): void => handleUpdateEmbeddedContent(id, formData)}
              handleRemoveSection={(): void => handleRemoveEmbeddedSection(id)}
              handleSubmitted={(): void => this.props.handleValidated(section.id)}
              handleError={(errors): void => this.props.handleValidationError(section.id, errors)}
            />
          )
        })}
      </DraggableFormCardWrapper>
    )
  }

  onSubmitted = (): void => {
    const { entityType, step, handleGoToStep } = this.props

    handleGoToStep(this.getNextStep(entityType, step))
  }

  render(): JSX.Element {
    const { body, images, profiles, embedded, pageContent, handleOrderContent } = this.props

    const identifiers: string[] = []
    identifiers.push('header')
    identifiers.push('social')

    body.forEach((section) => {
      identifiers.push(section.id)
    })
    images.forEach((section) => {
      identifiers.push(section.id)
    })
    profiles.forEach((section) => {
      identifiers.push(section.id)
    })
    embedded.forEach((section) => {
      identifiers.push(section.id)
    })

    return (
      <>
        {this.renderHeader()}
        <div>
          <DragDropContext
            onDragEnd={(result): void => {
              const { source, destination } = result
              if (source && destination && source.index !== destination.index) {
                handleOrderContent(
                  Object.keys(pageContent)[source.index + 1],
                  Object.keys(pageContent)[destination.index + 1],
                )
              }
            }}
          >
            <Droppable droppableId='page-content-list-create'>
              {(provided): JSX.Element => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {Object.keys(pageContent)
                    .slice(1)
                    .map((objKey, index) => {
                      let dom: any
                      switch (objKey) {
                        case 'body':
                          dom = this.renderBodySections()
                          break
                        case 'images':
                          dom = this.renderImageSections()
                          break
                        case 'profiles':
                          dom = this.renderProfileSections()
                          break
                        case 'social':
                          dom = this.renderSocialContent()
                          break
                        case 'embedded':
                          dom = this.renderEmbeddedSections()
                          break
                        default:
                          return null
                      }
                      return (
                        <Draggable draggableId={objKey} index={index} key={objKey}>
                          {(provided): JSX.Element => (
                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <div>{dom}</div>
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        {this.renderButtonGroup(identifiers, false)}
      </>
    )
  }
}

const mapStateToProps = (state: RootState): any => ({
  step: createEntitySelectors.selectStep(state),
  entityType: createEntitySelectors.selectEntityType(state),
  pageContent: pageContentSelectors.selectPageContent(state),
  header: pageContentSelectors.selectHeaderContent(state),
  body: pageContentSelectors.selectBodyContentSections(state),
  images: pageContentSelectors.selectImageContentSections(state),
  profiles: pageContentSelectors.selectProfileContentSections(state),
  social: pageContentSelectors.selectSocialContent(state),
  embedded: pageContentSelectors.selectEmbeddedContentSections(state),
  validationComplete: pageContentSelectors.selectValidationComplete(state),
  validated: pageContentSelectors.selectValidated(state),
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleUpdateHeaderContent: (formData: FormData): void => dispatch(updateHeaderContent(formData)),
  handleAddBodySection: (): void => dispatch(addBodySection()),
  handleRemoveBodySection: (id: string): void => dispatch(removeBodySection(id)),
  handleUpdateBodyContent: (id: string, formData: FormData): void => dispatch(updateBodyContent(id, formData)),
  handleAddImageSection: (): void => dispatch(addImageSection()),
  handleRemoveImageSection: (id: string): void => dispatch(removeImageSection(id)),
  handleUpdateImageContent: (id: string, formData: FormData): void => dispatch(updateImageContent(id, formData)),
  handleAddProfileSection: (): void => dispatch(addProfileSection()),
  handleRemoveProfileSection: (id: string): void => dispatch(removeProfileSection(id)),
  handleUpdateProfileContent: (id: string, formData: FormData): void => dispatch(updateProfileContent(id, formData)),
  handleUpdateSocialContent: (formData: FormData): void => dispatch(updateSocialContent(formData)),
  handleUpdateEmbeddedContent: (id: string, formData: FormData): void => dispatch(updateEmbeddedContent(id, formData)),
  handleAddEmbeddedSection: (): void => dispatch(addEmbeddedSection()),
  handleRemoveEmbeddedSection: (id: string): void => dispatch(removeEmbeddedSection(id)),
  handleValidated: (identifier: string): void => dispatch(validated(identifier)),
  handleValidationError: (identifier: string, errors: string[]): void => dispatch(validationError(identifier, errors)),
  handleGoToStep: (step: number): void => dispatch(goToStep(step)),
  handleOrderContent: (srcId: string, dstId: string): void => dispatch(orderEntityPageContent(srcId, dstId)),
})

export const CreateEntityPageContentConnected = connect(mapStateToProps, mapDispatchToProps)(CreateEntityPageContent)
