export enum SelectType {
  SingleSelect = 'SINGLE_SELECT',
  MultiSelect = 'MULTI_SELECT',
}

export interface FilterItem {
  name: string
  icon: string
  isSelected: boolean
}

export interface Props {
  selectType: SelectType
  name: string
  items: FilterItem[]
  isActive: boolean
  handleToggleFilterShow: (name: string) => void
  handleFilterItemClick: (name: string, itemName: string) => void
  handleFilterReset?: (name: string) => void
  primaryButton?: boolean
  renderIcon?: boolean
}
