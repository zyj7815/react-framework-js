import React from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'

export const RouterWithSubRoutes = (route, index, authed, authPath) => {
    return (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={props => {
                if (!route.auth || authed || route.path === authPath) {
                    // 向下传递子路由，保持嵌套
                    return <route.component {...props} routes={route.routes} />
                }
                // 自定义重定向路由
                return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
            }}
        />
    )
}
