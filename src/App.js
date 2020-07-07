import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RenderRoutes } from './router/renderRoutes'
import { routes } from './router'

const authed = false
const authPath = '/login'


class App extends React.Component {

    render() {
        return (
            <Router>
                {RenderRoutes(routes, authed, authPath)}
            </Router>
        )
    }
}

export default App
