import React, { Component } from 'react'
import TheHeader from '../Header/TheHeader'
import {Container,Row,Col} from 'react-bootstrap'

class NotFoundPage extends Component {
    render() {
        return (
            <>
                <TheHeader></TheHeader>
                <Container>
                    <Row >
                         <Col style={{height:'120px'}}></Col>
                    </Row>
                    <Row>
                        <Col style={{fontSize:"90px",color:'orange',textAlign:'center'}}>
                            404
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{fontSize:"50px",color:'grey',textAlign:'center'}}>
                            OUPS !! 
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{color:'grey',textAlign:'center'}}>
                            Page not found
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{color:'grey',textAlign:'center'}}>
                            We couldn't find what you were looking for.
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default NotFoundPage
