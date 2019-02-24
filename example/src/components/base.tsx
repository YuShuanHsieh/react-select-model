import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core"
import React from "react"
import { useSelectionModel } from "../libs"

export function BaseExample(props: any) {
  const { data } = props
  // To prevent re-render, data object should be update if necessary
  const [selected, actions] = useSelectionModel(data)

  return (
    <List>
      <ListItem>
        Select All Items
        <ListItemSecondaryAction>
          <Checkbox
            checked={selected.length === data.items.length}
            onChange={() => actions.toggleAll()}
          />
        </ListItemSecondaryAction>
      </ListItem>
      {
        data.items.map((item: any) => (
          <ListItem key={item.key}>
            {item.value}
            <ListItemSecondaryAction>
              <Checkbox
                checked={actions.isSelected(item)}
                onChange={() => actions.toggle(item)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      }
      <Divider />
      <ListItem>
        {selected.length} item(s) selected
      </ListItem>
    </List>
  )
}