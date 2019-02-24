# React-select-model

## Description

A select helper for multiple select items. The helper is builded with react hooks features, so please ensure the react version of your APP is higher than **16.8.0**.

## How to use

```jsx
const [selected, actions] = useSelectionModel(data)

<Checkbox
  checked={actions.isSelected(item)}
  onChange={() => actions.toggle(item)}
/>
```

## actions: SelectionModelActions

#### 1. `isSelected: (item: Item) => boolean`

#### 2. `toggle: (item: Item) => void`

#### 3. `toggleAll: () => void`



