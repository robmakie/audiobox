import React, { useState } from "react"
import { ConfigHelper } from "@oceanprotocol/lib"
import { OceanProvider, useOcean } from "@oceanprotocol/react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { NetworkMonitor } from "./components/NetworkMonitor"
import Header from "./components/Header"
import Collection from "./components/Collection"
import MusicDetails from "./components/MusicDetails"
import Register from "./components/Register"
import "./App.css"

const configRinkeby = new ConfigHelper().getConfig(
  process.env.REACT_APP_NETWORK
)

const providerOptions = {}

export const web3ModalOpts = {
  cacheProvider: true,
  providerOptions
}

function App() {
  const [config, setConfig] = useState(configRinkeby)

  return (
    <OceanProvider initialConfig={configRinkeby} web3ModalOpts={web3ModalOpts}>
      <NetworkMonitor setConfig={setConfig} />
      <Router>
        <Switch>
          <div className="App">
            <Header config={config} />
            <div className="divider"></div>
            <Route
              path="/asset/:did"
              component={() => <MusicDetails config={config} />}
            />
            <Route
              path="/account"
              exact
              component={() => <Collection config={config} myAssets={true} />}
            />
            <Route
              path="/register"
              component={() => <Register config={config} />}
            />
            <Route
              path="/assets/:term"
              exact
              component={() => <Collection config={config} myAssets={false} />}
            />
            <Route path="/" exact>
              <Redirect to="/assets/home" />
            </Route>
          </div>
        </Switch>
      </Router>
    </OceanProvider>
  )
}

export default App
