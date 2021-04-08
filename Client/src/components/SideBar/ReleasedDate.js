import React, { Component } from 'react'
import {Row, Col,Form} from "react-bootstrap";
import '../../css/Filter.css'



let choice='any'

class ReleasedDate extends Component {

    constructor(props) {
        super(props)
        this.state = {
             releasedDateChoice:choice
        }
        this.changeReleasedDateChoice=this.changeReleasedDateChoice.bind(this)

    }
    changeReleasedDateChoice(event) {
      
        this.setState({
            releasedDateChoice: event.target.value
          });
          
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.releasedDateChoice !== this.state.releasedDateChoice) {
        this.props.data.ChangeReleasedDateChoice(this.state.releasedDateChoice)
      }
    }
    


    render() {

            if(this.state.releasedDateChoice!==choice)
            {
                choice=this.state.releasedDateChoice             
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
                  value="any"
                  type="radio"
                  checked={this.state.releasedDateChoice==='any'}
                  label="Any"
                  name="any"
                  id="any"
                  onChange={this.changeReleasedDateChoice}
                  custom
                />
                <Form.Check className="filters"
                  value="lastDay"
                  type="radio"
                  checked={this.state.releasedDateChoice==='lastDay'}
                  label="Last day"
                  name="lastDay"
                  id="lastDay"
                  onChange={this.changeReleasedDateChoice}
                  custom
                />
                <Form.Check className="filters"
                  value="lastWeek"
                  type="radio"
                  checked={this.state.releasedDateChoice==='lastWeek'}
                  label="Last Week"
                  name="lastWeek"
                  id="lastWeek"
                  onChange={this.changeReleasedDateChoice}
                  custom
                />
                <Form.Check className="filters" 
                  value="lastMonth"
                  type="radio"
                  checked={this.state.releasedDateChoice==='lastMonth'}
                  label="Last month"
                  name="lastMonth"
                  id="lastMonth"
                  onChange={this.changeReleasedDateChoice}
                  custom
                />
              </Col>
            </Form.Group>
          </fieldset></div>
        )
    }
}

export default ReleasedDate
