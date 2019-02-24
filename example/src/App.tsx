import { Typography } from "@material-ui/core"
import React, { Component } from "react"

import "./App.css"
import { BaseExample } from "./components/base"

class App extends Component {

  state = {
    test: 1
  }

  data = {
    initSelect: ["id", "name"],
    items: [
      {key: "id", value: "ID"},
      {key: "name", value: "Name"},
      {key: "title", value: "Title"},
    ],
    id: (item: any) => item.key
  }

  handleChange = () => {
    this.setState((prev: any)=> {
      return {
        test: prev.test += 1
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Typography variant="h4">Basic Example</Typography>
        <BaseExample data={this.data} />
      </div>
    )
  }
}

export default App
