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
} from '../Filters.styles'
import * as utils from './IconListFilter.utils'

const IconListFilterDesktop: React.FunctionComponent<Props> = ({
  selectType,
  name,
  items,
  isActive,
  handleToggleFilterShow,
  handleFilterItemClick,
  handleFilterReset,
}) => {
  return (
    <ButtonWrapper
      className={`button-wrapper ${isActive ? 'active' : ''}`}
      onClick={(e): void =>
        utils.isFilterTarget(e) ? null : handleToggleFilterShow(name)
      }
    >
      <Button
        onClick={(): void => handleToggleFilterShow(name)}
        className={utils.getTitleClassName(items)}
      >
        {utils.getTitle(name, items, selectType)}
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

            return (
              <FilterSelectButton
                key={itemName}
                onClick={(): void => handleFilterItemClick(name, itemName)}
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
