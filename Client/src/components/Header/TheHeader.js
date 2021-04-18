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
                <Navbar.Brand href="#home" style={{color:"orange"}}>AppGrossing</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" animation="false"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Container  fluid>
                    <Col md={2}></Col>
                    <Col  md={4}>
                        {isLogin && <NavLink to="/filter" className='normal'>Filter</NavLink>}
                        {isLogin && <NavLink exact to="/statistics" className='normal' style={{marginLeft: 20}}>Statistics</NavLink>}
                        {isLogin && <NavLink exact to={'/documentation'} className='normal' style={{marginLeft: 20}}>Documentation</NavLink>}
                    </Col>

                    <Col md={3} style={{textAlign:"right"}}>
                        {!isLogin && <Button onClick={this.registerHandler} variant="warning">Sign up</Button>}
                        {!isLogin && <Button onClick={this.loginHandler} variant="warning" style={{marginLeft: 20}} >Login</Button>}
                    </Col>
                    <Col md="auto"> 
                        {isLogin && 
                                <Dropdown>
                                    <Dropdown.Toggle variant="warning" id="dropdown-basic" >
                                        {this.state.username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu> 
                                        <Dropdown.Item onClick={this.disconnectHandler} href="#Disconnection">Disconnect</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                        }
                    </Col>   
                </Container>
                </Navbar.Collapse>
            </Navbar>
        )
    }
    
}



export default withRouter(TheHeader)

/*

                <Nav className="mr-auto">
                    <Container style={{border:"dotted"}}>
                        <Row>
                            <Col>
                                {isLogin && <NavLink to="/filter" className='normal'>Filter</NavLink>}
                            </Col>
                            <Col>
                                {isLogin && <NavLink exact to="/statistics" className='normal'>Statistics</NavLink>}
                                </Col>
                                <Col>
                                    {isLogin && <NavLink exact to={'/documentation'} className='normal'>Documentation</NavLink>}
                                </Col>
                            </Row>
                        </Container>
                    </Nav>
                                    <Form inline >
                            {!isLogin && <Button onClick={this.registerHandler} variant="warning" style={{position:'absolute',right:'100px'}}>Sign up</Button>}
                            {!isLogin && <Button onClick={this.loginHandler} variant="warning" >Login</Button>}
                            {isLogin && 
                                <Dropdown  style={{textAlign:'center'}}>
                                    <Dropdown.Toggle variant="warning" id="dropdown-basic" >
                                        {this.state.username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu> 
                                        <Dropdown.Item onClick={this.disconnectHandler} href="#Disconnection">Disconnect</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                    </Form>
*/
