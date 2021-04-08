import React from "react";
import "./../../css/style.scss"
import Button from 'react-bootstrap/Button'
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios'
import   {withRouter} from 'react-router-dom'



export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      loginError:'',
      path:'/login',
    }
    this.changeEmail=this.changeEmail.bind(this)
    this.changePassword=this.changePassword.bind(this)
    this.loginHandler=this.loginHandler.bind(this)
  }

  changeEmail(e) {
    e.preventDefault();

    this.setState({
        email: e.target.value
    });
  }

  changePassword(e) {
    e.preventDefault();

    this.setState({
        password: e.target.value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componenetDidUpdate')
    if (prevState.email !== this.state.email) {
      this.props.data.ChangeEmail(this.state.email)
    }
    if (prevState.password !== this.state.password) {
      this.props.data.ChangePassword(this.state.password)
    }
    if (prevState.loginError !== this.state.loginError) {
      this.props.data.ChangeLoginError(this.state.loginError)
    }
  }

  componentDidMount(){
    console.log(window.history)
  }

  loginHandler(e) {
      console.log('login pressed')
      e.preventDefault();
      var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      // at least one number, one lowercase and one uppercase letter
      // at least six characters
      var passw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      if(this.state.email==='' || this.state.password==='')
      this.setState({
        loginError:'fill in all the informations'
      })
      else if(reg.test(this.state.email) === false)
      {
        this.setState({
          loginError:'enter a valid email'
        })
      }
      else if(!this.state.password.match(passw)) 
        { 
          this.setState({
            loginError:'enter valid password (at least one number, one lowercase and one uppercase letter and at least eight characters)'
          })         
        }

      else{
          this.setState({
            loginError:''
          })
            axios.post('/login',{email:this.state.email,password:this.state.password})
            .then(res=>{
                console.log(res)
                //alert(res.data.token)
                reactLocalStorage.setObject('user', {'expiredTime':res.data.expiredIn,'token':res.data.token,'username':res.data.username ,'isLogin':true});
                if( this.props.match !== '/statistics')
                  this.props.history.push('/statistics',{ Top: 'Top New Free',page: '1',country: 'Morocco',category: 'All Apps' })
              })
            .catch(error=>{
              if(error.response!==undefined){
                  if(error.response.status === 401 )
                        this.setState({
                          loginError:error.response.data.message
                        })
                  else if(error.reponse.status === 422)
                        this.setState({
                          loginError:error.response.data.msg
                        })
                  console.log('this is login page error')
                  console.log(error)
              }
            })
        }

      }

  render() {
    return (
      <>
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            {/*<img src={loginImg} />*/}
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input type="text" name="email" placeholder="email" onChange={this.changeEmail} value={this.state.email}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.changePassword} value={this.state.password}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <p style={{color:'red'}}>{this.state.loginError}</p>
          <Button onClick={this.loginHandler} variant="warning" type="button" style={{fontSize: '21px',  padding: '5px 20px',border: '0',color: '#fff'}}>
            Login
          </Button>
        </div>
      </div></>
    );
  }
}
export default withRouter(Login)