import React from 'react';
import { useSelector } from "react-redux";
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Property from "./views/Property";
import Residential from "./views/Residential";
import Employment from "./views/Employment";
import Summary from "./views/Summary";
import NavigationControls from "./components/NavigationControls";
import {ROUTER_DATA} from "./views/constants";

import './App.css';

function App() {
  const appFlowStopped = useSelector((state) => state.currentForm.stopFlowError);
  const oso = useSelector((state) => state);


  console.log(oso);


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Scotiabank Test</h1>
        </header>
      </div>

      <main className="main">
          <div className="content">
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to={ROUTER_DATA.residential.pathname}/>
            )}/>
            <Route path={ROUTER_DATA.residential.pathname} component={Residential}></Route>
            <Route path={ROUTER_DATA.property.pathname} component={Property}></Route>
            <Route path={ROUTER_DATA.employment.pathname} component={Employment}></Route>
            <Route path={ROUTER_DATA.summary.pathname} component={Summary}></Route>
          </Switch>
    
          <NavigationControls views={Object.values(ROUTER_DATA)} navDisabled={appFlowStopped}/>

          {appFlowStopped &&
            <h4>The app flow is stopped : {appFlowStopped}</h4>
          }
          </div>
        </main>
    </BrowserRouter>
  );
}

export default App;
