import React, { Component } from "react"

import {
  Item,
  SelectionModelProps,
  SelectionModelState,
} from "../types"

export class SelectionModel extends Component<
  SelectionModelProps,
  SelectionModelState
> {
  static defaultProps = {
    id: (item: Item) => item.id,
    initSelect: null,
    items: [],
  }

  state = {
    selection: new Set(),
  }

  constructor(props: SelectionModelProps) {
    super(props)
  }

  componentDidMount() {
    this.initializeSelection()
  }

  componentDidUpdate(prevProps: SelectionModelProps) {
    if (this.props.items !== prevProps.items ||
      this.props.initSelect !== prevProps.initSelect) {
        this.initializeSelection()
      }
  }

  initializeSelection() {
    const {initSelect, items, id} = this.props
    if (!initSelect) {
      return
    }
    const matchFunc = (Array.isArray(initSelect))
    ? (item: Item) =>
      initSelect.find((select) => id(item) === select) !== undefined
    : (item: Item) =>
    initSelect.has(id(item))

    const set = new Set()
    items.forEach((item) => {
      if (matchFunc(item)) {
        set.add(item)
      }
    })
    this.emitChange(set)
    this.setState({
      selection: set,
    })
  }

  select(item: Item) {
    this.setState((pre) => {
      pre.selection.add(item)
      this.emitChange(pre.selection)
      return {
        selection: new Set(pre.selection),
      }
    })
  }

  deselect(item: Item) {
    this.setState((pre) => {
      pre.selection.delete(item)
      this.emitChange(pre.selection)
      return {
        selection: new Set(pre.selection),
      }
    })
  }

  emitChange(set: Set<Item>) {
    if (this.props.onChange) {
      this.props.onChange(Array.from(set))
    }
  }

  isSelected(item: Item) {
    return this.state.selection.has(item)
  }

  toggleSelect = (item: Item) => (e: React.BaseSyntheticEvent) => {
    e.stopPropagation()
    if (this.isSelected(item)) {
      this.deselect(item)
    } else {
      this.select(item)
    }
  }

  selectAll() {
    const set = new Set()
    this.props.items.forEach((item) => {
      set.add(item)
    })
    this.emitChange(set)
    this.setState({ selection: set })
  }

  deselectAll() {
    this.emitChange(new Set())
    this.setState({ selection: new Set() })
  }

  toggleSelectAll = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation()
    this.state.selection.size > 0 ? this.deselectAll() : this.selectAll()
  }

  get selected() {
    return Array.from(this.state.selection)
  }

  getProps() {
    return {
      deselect: this.deselect.bind(this),
      deselectAll: this.deselectAll.bind(this),
      isSelected: this.isSelected.bind(this),
      select: this.select.bind(this),
      selectAll: this.selectAll.bind(this),
      selected: this.selected,
      toggleSelect: this.toggleSelect,
      toggleSelectAll: this.toggleSelectAll,
    }
  }

  render() {
    const { children, ...rest} = this.props
    return (
      <div>
        {children ? children({...rest, ...this.getProps()}) : null}
      </div>
    )
  }
}
