import { ReactNode } from "react"

export interface Item {
  [key: string]: any
}

export interface SelectionModelProps {
  initSelect: string[] | Map<string, Item>,
  items: Item[],
  onChange?: (items: Item[]) => void,
  id: (item: Item) => string,
  children?: (props: any) => ReactNode
}

export interface SelectionModelActions {
  isSelected: (item: Item) => boolean,
  toggle: (item: Item) => void,
  toggleAll: () => void,
}

