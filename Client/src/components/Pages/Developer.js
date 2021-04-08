import React, { Component } from 'react'
import TheHeader from '../Header/TheHeader'
import {Container,Row, Col} from "react-bootstrap";
import   {withRouter} from 'react-router-dom'
import Rows from '../SideBar/Rows'
import Alert from 'react-bootstrap/Alert'
import ClipLoader from "react-spinners/ClipLoader";
//import DevInformation from '../Apps/DevInformation'
import axios from 'axios'
import {reactLocalStorage} from 'reactjs-localstorage';
import Auth from '../Auth/Auth'

class Developer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             appNumber:'',
             downloads:2000,
             ratingCount:'',
             loading: true,
             avrRating:'',
             devInfo:['fallgroundantbeat','fallgroundantbeat@yahoo.com'],
             rows:[]
        }
    }
    
    componentDidMount(){

        Auth(reactLocalStorage.getObject('user').token)
        axios.get(`/developer/${this.props.match.params.devName}`)
        .then(res=>{      
            if(res.data.Apps[0]===undefined)
                this.props.history.push('/PageNotFound')
            console.log(res)
            console.log(res.data.Apps[0])
            this.setState({
                rows:res.data.Apps,
                appNumber:res.data.AppNumber,
                ratingCount:res.data.RatingCount,
                avrRating:res.data.avrRating,
            })
        })
        .catch(err=>{
            console.log(err)
            if(err.response!==undefined){
                if(err.response.status === 401)
                {
                    if(err.response.data.message==='No valid token provided or expired')
                    {
                        console.log('no token')
                        localStorage.clear()
                        this.props.history.push('/login')
                    }
                }
                else
                {
                    this.props.history.push('/PageNotFound')
                }
            }
        })
        .finally(()=>{
            this.setState({
                loading:false
            }) // stop spinner (in response/error)

        })
    }

    render() {
        const { match: { params } } = this.props;
        return (
            <>
                <TheHeader></TheHeader>
                <Container >
                    <Row>
                        <Col style={{height:'80px'}}>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{color:'grey',textAlign:'left'}}>
                            Developer
                        </Col>
                    </Row>
                    <Row>
                            <Col >
                                <span style={{color:'orange',textAlign:'left',fontSize:'40px'}}>{params.devName}</span>
                            </Col>
                    </Row>
                    <Row>
                        <Col style={{height:'15px'}}></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Container>
                                <Row>
                                    <Col>
                                        <Alert style={{textAlign:'center'}} variant='warning'><span style={{color:'#cc6600'}}>App number: </span><br/><span style={{color:'grey'}}> {this.state.appNumber}</span></Alert>
                                    </Col>
                                    <Col>
                                        <Alert style={{textAlign:'center'}} variant='warning'><span style={{color:'#cc6600'}}>Rating Count: </span><br/><span style={{color:'grey'}}> {this.state.ratingCount}</span></Alert>
                                    </Col>
                                    <Col>
                                        <Alert style={{textAlign:'center'}} variant='warning'><span style={{color:'#cc6600'}}>Avr Rating: </span><br/><span style={{color:'grey'}}> {this.state.avrRating}</span></Alert>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{height:'15px'}}></Col>
                                </Row>
                                <Row>
                                    <Col style={{color:'grey'}}>
                                        Apps
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{height:'15px'}}></Col>
                                </Row>
                                <Row>
                                    <Col  md={{offset: 5 }}>
                                        <ClipLoader textAlign='center'
                                                size={100}
                                                color={"orange"}
                                                loading={this.state.loading}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Rows  showDev={false}  rows={this.state.rows} showOrder={false}></Rows>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{height:'15px'}}></Col>
                                </Row>
                                <Row>
                                    <Col style={{height:'15px'}}></Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    
                </Container>
            </>
        )
    }
}

export default withRouter(Developer)

