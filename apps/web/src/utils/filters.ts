import { TEntityModel } from 'types/entities'
import { SelectType, FilterItem } from '../components/Filters/IconListFilter/types'

const RELAYER_NODE = process.env.REACT_APP_RELAYER_NODE

export const getTitle = (name: string, items: FilterItem[], selectType: SelectType): string => {
  const selectedItems = items.filter((item) => item.isSelected)
  const itemsSelectedCount = selectedItems.length
  const title =
    selectType === SelectType.MultiSelect
      ? itemsSelectedCount > 0
        ? `${itemsSelectedCount} ${name}` + (itemsSelectedCount > 1 ? 's' : '')
        : name
      : selectedItems.length === 0
        ? name
        : `${selectedItems[0].name}`

  return title
}
export const getTitleIcon = (items: FilterItem[]): string | null => {
  const selectedItems = items.filter((item) => item.isSelected)
  const title = !selectedItems.length ? null : selectedItems[0].icon

  return title
}

export const getTitleClassName = (items: FilterItem[]): string => {
  const selectedItems = items.filter((item) => item.isSelected)
  const itemsSelectedCount = selectedItems.length

  return itemsSelectedCount > 0 ? 'itemsSelected' : ''
}

export const getItemClassName = (items: FilterItem[], itemName: string): string => {
  const isItemActive = items
    .filter((item) => item.isSelected)
    .map((item) => item.name)
    .includes(itemName)

  return isItemActive ? 'buttonPressed' : ''
}

export const isFilterTarget = (e: any): boolean => {
  const filterModal = e.target.closest('.button-wrapper').querySelector('.filter-modal')
  if (filterModal.contains(e.target)) {
    return true
  }

  return false
}

export const filterEntitiesByRelayerNode = (entity: TEntityModel): boolean => {
  // Condition 1
  const condition1 = entity.relayerNode === RELAYER_NODE && entity.entityVerified === true

  // Condition 2
  const condition2 = entity.id === RELAYER_NODE && entity.entityVerified === true

  return condition1 || condition2
}

export const filterProtocolDeedEntities = (entity: TEntityModel): boolean => {
  return entity.entityVerified && entity.profile?.category === 'Offer' && entity.relayerNode === RELAYER_NODE
}

export const filterProtocolDeedProposalEntities = (entity: TEntityModel): boolean => {
  return entity.profile?.category === 'Proposal' && entity.relayerNode === RELAYER_NODE
}
