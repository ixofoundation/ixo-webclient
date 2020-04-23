import * as React from 'react'
import { Props } from './types'
import Back from '../../../../../assets/icons/Back'
import Down from '../../../../../assets/icons/Down'
import {
  MobileButtonWrapper,
  MobileButton,
  MobileFilterHeading,
  MobileFilterWrapper,
  MobileFilterHeader,
  MobileFilterModal,
  ModalItems,
  FilterSelectButton,
  HeadingItem,
  DoneButtonWrapper,
  DoneButton,
} from '../ProjectsFilter.styles'

const IconListFilterMobile: React.FunctionComponent<Props> = ({
  name,
  items,
  isActive,
  handleToggleFilterShow,
  handleFilterItemClick,
  handleFilterReset,
}) => {
  const itemsSelectedCount = items.filter(item => item.isSelected).length

  const handleButtonWrapperClick = (e: any): void => {
    const filterModal = e.target
      .closest('.button-wrapper')
      .querySelector('.filter-modal')
    if (filterModal.contains(e.target)) {
      return
    }

    handleToggleFilterShow(name)
  }

  return (
    <MobileButtonWrapper
      className={`button-wrapper ${isActive ? 'active' : ''}`}
      onClick={handleButtonWrapperClick}
    >
      <MobileButton onClick={(): void => handleToggleFilterShow(name)}>
        <span>
          {itemsSelectedCount > 0 ? `${name} - ${itemsSelectedCount}` : name}
        </span>
        <span className="right-arrow">
          <Down width="14" fill="#000" />
        </span>
      </MobileButton>
      <MobileFilterModal
        className="filter-modal"
        style={{ display: isActive ? 'grid' : 'none' }}
      >
        <MobileFilterHeader>
          <HeadingItem onClick={(): void => handleToggleFilterShow(name)}>
            <Back />
          </HeadingItem>
          <HeadingItem onClick={(): void => handleFilterReset(name)}>
            clear
          </HeadingItem>
        </MobileFilterHeader>
        <MobileFilterWrapper>
          <MobileFilterHeading className="tag-select-heading">
            {itemsSelectedCount > 0 ? `${name} - ${itemsSelectedCount}` : name}
          </MobileFilterHeading>
          <ModalItems>
            {items.map(item => {
              const { name: itemName, icon: itemIcon } = item

              const isItemActive = items
                .filter(item => item.isSelected)
                .map(item => item.name)
                .includes(itemName)

              return (
                <FilterSelectButton
                  key={itemName}
                  onClick={(): void => handleFilterItemClick(name, itemName)}
                  className={isItemActive ? 'buttonPressed' : ''}
                >
                  <h3>{itemName}</h3>
                  <img
                    alt={itemName}
                    src={require('./assets/icons/' + itemIcon)}
                  />
                </FilterSelectButton>
              )
            })}
          </ModalItems>
        </MobileFilterWrapper>
        <DoneButtonWrapper>
          <DoneButton onClick={(): void => handleToggleFilterShow(name)}>
            Done
          </DoneButton>
        </DoneButtonWrapper>
      </MobileFilterModal>
    </MobileButtonWrapper>
  )
}

export default IconListFilterMobile
