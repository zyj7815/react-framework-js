import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RenderRoutes } from './router/renderRoutes'
import { routes } from './router'
import { Awesome } from 'awesome-kit'

const authed = false
const authPath = '/login'


class App extends React.Component {

    componentDidMount() {
        console.log(Awesome.Browser.currentURL)
    }

    render() {
        return (
            <Router>
                {RenderRoutes(routes, authed, authPath)}
            </Router>
        )
    }
}

export default App
