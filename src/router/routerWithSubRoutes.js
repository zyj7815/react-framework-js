import React from 'react'
import {Route, Redirect, RouteComponentProps} from 'react-router-dom'



/**
 * 子路由中间件操作
 * @param route
 * @param index
 * @param authed
 * @param authPath
 * RouteInterface {
    path: string
    component: any
    routes?: RouteInterface[]
    exact?: boolean
    title?: string
    name?: string
    auth?: boolean  // 权限判断
 }
 */
export const RouterWithSubRoutes = (route, index, authed, authPath) => {

    return (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => {
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
