import React, { Component } from 'react'
import {Row, Col,Form} from "react-bootstrap";
import '../../css/Filter.css'



let choice='published'

class Published extends Component {

    constructor(props) {
        super(props)
        this.state = {
             publishedChoice:choice
        }
        this.changePublishedChoice=this.changePublishedChoice.bind(this)

    }
    changePublishedChoice(event) {
      
        this.setState({
            publishedChoice: event.target.value
          });
          
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.publishedChoice !== this.state.publishedChoice) {
        this.props.data.ChangePublishedChoice(this.state.publishedChoice)
      }
    }
    


    render() {

            if(this.state.publishedChoice!==choice)
                choice=this.state.publishedChoice             

        return (
            <div style={{marginLeft:"8px"}}>
            <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
              </Form.Label>
              <Col ></Col>
              <Col sm={10}>
                <Form.Check className='filters'
                  value="published"
                  type="radio"
                  checked={this.state.publishedChoice==='published'}
                  label="Published"
                  name="published"
                  id="published"
                  onChange={this.changePublishedChoice}
                  custom
                />
                <Form.Check className='filters'
                  value="unpublished"
                  type="radio"
                  checked={this.state.publishedChoice==='unpublished'}
                  label="Unpublished"
                  name="unpublished"
                  id="unpublished"
                  onChange={this.changePublishedChoice}
                  custom
                />
                <Form.Check className='filters'
                  value="publishedAndUnpublished"
                  type="radio"
                  checked={this.state.publishedChoice==='publishedAndUnpublished'}
                  label="published And Unpublished"
                  name="publishedAndUnpublished"
                  id="publishedAndUnpublished"
                  onChange={this.changePublishedChoice}
                  custom
                />
              </Col>
            </Form.Group>
          </fieldset></div>
        )
    }
}

export default Published
