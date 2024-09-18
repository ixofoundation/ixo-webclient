import { FC } from 'react'

import Back from '../../../assets/icons/Back'
import Down from '../../../assets/icons/Down'
import * as utils from '../../../utils/filters'
import { Props } from './types'
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
import { requireCheckDefault } from 'utils/images'
import { Typography } from 'components/Typography'
import { SvgBox } from 'components/CoreEntry/App.styles'
import { ReactSVG } from 'react-svg'

interface MobileProps extends Props {
  showFilterSubMenu: boolean
}

const IconListFilterMobile: FC<MobileProps> = ({
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
  const modalDisplay = isActive || !showFilterSubMenu ? 'block' : 'none'

  const handleToggleFilterClick = (): void => handleToggleFilterShow(name)

  const handleResetClick = (): void => handleFilterReset && handleFilterReset(name)

  const handleFilterClick = (itemName: string) => (): void => handleFilterItemClick(name, itemName)

  return (
    <MobileButtonWrapper
      className={`button-wrapper ${isActive ? 'active' : ''}`}
      onClick={(e): void | null => (utils?.isFilterTarget(e) ? null : handleToggleFilterClick())}
    >
      {showFilterSubMenu && (
        <MobileButton onClick={handleToggleFilterClick}>
          <span className={utils.getTitleClassName(items)}>{title}</span>
          <span className='right-arrow'>
            <Down width='14' fill='#000' />
          </span>
        </MobileButton>
      )}
      <MobileFilterModal className='filter-modal' style={{ display: modalDisplay }}>
        <MobileFilterHeader>
          <HeadingItem onClick={handleToggleFilterClick}>
            <Back />
          </HeadingItem>
          {handleFilterReset && <HeadingItem onClick={handleResetClick}>clear</HeadingItem>}
        </MobileFilterHeader>
        <MobileFilterWrapper>
          <ModalItems>
            <MobileFilterHeading>{title}</MobileFilterHeading>

            {items.map((item) => {
              const { name: itemName, icon: itemIcon } = item

              return (
                <FilterSelectButton
                  key={itemName}
                  onClick={handleFilterClick(itemName)}
                  className={utils.getItemClassName(items, itemName)}
                >
                  <Typography weight='medium'>{itemName}</Typography>
                  <SvgBox color='currentColor' $svgWidth={12.5} $svgHeight={12.5}>
                    <ReactSVG src={requireCheckDefault(require(`./assets/icons/${itemIcon}`))} />
                  </SvgBox>
                </FilterSelectButton>
              )
            })}
          </ModalItems>
          <DoneButtonWrapper>
            <DoneButton onClick={handleToggleFilterClick}>Done</DoneButton>
          </DoneButtonWrapper>
        </MobileFilterWrapper>
      </MobileFilterModal>
    </MobileButtonWrapper>
  )
}

export default IconListFilterMobile
