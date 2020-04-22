export interface FilterItem {
  name: string
  icon: string
  isSelected: boolean
}

export interface Props {
  name: string
  items: FilterItem[]
  isActive: boolean
  handleToggleFilterShow: (name: string) => void
  handleFilterItemClick: (name: string, itemName: string) => void
  handleFilterReset: (name: string) => void
}
