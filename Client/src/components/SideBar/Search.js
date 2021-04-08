import React, { Component } from 'react'
import {Row, Col,Form} from "react-bootstrap";
import '../../css/Filter.css'



let choice='title'

export class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
             searchChoice:choice
        }
        this.changeSearchChoice=this.changeSearchChoice.bind(this)

    }
    changeSearchChoice(event) {
      
        this.setState({
            searchChoice: event.target.value
          });
          
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.searchChoice !== this.state.searchChoice) {
        this.props.data.ChangeSearchChoice(this.state.searchChoice)
      }
    }
    


    render() {

            if(this.state.searchChoice!==choice)
            {
                choice=this.state.searchChoice             
            }

        return (
            <div style={{marginLeft:"8px"}}>
            <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
              </Form.Label>
              <Col sm={10} style={{color:"grey", marginLeft:"4px"}}>
                  search in
              </Col>
              <Col></Col>
              <Col sm={10}>
                <Form.Check className='filters'
                  value="title"
                  type="radio"
                  checked={this.state.searchChoice==='title'}
                  label="Title"
                  name="title"
                  id="title"
                  onChange={this.changeSearchChoice}
                  custom
                />

                <Form.Check className='filters'
                  value="devName"
                  type="radio"
                  checked={this.state.searchChoice==='devName'}
                  label="Developer Name"
                  name="devName"
                  id="devName"
                  onChange={this.changeSearchChoice}
                  custom
                />
                  
              </Col>
            </Form.Group>
          </fieldset></div>
        )
    }
}

export default Search