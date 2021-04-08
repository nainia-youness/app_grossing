import React, { Component } from 'react'
import {withRouter,Link} from 'react-router-dom'
import '../../css/apps.css'
import {Container,Row, Col} from "react-bootstrap";

class Title extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        let {title}=this.props
        return (
            <React.Fragment>
                
                <Col  xs='auto' >
                        <img src={title.logoApp} className='logoImage' alt="logo" width='130px' height='130px'></img>                   
                    </Col>
                    <Col>
                    <Container>
                        <Row>
                            <Col >
                                <span style={{color:'orange',textAlign:'left',fontSize:'30px'}}>{decodeURIComponent(title.title)}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{color:'grey'}}>
                                {title.subTitle}
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                            <span>by </span><Link to={'/developer/'+title.devName}>{title.devName}</Link>
                            </Col>
                        </Row>
                    </Container>
                    </Col>
            </React.Fragment>
        )
    }
}

export default withRouter(Title)
