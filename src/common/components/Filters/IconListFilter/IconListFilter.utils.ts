import { SelectType, FilterItem } from './types'

export const getTitle = (
  name: string,
  items: FilterItem[],
  selectType: SelectType,
): string => {
  const selectedItems = items.filter((item) => item.isSelected)
  const itemsSelectedCount = selectedItems.length
  const title =
    selectType === SelectType.MultiSelect
      ? itemsSelectedCount > 0
        ? `${itemsSelectedCount} ${name}` + (itemsSelectedCount > 1 ? 's' : '')
        : name
      : selectedItems.length === 0
      ? name
      : `${selectedItems[0].name} ${name}`

  return title
}

export const getTitleClassName = (items: FilterItem[]): string => {
  const selectedItems = items.filter((item) => item.isSelected)
  const itemsSelectedCount = selectedItems.length

  return itemsSelectedCount > 0 ? 'itemsSelected' : ''
}

export const getItemClassName = (
  items: FilterItem[],
  itemName: string,
): string => {
  const isItemActive = items
    .filter((item) => item.isSelected)
    .map((item) => item.name)
    .includes(itemName)

  return isItemActive ? 'buttonPressed' : ''
}

export const isFilterTarget = (e: any): boolean => {
  const filterModal = e.target
    .closest('.button-wrapper')
    .querySelector('.filter-modal')
  if (filterModal.contains(e.target)) {
    return true
  }

  return false
}
