import { ConfigHelper } from "@oceanprotocol/lib";
import { OceanProvider, useOcean } from "@oceanprotocol/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NetworkMonitor from './components/NetworkMonitor'
import Header from './components/Header'
import Collection from "./components/Collection"
import MusicDetails from "./components/MusicDetails"
import './App.css';

const configRinkeby = new ConfigHelper().getConfig(process.env.REACT_APP_NETWORK);


const providerOptions = {};

export const web3ModalOpts = {
  cacheProvider: true,
  providerOptions
};

function App() {
  return (
    <OceanProvider initialConfig={configRinkeby} web3ModalOpts={web3ModalOpts}>
      <NetworkMonitor />
      <Router>
        <div className="App">
          <Header />
          <div className="divider"></div>
          <Switch>
            <Route path="/asset/:did" component={MusicDetails} />
            <Route path="/" component={Collection} />
          </Switch>
        </div>
      </Router>
    </OceanProvider>
  );
}

export default App;
