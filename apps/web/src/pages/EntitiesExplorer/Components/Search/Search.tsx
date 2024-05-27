import * as React from 'react'
import MediaQuery from 'react-responsive'
import { useAppSelector } from 'redux/hooks'
import InputText from 'components/Form/InputText/InputText'
import { deviceWidth } from 'constants/device'
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

import Tooltip from 'components/Tooltip/Tooltip'
import { EntityType } from 'types/entities'
import { selectEntityConfig } from 'redux/configs/configs.selectors'

// TODO - search submitted

interface Props {
  type: EntityType
  entityColor?: string
  filterQuery: string
  filterChanged: (type: EntityType) => void
  queryChanged: (query: string) => void
}

const Search: React.FunctionComponent<Props> = ({ type, entityColor, filterQuery, filterChanged, queryChanged }) => {
  const entityTypeMap = useAppSelector(selectEntityConfig)
  const [search, setSearch] = React.useState<string | undefined>('')
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

  const pluralizedEntity = entityTypeMap?.[type]?.plural ?? ""

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event?.target?.value ?? ''
    setSearch(value)
    queryChanged(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>): void => {
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

  if (!entityTypeMap) return null

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-lg-8 offset-lg-2'>
          <SearchWrapper>
            <Tooltip text={'Select to Explore'}>
              <ModalButton onClick={handleToggleModal} className={isModalOpen ? 'modal-open' : ''}>
                {type === EntityType.Project && <Projects fill='#000' width='26' />}
                {type === EntityType.Oracle && <Oracle fill='#000' width='26' />}
                {type === EntityType.Investment && <Investments fill='#000' width='26' />}
                {type === EntityType.Dao && <Cells fill='#000' width='26' />}
                {type === EntityType.Protocol && <Template fill='#000' width='26' />}
                {type === EntityType.Asset && <DataAssets fill='#000' width='26' />}
                <span className='modal-text'>{pluralizedEntity}</span>
                <MediaQuery minWidth={`${deviceWidth.mobile + 1}px`}>
                  <span className='down-icon d-flex'>
                    <SquareGrid fill='#000' />
                  </span>
                </MediaQuery>
              </ModalButton>
            </Tooltip>
            <form onSubmit={handleSubmit} className='search-input-wrapper'>
              <InputText
                formStyle={FormStyles.search}
                id='name'
                type='text'
                text={`Search all ${pluralizedEntity}`}
                key='search'
                value={search || ''}
                onChange={handleChange}
              />
            </form>
            <SearchIconWrapper onClick={handleSubmit}>
              <SearchIcon fill={entityColor || '#83d9f2'} />
            </SearchIconWrapper>
            <SearchModal style={{ display: isModalOpen ? 'block' : 'none' }}>
              <SearchHeading>Explore</SearchHeading>
              <SearchButtonsWrapper>
                <SearchFilterButton
                  onClick={() => handleSearchFilter(EntityType.Project)}
                  className={`
                    ${EntityType.Project.toLowerCase()} ${type === EntityType.Project ? 'active' : ''}
                    `}
                  color={entityTypeMap?.[EntityType.Project]?.themeColor}
                >
                  <ButtonContent>
                    <Projects fill='#000' width='26' />
                    {entityTypeMap?.[EntityType.Project]?.plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={() => handleSearchFilter(EntityType.Oracle)}
                  className={`
                    ${EntityType.Oracle.toLowerCase()} ${type === EntityType.Oracle ? 'active' : ''}
                    `}
                  color={entityTypeMap?.[EntityType.Oracle]?.themeColor}
                >
                  <ButtonContent>
                    <Oracle fill='#000' width='26' />
                    {entityTypeMap?.[EntityType.Oracle]?.plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={() => handleSearchFilter(EntityType.Investment)}
                  className={`
                    ${EntityType.Investment.toLowerCase()} ${type === EntityType.Investment ? 'active' : ''}
                    `}
                  color={entityTypeMap?.[EntityType.Investment]?.themeColor}
                >
                  <ButtonContent>
                    <Investments fill='#000' width='26' />
                    {entityTypeMap?.[EntityType.Investment]?.plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={() => handleSearchFilter(EntityType.Dao)}
                  className={`
                    ${EntityType.Dao.toLowerCase()} ${type === EntityType.Dao ? 'active' : ''}
                    `}
                  color={entityTypeMap?.[EntityType.Dao]?.themeColor}
                >
                  <ButtonContent>
                    <Cells fill='#000' width='26' />
                    {entityTypeMap?.[EntityType.Dao]?.plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={() => handleSearchFilter(EntityType.Protocol)}
                  className={`
                    ${EntityType.Protocol.toLowerCase()} ${type === EntityType.Protocol ? 'active' : ''}
                    `}
                  color={entityTypeMap?.[EntityType.Protocol]?.themeColor}
                >
                  <ButtonContent>
                    <Template fill='#000' width='26' />
                    {entityTypeMap?.[EntityType.Protocol]?.plural}
                  </ButtonContent>
                </SearchFilterButton>
                <SearchFilterButton
                  onClick={() => handleSearchFilter(EntityType.Asset)}
                  className={`
                    ${EntityType.Asset.toLowerCase()} ${type === EntityType.Asset ? 'active' : ''}
                    `}
                  color={entityTypeMap?.[EntityType.Asset]?.themeColor}
                >
                  <ButtonContent>
                    <DataAssets fill='#000' width='26' />
                    {entityTypeMap?.[EntityType.Asset]?.plural}
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
