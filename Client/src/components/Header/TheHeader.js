import React,{Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import {NavLink} from 'react-router-dom'
import '../../css/header.css'
import {reactLocalStorage} from 'reactjs-localstorage';
import   {withRouter} from 'react-router-dom'
import {Container,Row,Col} from 'react-bootstrap'

class TheHeader extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             isLogin:reactLocalStorage.getObject('user').isLogin,
             username:reactLocalStorage.getObject('user').username,
             wrapper : React.createRef(),
             

        }
        this.disconnectHandler=this.disconnectHandler.bind(this)
        this.loginHandler=this.loginHandler.bind(this)
        this.registerHandler=this.registerHandler.bind(this)
    }

    componentDidMount(){
        //reactLocalStorage.setObject('var', {'email':'',isLogin:false})
        if(reactLocalStorage.getObject('user').isLogin===true)
            this.setState({
                isLogin:true
            })
        if(reactLocalStorage.getObject('user').email!=='')
            this.setState({
                email:reactLocalStorage.getObject('user').email
            })
    }

    hideComponent(name) {
        switch (name) {
          case "isLogin":
            this.setState({ isLogin: !this.state.isLogin });
            break;
          default:
              return null
        }
      }

    disconnectHandler(e) {
        e.preventDefault();
        localStorage.clear();
        this.props.history.push('/login');
    }

    loginHandler(e){
        e.preventDefault();
        let isPathLogin=false
        if(window.location.pathname==='/login')
            isPathLogin=true
        this.props.history.push('/login');
        if(isPathLogin===false)
            window.location.reload(false)
    }
    registerHandler(e){
        e.preventDefault();
        let isPathRegister=false
        if(window.location.pathname==='/register')
            isPathRegister=true
        this.props.history.push('/register');
        if(isPathRegister===false)
            window.location.reload(false)
    }
     
    componentDidUpdate(PrevState,PrevProps){
        if(this.state.navExpanded!==PrevState.navExpanded)
            console.log(this.state.navExpanded)
    }


    render(){
    
        const {isLogin}=this.state
        return (
            <Navbar bg="light" expand="md" fixed="top" animation="false">
<Navbar.Brand href="#home" style={{color:"orange"}}>AppGrossing&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" animation="false"/>
  <Navbar.Collapse id="basic-navbar-nav" >
    <Nav className="mr-auto">
        <Container >
            <Row>
                <Col>
                    {isLogin && <NavLink to="/filter" className='normal'>Filter</NavLink>}
                </Col>
                <Col>
                    {isLogin && <NavLink exact to="/statistics" className='normal'>Statistics</NavLink>/*<a className='apps' onClick={titleHandler}></a>*/}
                </Col>
                <Col>
                    {isLogin && <NavLink exact to={'/documentation'} className='normal'>Documentation</NavLink>}
                </Col>
            </Row>
        </Container>
    </Nav>
   <Form inline >
   {!isLogin && <Button  onClick={this.registerHandler} variant="warning" style={{position:'absolute',right:'100px'}}>Sign up</Button>}
             {!isLogin && <Button onClick={this.loginHandler} variant="warning" >Login</Button>}
             {isLogin && <Dropdown  style={{textAlign:'center'}}>
                 <Dropdown.Toggle variant="warning" id="dropdown-basic" >
                     {this.state.username}
                 </Dropdown.Toggle>

                 <Dropdown.Menu> 
                     <Dropdown.Item onClick={this.disconnectHandler} href="#Disconnection">Disconnect</Dropdown.Item>
                 </Dropdown.Menu>
             </Dropdown>
             }
    </Form>
 
  </Navbar.Collapse>
</Navbar>

        )
    }
    
}



export default withRouter(TheHeader)
