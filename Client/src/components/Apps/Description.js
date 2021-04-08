import React, { Component } from 'react'
import {Container,Row, Col} from "react-bootstrap";
import '../../css/apps.css'

class Description extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             description:this.props.description,
             descriptionPlus:'',
             showPlus:false, 
             showMinus:false,
        }
    }

    
    hideComponent(name) {
        switch (name) {
          case "showPlus":
            this.setState({ showPlus: !this.state.showPlus });
            break;
          case "showMinus":
            this.setState({ showMinus: !this.state.showMinus });
            break;
          default:
            return null
            
        }
    }

    componentDidMount(){
        if(this.state.description.length>381)
        {
            this.setState({
                showPlus:true
            })
            const d1=this.state.description.slice(0, 381)
            const d2=this.state.description.slice(381,this.state.description.lenght)
            this.setState({
                description:d1+'...',
                descriptionPlus:d2,
            })

        }
    }
    addDescriptionPlus=()=>{
        this.setState({
            description:this.state.description.slice(0,381)+this.state.descriptionPlus,
            showPlus:false,
            showMinus:true
        })
    }

    addDescriptionMinus=()=>{
        this.setState({
            description:this.state.description.slice(0, 381)+'...',
            showPlus:true,
            showMinus:false
        })
    }
    

    render() {
        const { showPlus,showMinus } = this.state;
        return (
            <>
            <Container>
                <Row>
                    <Col style={{textAlign:'left',color:'grey'}}>
                        Description
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign:'left'}}>
                        {this.state.description}
                    </Col>
                </Row>
                <Row>
                    <Col style={{textAlign:'left'}}>
                        {showPlus && <span className='showHide' onClick={this.addDescriptionPlus}>Show full description</span>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {showMinus && <span className='showHide' onClick={this.addDescriptionMinus}>Hide full description</span>}
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

export default Description
