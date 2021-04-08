import React, { Component } from 'react'
import {Container,Row, Col} from "react-bootstrap";

class ChangeLogItem extends Component {

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col sm={3} style={{color:'orange',fontSize:'16px'}}>
                            {this.props.version}
                        </Col>
                        <Col sm={3} >
                            {this.props.date}
                        </Col>
                        <Col sm={6} style={{color:'grey'}}>
                            {this.props.text}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default ChangeLogItem
