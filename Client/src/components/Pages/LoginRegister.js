import React from "react";
import "../../css/loginRegister.scss";
import Login from "../LoginRegister/login";
import Register from "../LoginRegister/register";
import TheHeader from '../Header/TheHeader'
import {Link} from 'react-router-dom'
import {reactLocalStorage} from 'reactjs-localstorage';


//npm install node-sass
class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      loginError:'',
      registerUsername:"",
      registerPassword:"",
      registerEmail:"",
      registerError:'',
      isLogin:true,


      isLogginActive: true
    };
  }



  changeEmail(item)
  {
      this.setState({
          email:item
      })
  }

  changePassword(item)
  {
      this.setState({
          password:item
      })
  }

  
  changeRegisterUsername(item)
  {
      this.setState({
          registerUsername:item
      })
  }

  changeRegisterPassword(item)
  {
      this.setState({
          registerPassword:item
      })
  }

  changeRegisterEmail(item)
  {
      this.setState({
          registerEmail:item
      })
  }

  changeLoginError(item)
  {
      this.setState({
          loginError:item
      })
  }

  changeRegisterError(item)
  {
      this.setState({
          registerError:item
      })
  }

  componentDidMount() {
    this.rightSide.classList.add("right");
    this.setState({
      isLogginActive:this.props.is_Login
    })
  }


  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive} = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return (
      <React.Fragment>
      <TheHeader loginRegister={true} ></TheHeader>
      <div className="Login"  style={{marginTop:'80px'}}>
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            
            {isLogginActive && (
              <Login containerRef={ref => (this.current = ref)} data={
                {err:this.state.loginError,ChangeLoginError:this.changeLoginError.bind(this),user:this.state.email,ChangeEmail:this.changeEmail.bind(this),pwd:this.state.password,ChangePassword:this.changePassword.bind(this)}}/>
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)} data={
                {err:this.state.registerError,ChangeRegisterError:this.changeRegisterError.bind(this),ruser:this.state.registerUsername,ChangeRegisterUsername:this.changeRegisterUsername.bind(this),rpwd:this.state.registerPassword,ChangeRegisterPassword:this.changeRegisterPassword.bind(this),remail:this.state.registerEmail,ChangeRegisterEmail:this.changeRegisterEmail.bind(this)}}/>
            )}
          </div>
          <Link to={"/"+current.toLowerCase()} style={{marginTop:'-600px'}} >
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}>          
          </RightSide>
          </Link>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default LoginRegister;
