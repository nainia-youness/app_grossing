import React from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import {reactLocalStorage} from 'reactjs-localstorage';
import NotFoundPage from '../Pages/NotFoundPage'


const PrivateRoute =({component:Component,path:Path})=>(

    <Switch>
        <Route path={Path+'/:Plus'} component={NotFoundPage}/>
        <Route path={Path} component={(props)=>(
            reactLocalStorage.getObject('user').isLogin ?(
                <Component {...props}/>
            ): (
                <Redirect to='/login'></Redirect>
            )
        )}/>
    </Switch>

)

export default PrivateRoute
