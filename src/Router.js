import { HashRouter,  Route, Switch } from 'react-router-dom';
import React from 'react'

import App from './pages/App'
import NoMatch from './pages/NoMatch'

export default function IRouter() {
  return <HashRouter>
    <Switch>
      <Route exact path='/' component={App}></Route>
      <Route path='*' component={NoMatch} />
    </Switch>
    </HashRouter>
}