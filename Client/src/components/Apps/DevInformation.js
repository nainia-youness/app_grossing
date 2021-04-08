import React, { Component } from 'react'
import {Container,Row, Col} from "react-bootstrap";


class DevInformation extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             devInfo:this.props.devInfo
        }
    }
    


    render() {
        return (
            <>
              <Container>
                  <Row>
                      <Col style={{textAlign:'left',color:'grey'}}>
                            Developer Information
                      </Col>
                  </Row>
                    {
                        this.state.devInfo.map((item,index)=>
                            <Row key={index}>
                                <Col style={{textAlign:'left',fontSize:'15px'}}>{item}</Col>
                           </Row>
                            )
                    }
              </Container>
            </>
        )
    }
}

export default DevInformation
