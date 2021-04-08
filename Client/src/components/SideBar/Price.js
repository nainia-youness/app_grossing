import React, { Component } from 'react'
import {Row, Col,Form} from "react-bootstrap";
import '../../css/Filter.css'



let choice='freeAndPaid'

class Price extends Component {

    constructor(props) {
        super(props)
        this.state = {
             priceChoice:choice
        }
        this.changePriceChoice=this.changePriceChoice.bind(this)

    }
    changePriceChoice(event) {
      
        this.setState({
            priceChoice: event.target.value
          });
          
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.priceChoice !== this.state.priceChoice) {
        this.props.data.ChangePriceChoice(this.state.priceChoice)
      }
    }
    


    render() {

            if(this.state.priceChoice!==choice)
            {
                choice=this.state.priceChoice             
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
                  value="freeAndPaid"
                  type="radio"
                  checked={this.state.priceChoice==='freeAndPaid'}
                  label="Free and Paid"
                  name="freeAndPaid"
                  id="freeAndPaid"
                  onChange={this.changePriceChoice}
                  custom
                />
                <Form.Check className="filters"
                  value="free"
                  type="radio"
                  checked={this.state.priceChoice==='free'}
                  label="Free"
                  name="free"
                  id="free"
                  onChange={this.changePriceChoice}
                  custom
                />
                <Form.Check className="filters"
                  value="paid"
                  type="radio"
                  checked={this.state.priceChoice==='paid'}
                  label="Paid"
                  name="paid"
                  id="paid"
                  onChange={this.changePriceChoice}
                  custom
                />
              </Col>
            </Form.Group>
          </fieldset></div>
        )
    }
}

export default Price
