import React from 'react'
import { render } from 'react-dom'
import Router from './Router'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

render(<Router />, document.getElementById('root'))

serviceWorkerRegistration.register();
