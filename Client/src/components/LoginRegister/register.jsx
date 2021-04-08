import React from "react";
import "./../../css/style.scss";
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerUsername:"",
      registerPassword:"",
      registerEmail:"",
      registerError:'',
      registerSucess:'',
    }
    this.changeRegisterUsername=this.changeRegisterUsername.bind(this)
    this.changeRegisterPassword=this.changeRegisterPassword.bind(this)
    this.changeRegisterEmail=this.changeRegisterEmail.bind(this)
    this.registerHandler=this.registerHandler.bind(this)
  }

  changeRegisterUsername(e) {
    e.preventDefault();

    this.setState({
        registerUsername: e.target.value
    });
  }

  changeRegisterPassword(e) {
    e.preventDefault();

    this.setState({
        registerPassword: e.target.value
    });
  }

  changeRegisterEmail(e) {
    e.preventDefault();

    this.setState({
        registerEmail: e.target.value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.registerUsername !== this.state.registerUsername) {
      this.props.data.ChangeRegisterUsername(this.state.registerUsername)
    }
    if (prevState.registerPassword !== this.state.registerPassword) {
      this.props.data.ChangeRegisterPassword(this.state.registerPassword)
    }
    if (prevState.registerEmail !== this.state.registerEmail) {
      this.props.data.ChangeRegisterEmail(this.state.registerEmail)
    }
    if (prevState.registerError !== this.state.registerError) {
      this.props.data.ChangeRegisterError(this.state.registerError)
    }
  }
  registerHandler(e) {
    e.preventDefault();
    var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var passw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(this.state.registerEmail==='' || this.state.registerPassword==='' || this.state.registerUsername==='')
    this.setState({
      registerError:'fill in all the informations'
    })
    else if(reg.test(this.state.registerEmail) === false)
    {
      this.setState({
        registerError:'enter a valid email'
      })
    }
    else if(!this.state.registerPassword.match(passw)) 
      { 
        this.setState({
          registerError:'enter valid password (at least one number, one lowercase and one uppercase letter and at least eight characters)'
        })         
      }

    else{
        this.setState({
          registerError:''
        })
        axios.post('/register',{email:this.state.registerEmail,password:this.state.registerPassword,username:this.state.registerUsername})
      .then(res=>{
          console.log(res)
          this.setState({
            registerSucess:res.data.message
          })
      })
      .catch(error=>{
          //if(error.reponse.status === 422)
          /*  this.setState({
              registerError:error.response.data[0].msg
            })*/
            //console.log(error.reponse)
            this.setState({
              registerError:error.response.data.error.parent.detail,
              registerSucess:''
            })
          console.log(error)
      })
      }

    }
   


  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            {/*<img src={loginImg} />*/}
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={this.changeRegisterUsername} value={this.state.registerUsername}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={this.changeRegisterEmail} value={this.state.registerEmail}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.changeRegisterPassword} value={this.state.registerPassword}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <p style={{color:'red'}}>{this.state.registerError}</p>
          <p style={{color:'green'}}>{this.state.registerSucess}</p>
          <Button onClick={this.registerHandler} variant="warning" type="button" style={{fontSize: '21px',  padding: '5px 20px',border: '0',color: '#fff'}}>
            Register
          </Button>
        </div>
      </div>
    );
  }
}
export default Register