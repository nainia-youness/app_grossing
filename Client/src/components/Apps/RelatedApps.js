import React, { Component } from 'react'
import RelatedAppItem from './RelatedAppItem'
import {Container,Row, Col} from "react-bootstrap";

class RelatedApps extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            relatedAppsData:this.props.relatedAppsData
        }
    }
    

    render() {
        return (
            <>

                <Container fluid>
                    <Row>
                            {
                                this.state.relatedAppsData.map((item,index)=>
                                    <Col xs={6}  md={3} sm={4} lg={2} key={index}>
                                        <RelatedAppItem title={item.title} image={item.image} index={index}></RelatedAppItem>
                                    </Col>   
                                )
                            }
                    </Row>
                </Container>
                
            </>
        )
    }
}

export default RelatedApps
