import React, { FC } from 'react'

import * as utils from './IconListFilter.utils'
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
  ButtonIcon,
} from '../Filters.styles'

const IconListFilterDesktop: FC<Props> = ({
  selectType,
  name,
  items,
  isActive,
  handleToggleFilterShow,
  handleFilterItemClick,
  handleFilterReset,
  primaryButton,
  icon,
}) => {
  console.log({ icon })
  const handleToggleClick = (): void => handleToggleFilterShow(name)

  const handleResetClick = (): void => handleFilterReset(name)

  const handleFilterClick = (itemName: string) => (): void =>
    handleFilterItemClick(name, itemName)

  return (
    <ButtonWrapper
      className={`button-wrapper ${isActive ? 'active' : ''}`}
      onClick={(e): void | null =>
        utils?.isFilterTarget(e) ? null : handleToggleClick()
      }
    >
      <Button
        onClick={handleToggleClick}
        className={`${utils.getTitleClassName(items)} ${
          primaryButton ? 'contained' : ''
        }`}
      >
        {icon && <ButtonIcon className={icon} />}
        {utils.getTitle(name, items, selectType)}
      </Button>
      <FilterModal
        className="filter-modal"
        style={{
          display: isActive ? 'block' : 'none',
        }}
      >
        <ModalItems>
          {items.map((item) => {
            const { name: itemName, icon: itemIcon } = item

            return (
              <FilterSelectButton
                key={itemName}
                onClick={handleFilterClick(itemName)}
                className={utils.getItemClassName(items, itemName)}
              >
                <h3>{itemName}</h3>
                <img
                  alt={itemName}
                  src={require(`./assets/icons/${itemIcon}`)}
                />
              </FilterSelectButton>
            )
          })}
        </ModalItems>
        <ModalButtons>
          <ResetButton onClick={handleResetClick}>Reset</ResetButton>
          <ApplyButton onClick={handleToggleClick}>Done</ApplyButton>
        </ModalButtons>
      </FilterModal>
    </ButtonWrapper>
  )
}

export default IconListFilterDesktop
