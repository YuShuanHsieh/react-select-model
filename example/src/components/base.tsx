import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core"
import React, { Component } from "react"
import { SelectionModel } from "react-select-model"

export class BaseExample extends Component {
  initSelect = ["id", "name"]
  items = [
    {key: "id", value: "ID"},
    {key: "name", value: "Name"},
    {key: "title", value: "Title"},
  ]

  state = {
    selected: [],
  }

  id = (item: any) => item.key


  handleChange = (items: any[]) => {
    this.setState({
      selected: items,
    })
  }

  render() {
    return (
      <React.Fragment>
        <SelectionModel
          initSelect={this.initSelect}
          items={this.items}
          id={this.id}
          onChange={this.handleChange}
        >
        {(props: any) => {
          return (
            <List>
              <ListItem>
                Select All Items
                <ListItemSecondaryAction>
                  <Checkbox
                    checked={props.selected.length === this.items.length}
                    onChange={props.toggleSelectAll}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              {
                this.items.map((item) => (
                  <ListItem key={item.key}>
                    {item.value}
                    <ListItemSecondaryAction>
                      <Checkbox
                        checked={props.isSelected(item)}
                        onChange={props.toggleSelect(item)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          )
        }}
        </SelectionModel>
        <List>
          <Divider />
          <ListItem>
            {this.state.selected.length} item(s) selected
          </ListItem>
        </List>
      </React.Fragment>
    )
  }
}
