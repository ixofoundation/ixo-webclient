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
  ButtonImage,
} from '../Filters.styles'
import { requireCheckDefault } from 'utils/images'
import { ReactSVG } from 'react-svg'
import { FlexBox, SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { Button } from 'pages/CreateEntity/Components'

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

  const handleResetClick = (): void => handleFilterReset && handleFilterReset(name)

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
                <Typography weight='medium'>{itemName}</Typography>
                <SvgBox color='currentColor' svgWidth={12.5} svgHeight={12.5}>
                  <ReactSVG src={requireCheckDefault(require(`./assets/icons/${itemIcon}`))} />
                </SvgBox>
              </FilterSelectButton>
            )
          })}
        </ModalItems>
        <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
          {handleFilterReset && (
            <Button variant='secondary' onClick={handleResetClick}>
              Reset
            </Button>
          )}
          <Button variant='primary' onClick={handleToggleClick}>
            Done
          </Button>
        </FlexBox>
      </FilterModal>
    </ButtonWrapper>
  )
}

export default IconListFilterDesktop
