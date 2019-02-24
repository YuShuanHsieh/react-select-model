import {
  useEffect,
  useReducer,
  useState,
} from "react"

import {
  reducer,
  selectAll,
  selectClear,
  selectItems,
  toggleSelect,
} from "./reducer"

import {
  Item,
  SelectionModelProps,
  SelectionModelActions
} from "../types"

export function useSelectionModel(props: SelectionModelProps): [Item[], SelectionModelActions] {
  const [selection, dispatch] = useReducer(reducer, new Set<Item>())
  const [preProps, setPreProps] = useState<SelectionModelProps>({initSelect: [], items: [], id: row => row.id})
  const toggle = (item: Item) => { dispatch(toggleSelect(item)) }
  const toggleAll = () => {
    if (selection.size) {
      dispatch(selectClear())
    } else {
      dispatch(selectAll(props.items))
    }
  }
  const isSelected = (item: Item) => selection.has(item)

  useEffect(() => {
    if (props.initSelect !== preProps.initSelect || props.items !== preProps.items) {
      const matchFunc = (Array.isArray(props.initSelect))
      ? (item: Item) =>
        (props.initSelect as string[]).find((select) => props.id(item) === select) !== undefined
      : (item: Item) =>
        (props.initSelect as Map<string, Item>).has(props.id(item))

      const set = new Set()
      props.items.forEach((item: Item) => {
        if (matchFunc(item)) {
          set.add(item)
        }
      })
      dispatch(selectItems(set))
      setPreProps(props)
    }
  })

  return [Array.from(selection), {
    isSelected,
    toggle,
    toggleAll,
  }]
}