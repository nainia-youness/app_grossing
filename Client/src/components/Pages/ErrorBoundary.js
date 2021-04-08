import React, { Component } from 'react'
import {Redirect,BrowserRouter} from 'react-router-dom'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             hasError:false
             
        }
    }
    

    static getDerivedStateFromError(error){
        return{
            hasError:true
        }
    }

    componentDidCatch(error,info){
        console.log(error)
        console.log(info)
        window.location.reload(false);
    }

    render() {
        if(this.state.hasError){
            return(
                /*<BrowserRouter>
                    <Redirect to='/PageNotFound'/>
                </BrowserRouter>*/
                console.log('error boundary')
            )
        }
        else{
            return this.props.children
        }
    }
}

export default ErrorBoundary
