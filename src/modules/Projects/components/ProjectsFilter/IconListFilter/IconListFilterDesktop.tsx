import * as React from 'react'
import { Props } from './types'
import {
  Button,
  ButtonWrapper,
  FilterModal,
  ModalItems,
  FilterSelectButton,
  ModalButtons,
  ResetButton,
  ApplyButton,
} from '../ProjectsFilter.style'

const IconListFilterDesktop: React.FunctionComponent<Props> = ({
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
    <ButtonWrapper
      className={`button-wrapper ${isActive ? 'active' : ''}`}
      onClick={handleButtonWrapperClick}
    >
      <Button
        onClick={(): void => handleToggleFilterShow(name)}
        className={itemsSelectedCount > 0 ? 'itemsSelected' : ''}
      >
        {itemsSelectedCount > 0 ? `${name} - ${itemsSelectedCount}` : name}
      </Button>
      <FilterModal
        className="filter-modal"
        style={{
          display: isActive ? 'block' : 'none',
        }}
      >
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
                  src={require('../assets/icons/' + itemIcon)}
                />
              </FilterSelectButton>
            )
          })}
        </ModalItems>
        <ModalButtons>
          <ResetButton onClick={(): void => handleFilterReset(name)}>
            Reset
          </ResetButton>
          <ApplyButton onClick={(): void => handleToggleFilterShow(name)}>
            Done
          </ApplyButton>
        </ModalButtons>
      </FilterModal>
    </ButtonWrapper>
  )
}

export default IconListFilterDesktop
