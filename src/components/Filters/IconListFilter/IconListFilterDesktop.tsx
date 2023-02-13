import { FC, useMemo } from 'react'

import * as utils from '../../../utils/filters'
import { Props } from './types'
import {
  ButtonOuter,
  ButtonInner,
  ButtonWrapper,
  FilterModal,
  ModalItems,
  FilterSelectButton,
  ModalButtons,
  ResetButton,
  ApplyButton,
  ButtonImage,
} from '../Filters.styles'
import { requireCheckDefault } from 'utils/images'

const IconListFilterDesktop: FC<Props> = ({
  selectType,
  name,
  items,
  isActive,
  handleToggleFilterShow,
  handleFilterItemClick,
  handleFilterReset,
  primaryButton,
  renderIcon,
}) => {
  const handleToggleClick = (): void => handleToggleFilterShow(name)

  const handleResetClick = (): void => handleFilterReset(name)

  const handleFilterClick = (itemName: string) => (): void => handleFilterItemClick(name, itemName)

  const icon = useMemo(() => (renderIcon ? utils.getTitleIcon(items) : null), [items, renderIcon])

  return (
    <ButtonWrapper
      className={`button-wrapper ${isActive ? 'active' : ''}`}
      onClick={(e): void | null => (utils?.isFilterTarget(e) ? null : handleToggleClick())}
    >
      <ButtonOuter
        onClick={handleToggleClick}
        className={`${utils.getTitleClassName(items)} ${primaryButton ? 'contained' : ''}`}
      >
        <ButtonInner>
          {renderIcon && icon && (
            <ButtonImage alt={icon} src={requireCheckDefault(require(`./assets/icons/${icon}`))} />
          )}
          {utils.getTitle(name, items, selectType)}
        </ButtonInner>
      </ButtonOuter>
      <FilterModal
        className='filter-modal'
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
                <img alt={itemName} src={requireCheckDefault(require(`./assets/icons/${itemIcon}`))} />
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
