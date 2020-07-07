import React from 'react'
import { Switch } from 'react-router-dom'
import { RouterWithSubRoutes } from './routerWithSubRoutes.js'


export const RenderRoutes = (routes, authed, authPath = '/login') => {
    if (routes) {
        return (
            <Switch>
                {
                    routes.map((route, index) => {
                        return RouterWithSubRoutes(route, index, authed, authPath)
                    })
                }
            </Switch>
        )
    } else {
        return NoMatch
    }
}
