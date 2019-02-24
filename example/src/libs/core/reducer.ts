import { Item } from "../types"

const SELECT_TOGGLE  = "SELECT_TOGGLE"
const SELECT_MANY  = "SELECT_MANY"
const SELECT_CLEAR  = "SELECT_CLEAR"

interface Action {
  type: string,
  payload?: any,
}

export function toggleSelect(item: Item) {
  return {
    type: SELECT_TOGGLE,
    payload: item,
  }
}

export function selectItems(items: Set<Item>): Action {
  return {
    type: SELECT_MANY,
    payload: items,
  }
}

export function selectClear(): Action {
  return {
    type: SELECT_CLEAR,
  }
}

export function selectAll(items: Item[]): Action {
  const set = new Set()
  items.forEach((item) => {
    set.add(item)
  })
  return selectItems(set)
}

function toggleSelectAction(state: Set<Item>, action: Action) {
  const { payload } = action
  const set = new Set(state)
  if (set.has(payload)) {
    set.delete(payload)
  } else {
    set.add(payload)
  }
  return set
}

function selectItemsAction(state: Set<Item>, action: Action) {
  const { payload } = action
  return new Set(payload)
}

export function reducer(state: Set<Item>, action: Action) {
  switch (action.type) {
    case SELECT_TOGGLE:
      return toggleSelectAction(state, action)
    case SELECT_MANY:
      return selectItemsAction(state, action)
    case SELECT_CLEAR:
      return new Set()
    default:
      return state
  }
}
