import * as React from 'react'
import MediaQuery from 'react-responsive'
import { useSelector } from 'react-redux'
import InputText from 'common/components/Form/InputText/InputText'
import { deviceWidth } from 'lib/commonData'
import { FormStyles } from 'types/models'
import {
  SearchWrapper,
  ModalButton,
  SearchIconWrapper,
  SearchModal,
  SearchHeading,
  SearchButtonsWrapper,
  SearchFilterButton,
  ButtonContent,
} from './Search.styles'
import Investments from 'assets/icons/Investments'
import Cells from 'assets/icons/Cells'
import Oracle from 'assets/icons/Oracle'
import Template from 'assets/icons/Template'
import SearchIcon from 'assets/icons/Search'
import SquareGrid from 'assets/icons/SquareGrid'
import Projects from 'assets/icons/Projects'
import DataAssets from 'assets/icons/DataAssets'
import { EntityType } from '../../../types'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import Tooltip from 'common/components/Tooltip/Tooltip'

// TODO - search submitted

interface Props {
  type: EntityType
  entityColor?: string
  filterQuery: string
  filterChanged: (type: EntityType) => void
  queryChanged: (query: string) => void
}

const Search: React.FunctionComponent<Props> = ({ type, entityColor, filterQuery, filterChanged, queryChanged }) => {
  const entityTypeMap = useSelector(selectEntityConfig)
  const [search, setSearch] = React.useState('')
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleChange = (event: any): void => {
    setSearch(event.target.value)
    queryChanged(event.target.value)
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault()
    // alert(`Search for: ${search}`)
  }

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen)
  }

  const handleSearchFilter = (type: EntityType): void => {
    handleToggleModal()
    filterChanged(type)
  }

  React.useEffect(() => {
    if (filterQuery) {
      setSearch(filterQuery)
    }
    // eslint-disable-next-line
  }, [filterQuery])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-lg-8 offset-lg-2'>
          <SearchWrapper>
            <Tooltip text={'Select to Explore'}>
              <ModalButton onClick={(): void => handleToggleModal()} className={isModalOpen ? 'modal-open' : ''}>
                {type === EntityType.Project && <Projects fill='#000' width='26' />}
                {type === EntityType.Oracle && <Oracle fill='#000' width='26' />}
                {type === EntityType.Investment && <Investments fill='#000' width='26' />}
                {type === EntityType.Dao && <Cells fill='#000' width='26' />}
                {type === EntityType.Template && <Template fill='#000' width='26' />}
                {type === EntityType.Asset && <DataAssets fill='#000' width='26' />}
                <span className='modal-text'>{entityTypeMap[type].plural}</span>
                <MediaQuery minWidth={`${deviceWidth.mobile + 1}px`}>
                  <span className='down-icon d-flex'>
                    <SquareGrid fill='#000' />
                  </span>
                </MediaQuery>
              </ModalButton>
            </Tooltip>
            <form onSubmit={(e): void => handleSubmit(e)} className='search-input-wrapper'>
              <InputText
                formStyle={FormStyles.search}
                id='name'
                type='text'
                text={`Search all ${entityTypeMap[type].plural}`}
                key='search'
                value={search}
                onChange={(event): void => handleChange(event)}
              />
            </form>
            <SearchIconWrapper onClick={handleSubmit}>
              <SearchIcon fill={entityColor || '#83d9f2'} />
            </SearchIconWrapper>
            <SearchModal style={{ display: isModalOpen ? 'block' : 'none' }}>
              <SearchHeading>Explore</SearchHeading>
              <SearchButtonsWrapper>
                <SearchFilterButton
                  onClick={(): void => handleSearchFilter(EntityType.Project)}
                  className={`
                    ${EntityType.Project.toLowerCase()} ${type === EntityType.Project ? 'active' : ''}
                    `}
                  color={entityTypeMap[EntityType.Project].themeColor}
                >
                  <ButtonContent>
                    <Projects fill='#000' width='26' />
                    {entityTypeMap[EntityType.Project].plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={(): void => handleSearchFilter(EntityType.Oracle)}
                  className={`
                    ${EntityType.Oracle.toLowerCase()} ${type === EntityType.Oracle ? 'active' : ''}
                    `}
                  color={entityTypeMap[EntityType.Oracle].themeColor}
                >
                  <ButtonContent>
                    <Oracle fill='#000' width='26' />
                    {entityTypeMap[EntityType.Oracle].plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={(): void => handleSearchFilter(EntityType.Investment)}
                  className={`
                    ${EntityType.Investment.toLowerCase()} ${type === EntityType.Investment ? 'active' : ''}
                    `}
                  color={entityTypeMap[EntityType.Investment].themeColor}
                >
                  <ButtonContent>
                    <Investments fill='#000' width='26' />
                    {entityTypeMap[EntityType.Investment].plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={(): void => handleSearchFilter(EntityType.Dao)}
                  className={`
                    ${EntityType.Dao.toLowerCase()} ${type === EntityType.Dao ? 'active' : ''}
                    `}
                  color={entityTypeMap[EntityType.Dao].themeColor}
                >
                  <ButtonContent>
                    <Cells fill='#000' width='26' />
                    {entityTypeMap[EntityType.Dao].plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={(): void => handleSearchFilter(EntityType.Template)}
                  className={`
                    ${EntityType.Template.toLowerCase()} ${type === EntityType.Template ? 'active' : ''}
                    `}
                  color={entityTypeMap[EntityType.Template].themeColor}
                >
                  <ButtonContent>
                    <Template fill='#000' width='26' />
                    {entityTypeMap[EntityType.Template].plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={(): void => handleSearchFilter(EntityType.Asset)}
                  className={`
                    ${EntityType.Asset.toLowerCase()} ${type === EntityType.Asset ? 'active' : ''}
                    `}
                  color={entityTypeMap[EntityType.Asset].themeColor}
                >
                  <ButtonContent>
                    <DataAssets fill='#000' width='26' />
                    {entityTypeMap[EntityType.Asset].plural}
                  </ButtonContent>
                </SearchFilterButton>
              </SearchButtonsWrapper>
            </SearchModal>
          </SearchWrapper>
        </div>
      </div>
    </div>
  )
}

export default Search
