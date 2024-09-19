import React from 'react'
import styled from 'styled-components'
import { without, map, includes, get, upperFirst, toLower } from 'lodash'
import Select from 'react-select'
import Modal from '../../Modal/Modal'
import { Entity } from './types'
import TemplateClipboard from 'assets/icons/TemplateClipboard'
import { NoTemplatePreviewWrapper, ListWrapper, ModalWrapper } from './EntitySelector.styles'
import EntityCard from './EntityCard/EntityCard'
import { LinkButton } from '../../JsonForm/JsonForm.styles'
import SearchInput from './SearchInput/SearchInput'

interface Props {
  entities: Entity[]
  selectedEntityId: string
  onSelectEntity: (entityId: string) => void
}

interface State {
  isModalOpen: boolean
  selectedEntityId: string
  searchInputEntityId: string
  selectedOption: any
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
  { value: 'invoice', label: 'Invoice' },
  { value: 'offset', label: 'Offset' },
  { value: 'contribution', label: 'Contribution' },
  { value: 'grant', label: 'Grant' },
  { value: 'compensation', label: 'Compensation' },
]

class EntitySelector extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isModalOpen: false,
      selectedEntityId: this.props.selectedEntityId,
      searchInputEntityId: null!,
      selectedOption: null,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
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

  renderEntities = (keyword: string, selectedOption: any): JSX.Element[] => {
    const NUMBER_OF_ROWS = 3
    const { entities: entitiesFromProps } = this.props
    let entities: any[] = [],
      tempEntities = []

    /// filtering by keyword and option selected ///

    if (keyword === null || keyword.length <= 0) {
      tempEntities = entitiesFromProps
    } else {
      const lowerKeyword = keyword.toLowerCase()
      tempEntities = without(
        map(entitiesFromProps, (entity) => {
          if (includes(entity.title.toLowerCase(), lowerKeyword)) return entity
          return undefined
        }),
        undefined,
      )
    }

    if (selectedOption !== null) {
      map(tempEntities, (entity) => {
        if (includes(get(entity, 'ddoTags[1].tags', []), upperFirst(toLower(selectedOption.value))))
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
        <div className='row m-0'>
          {entities
            .filter((_, index) => index >= rowIndex * NUMBER_OF_ROWS && index < (rowIndex + 1) * NUMBER_OF_ROWS)
            .map((entity) => {
              return (
                <div
                  key={entity.did}
                  className={`col-md-${12 / NUMBER_OF_ROWS} text-left my-2 px-2`}
                  onClick={(): void => this.selectEntity(entity.did)}
                >
                  <EntityCard entity={entity} isSelected={selectedEntityId === entity.did}></EntityCard>
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
          <TemplateClipboard width='30' />
          <div>Select A Template</div>
        </NoTemplatePreviewWrapper>
      )
    }

    const entity = entities.find((entity) => entity.did === selectedEntityId)

    return (
      <div>
        <EntityCard entity={entity!} isSelected={false}></EntityCard>
        <LinkButton type='button' onClick={this.openTemplateSelector}>
          Replace
        </LinkButton>
      </div>
    )
  }

  onSearchInputChange = (e: any): void => {
    this.setState({ searchInputEntityId: e.target.value })
  }

  handlReset = (): void => {
    this.setState({ searchInputEntityId: '', selectedOption: null })
  }

  render(): JSX.Element {
    const { isModalOpen, selectedEntityId, searchInputEntityId, selectedOption } = this.state

    return (
      <>
        {this.renderPreview()}
        {isModalOpen && (
          <ModalWrapper>
            <Modal
              submitText='Select'
              cancelText='Cancel'
              resetText='Reset'
              onCancel={this.closeTemplateSelector}
              onSubmit={this.onSubmit}
              onReset={this.handlReset}
              submitEnabled={!!selectedEntityId}
            >
              <div className='row m-0 mb-4 px-0'>
                <div className='col-md-8 col-sm-12 px-2'>
                  <StyledSearchWrapper>
                    <SearchInput onChange={this.onSearchInputChange} value={searchInputEntityId} />
                  </StyledSearchWrapper>
                </div>
                <div className='col-md-4 col-sm-12 col-xs-12 px-2'>
                  <Select
                    options={options.sort((a, b) => {
                      const label1 = a.label.toUpperCase()
                      const label2 = b.label.toUpperCase()

                      if (label1 < label2) {
                        return -1
                      } else if (label1 > label2) {
                        return 1
                      }
                      return 0
                    })}
                    onChange={(e: any): void => this.setState({ selectedOption: e })}
                    value={selectedOption}
                  />
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
