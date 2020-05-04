import * as React from 'react'
import { Props } from './types'
import Back from '../../../../assets/icons/Back'
import Down from '../../../../assets/icons/Down'
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
} from '../Filters.styles'
import * as utils from './IconListFilter.utils'

interface MobileProps extends Props {
  showFilterSubMenu: boolean
}

const IconListFilterMobile: React.FunctionComponent<MobileProps> = ({
  selectType,
  showFilterSubMenu,
  name,
  items,
  isActive,
  handleToggleFilterShow,
  handleFilterItemClick,
  handleFilterReset,
}) => {
  const title = utils.getTitle(name, items, selectType)
  const modalDisplay = isActive || !showFilterSubMenu ? 'grid' : 'none'

  return (
    <MobileButtonWrapper
      className={`button-wrapper ${isActive ? 'active' : ''}`}
      onClick={(e): void =>
        utils.isFilterTarget(e) ? null : handleToggleFilterShow(name)
      }
    >
      {showFilterSubMenu && (
        <MobileButton onClick={(): void => handleToggleFilterShow(name)}>
          <span className={utils.getTitleClassName(items)}>{title}</span>
          <span className="right-arrow">
            <Down width="14" fill="#000" />
          </span>
        </MobileButton>
      )}
      <MobileFilterModal
        className="filter-modal"
        style={{ display: modalDisplay }}
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
            {title}
          </MobileFilterHeading>
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
