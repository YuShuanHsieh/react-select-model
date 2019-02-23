import { Typography } from "@material-ui/core"
import React, { Component } from "react"

import "./App.css"
import { BaseExample } from "./components/base"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Typography variant="h4">Basic Example</Typography>
        <BaseExample />
      </div>
    )
  }
}

export default App
