import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import {Col} from "react-bootstrap";

class RelatedAppItem extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             title:this.props.title
        }
    }
    

    componentDidMount(){
        if(this.state.title.length>20)
            this.setState({
                title:this.state.title.slice(0,20)+'..'
            })
    }
    render() {
        console.log(this.props.title.slice(0,20))
        return (
            <>
                <Col>
                    <Card border="warning" style={{width: '9rem',height:'13.5rem' }}>
                            <Card.Body>
                            <Card.Title  style={{fontSize:'13px'}}><img src={this.props.image} alt={'Related App'+this.props.index}></img></Card.Title>
                            <Card.Text >
                                <a href='#app' style={{fontSize:'12px',textAlign:'left',color:'#e85106'}}>{this.state.title}</a>
                            </Card.Text>
                            <Card.Text style={{fontSize:'14px',textAlign:'center',color:'#e85106'}}>
                                free
                            </Card.Text>
                            </Card.Body>
                    </Card>   
                </Col>             
            </>
        )
    }
}

export default RelatedAppItem
