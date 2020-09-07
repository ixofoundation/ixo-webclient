import React from 'react'
import Modal from '../Modal/Modal'
import { Entity } from './types'
import TemplateClipboard from 'assets/icons/TemplateClipboard'
import {
  NoTemplatePreviewWrapper,
  ListWrapper,
  ModalWrapper,
} from './EntitySelector.styles'
import EntityCard from './EntityCard/EntityCard'
import { LinkButton } from '../JsonForm/JsonForm.styles'

interface Props {
  entities: Entity[]
  selectedEntityId: string
  onSelectEntity: (entityId: string) => void
}

interface State {
  isModalOpen: boolean
  selectedEntityId: string
}

class EntitySelector extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      selectedEntityId: this.props.selectedEntityId,
    }
  }

  componentWillReceiveProps(nextProps: Props): void {
    const { selectedEntityId } = this.props

    if (selectedEntityId !== nextProps.selectedEntityId) {
      this.setState({ selectedEntityId: nextProps.selectedEntityId })
    }
  }

  openTemplateSelector = (): void => {
    this.setState({ isModalOpen: true })
  }

  closeTemplateSelector = (): void => {
    this.setState({ isModalOpen: false })
  }

  selectEntity = (selectedEntityId: string): void => {
    this.setState({ selectedEntityId })
  }

  onSubmit = (): void => {
    this.setState({ isModalOpen: false })
    const { onSelectEntity } = this.props
    onSelectEntity(this.state.selectedEntityId)
  }

  renderEntities = (): JSX.Element[] => {
    const NUMBER_OF_ROWS = 3
    const { entities } = this.props
    const { selectedEntityId } = this.state
    const rowCount = Math.ceil(entities.length / NUMBER_OF_ROWS)

    return Array.from(Array(rowCount).keys()).map((rowIndex) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <div className="row">
          {entities
            .filter(
              (_, index) =>
                index >= rowIndex * NUMBER_OF_ROWS &&
                index < (rowIndex + 1) * NUMBER_OF_ROWS,
            )
            .map((entity) => {
              return (
                <div
                  key={entity.did}
                  className={`col-md-${12 / NUMBER_OF_ROWS} text-left`}
                  onClick={(): void => this.selectEntity(entity.did)}
                >
                  <EntityCard
                    showImage={true}
                    entity={entity}
                    isSelected={selectedEntityId === entity.did}
                  ></EntityCard>
                </div>
              )
            })}
        </div>
      )
    })
  }

  renderPreview = (): JSX.Element => {
    const { selectedEntityId, entities } = this.props

    if (!selectedEntityId) {
      return (
        <NoTemplatePreviewWrapper onClick={this.openTemplateSelector}>
          <TemplateClipboard width="30" />
          <div>Select A Template</div>
        </NoTemplatePreviewWrapper>
      )
    }

    const entity = entities.find((entity) => entity.did === selectedEntityId)

    return (
      <div>
        <EntityCard
          entity={entity}
          isSelected={false}
          showImage={false}
        ></EntityCard>
        <LinkButton type="button" onClick={this.openTemplateSelector}>
          Replace
        </LinkButton>
      </div>
    )
  }

  render(): JSX.Element {
    const { isModalOpen } = this.state

    return (
      <>
        {this.renderPreview()}
        {isModalOpen && (
          <ModalWrapper>
            <Modal
              submitText="Select"
              cancelText="Cancel"
              onCancel={this.closeTemplateSelector}
              onSubmit={this.onSubmit}
            >
              <ListWrapper>{this.renderEntities()}</ListWrapper>
            </Modal>
          </ModalWrapper>
        )}
      </>
    )
  }
}

export default EntitySelector
