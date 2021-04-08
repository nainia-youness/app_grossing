import React, { Component } from 'react'
import {Row, Col,Form} from "react-bootstrap";
import '../../css/Filter.css'



let choice='both'

class Adds extends Component {

    constructor(props) {
        super(props)
        this.state = {
             addChoice:choice
        }
        this.changeAddChoice=this.changeAddChoice.bind(this)

    }
    changeAddChoice(event) {
      
        this.setState({
            addChoice: event.target.value
          });
          
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.addChoice !== this.state.addChoice) {
        this.props.data.ChangeAddChoice(this.state.addChoice)
      }
    }
    


    render() {
        
            if(this.state.addChoice!==choice)
            {
                choice=this.state.addChoice             
            }
        
        return (
            <div style={{marginLeft:"8px"}}>
            <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
              </Form.Label>
              <Col></Col>
              <Col sm={10}>
                <Form.Check className="filters"
                  value="yes"
                  type="radio"
                  checked={this.state.addChoice==='yes'}
                  label="Yes"
                  name="yes"
                  id="yes"
                  onChange={this.changeAddChoice}
                  custom
                />
                <Form.Check className="filters"
                  value="no"
                  type="radio"
                  checked={this.state.addChoice==='no'}
                  label="No"
                  name="no"
                  id="no"
                  onChange={this.changeAddChoice}
                  custom
                />
                <Form.Check className="filters" 
                  value="both"
                  type="radio"
                  checked={this.state.addChoice==='both'}
                  label="Both"
                  name="both"
                  id="both"
                  onChange={this.changeAddChoice}
                  custom
                />
              </Col>
            </Form.Group>
          </fieldset></div>
        )
    }
}

export default Adds
