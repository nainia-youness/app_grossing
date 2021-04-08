import React from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import {reactLocalStorage} from 'reactjs-localstorage';
import LoginRegister from '../Pages/LoginRegister'
import NotFoundPage from '../Pages/NotFoundPage'

const PublicRoute =({isLogin:IsLogin,path:Path,...rest})=>(
        <Switch>
            <Route path={Path+'/:Plus'} component={NotFoundPage}/>
            <Route {...rest} component={(props)=>(
                !reactLocalStorage.getObject('user').isLogin ?(
                    <LoginRegister is_Login={IsLogin}/>
                ): (
                    <Redirect to='/statistics'></Redirect>
                )
            )}/>
        </Switch>
)

export default PublicRoute