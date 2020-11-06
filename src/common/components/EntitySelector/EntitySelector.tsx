import React from 'react'
import styled from 'styled-components'
import { without, map, includes, get, upperFirst, toLower } from 'lodash'
import Select from 'react-select'
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
import SearchInput from './SearchInput'

interface Props {
  entities: Entity[]
  selectedEntityId: string
  onSelectEntity: (entityId: string) => void
}

interface State {
  isModalOpen: boolean
  selectedEntityId: string,
  searchInputEntityId: string,
  selectedOption: string,
}

const StyledSearchWrapper = styled.div`
  height: 100%;
`

const options = [
  { value: 'service', label: 'Service' },
  { value: 'outcome', label: 'Outcome' },
  { value: 'credential', label: 'Credential' },
  { value: 'useOfFunds', label: 'Use Of Funds' },
  { value: 'payment', label: 'Payment' },
  { value: 'investment', label: 'Investment' },
  { value: 'banking', label: 'Banking' },
  { value: 'procurement', label: 'Procurement' },
  { value: 'provenance', label: 'Provenance' },
  { value: 'ownership', label: 'Ownership' },
  { value: 'custody', label: 'Custody' },
  { value: 'dispute', label: 'Dispute' },
]

class EntitySelector extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      selectedEntityId: this.props.selectedEntityId,
      searchInputEntityId: null,
      selectedOption: null,
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

  renderEntities = (keyword: string, selectedOption: string): JSX.Element[] => {
    const NUMBER_OF_ROWS = 3
    const { entities: entitiesFromProps } = this.props
    let entities = [], tempEntities = []

    /// filtering by keyword and option selected ///

    if (keyword === null || keyword.length <= 0) {
      tempEntities = entitiesFromProps
    } else {
      tempEntities = without(map(entitiesFromProps, entity => {
        if (includes(entity.did, keyword))
          return entity
        return undefined
      }), undefined)
    }

    if (selectedOption !== null) {
      console.log('selectedOption',selectedOption)
      map(tempEntities, entity => {
        console.log(get(entity, 'ddoTags[1].tags', []))
        if (includes(get(entity, 'ddoTags[1].tags', []), upperFirst(toLower(selectedOption))))
          entities.push(entity)
      })
    } else {
      entities = tempEntities
    }

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
        <EntityCard entity={entity} isSelected={false}></EntityCard>
        <LinkButton type="button" onClick={this.openTemplateSelector}>
          Replace
        </LinkButton>
      </div>
    )
  }

  onSearchInputChange = (e): void => {
    console.log('onSearchInputChange', e)
    this.setState({searchInputEntityId: e.target.value})
  }

  render(): JSX.Element {
    const { isModalOpen, selectedEntityId, searchInputEntityId, selectedOption } = this.state

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
              submitEnabled={!!selectedEntityId}
            >
              <div className="row mb-4">
                <div className="col-md-8 col-sm-12">
                  <StyledSearchWrapper>
                    <SearchInput onChange={this.onSearchInputChange} />
                  </StyledSearchWrapper>
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <Select options={options} onChange={(e: any) => this.setState({selectedOption: e.value})} />
                </div>
              </div>
              <ListWrapper>{this.renderEntities(searchInputEntityId, selectedOption)}</ListWrapper>
            </Modal>
          </ModalWrapper>
        )}
      </>
    )
  }
}

export default EntitySelector
