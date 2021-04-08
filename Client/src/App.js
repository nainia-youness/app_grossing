import React from 'react';
import Filter from './components/Pages/Filter.js'
import Statistics from './components/Pages/Statistics'
import LoginRegister from './components/Pages/LoginRegister'
import Developer from './components/Pages/Developer'
import   {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import Apps from './components/Pages/Apps'
import ErrorBoundary from './components/Pages/ErrorBoundary'
import NotFoundPage from './components/Pages/NotFoundPage'
import PrivateRoute from './components/Auth/PrivateRoute'
import PublicRoute from './components/Auth/PublicRoute'
import {reactLocalStorage} from 'reactjs-localstorage';

function App() {

  return (
    <div className="App">
      <ErrorBoundary>
          <BrowserRouter>
              <Switch>
                  <PublicRoute  path='/login'  isLogin={true}  component={LoginRegister}  />
                  <PublicRoute  path='/register'  isLogin={false} component={LoginRegister}/>
                  <Route path='/statistics' component={Statistics} exact/>
                    <Route path='/statistics/:Plus' component={NotFoundPage}/>
                  <Route  path='/filter' component={Filter} />
                    <Route path='/filter/:Plus' component={NotFoundPage}/>
                  <PrivateRoute  path='/apps/:title' component={Apps} />
                  <PrivateRoute path='/developer/:devName' component={Developer} />
                  <Route component={NotFoundPage}/>
              </Switch>
          </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
