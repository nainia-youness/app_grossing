import React, { Component } from 'react'
import {FormControl, Form,Container,Row, Col} from "react-bootstrap";
import '../../css/Filter.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import "nouislider/distribute/nouislider.css";
import Nouislider from 'react-nouislider';

let uR='5'
let lR='0'
let uNR='100000000'
let lNR='0'
let showA=false
let err=''
let Nerr=''

class Rating extends Component {

    constructor(props) {
        super(props)
        this.state = {
             upperRating:uR,
             lowerRating:lR,
             upperNumberRating:uNR,
             lowerNumberRating:lNR,
             showAdvanced:showA,
             ratingError:err,
             numberRatingError:Nerr
        }
        this.changeLowerRating=this.changeLowerRating.bind(this)
        this.changeUpperRating=this.changeUpperRating.bind(this)
        this.changeUpperNumberRating=this.changeUpperNumberRating.bind(this)
        this.changeLowerNumberRating=this.changeLowerNumberRating.bind(this)
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.upperRating !== this.state.upperRating) {
            this.props.data.ChangeUpperRatingChoice(this.state.upperRating)
          }
        if (prevState.lowerRating !== this.state.lowerRating) {
            this.props.data.ChangeLowerRatingChoice(this.state.lowerRating)
          }
        if (prevState.lowerNumberRating !== this.state.lowerNumberRating) {
            this.props.data.ChangeLowerNumberRatingChoice(this.state.lowerNumberRating)
          }
        if (prevState.upperNumberRating !== this.state.upperNumberRating) {
            this.props.data.ChangeUpperNumberRatingChoice(this.state.upperNumberRating)
          }
        if (prevState.ratingError !== this.state.ratingError) {
            this.props.data.ChangeRatingErrorChoice(this.state.ratingError)
          }
        if (prevState.numberRatingError !== this.state.numberRatingError) {
            this.props.data.ChangeNumberRatingErrorChoice(this.state.numberRatingError)
          }


          

      const digits_only = string => [...string].every(c => '0123456789.'.includes(c));
      if (prevState.upperRating !== this.state.upperRating || prevState.lowerRating !== this.state.lowerRating) {
        
        if( !digits_only(this.state.lowerRating) &&  this.state.lowerRating!=='')
                this.setState({
                    ratingError:'the upper and lower limits must be positive numbers'
                })        
        else if(!digits_only(this.state.upperRating) && this.state.upperRating!=='')
                this.setState({
                    ratingError:'the upper and lower limits must be numbers'
                })   
        else if(parseFloat(this.state.upperRating)<parseFloat(this.state.lowerRating))
                this.setState({
                    ratingError:'The lower limit must be smaller than the upper'
                })    
        else if((parseFloat(this.state.upperRating)>5.0 || parseFloat(this.state.upperRating)<0.0) && this.state.upperRating!=='')
                this.setState({
                    ratingError:'the Rating must be bettween 0 and 5'
                })
        else if((parseFloat(this.state.lowerRating)<0.0 || parseFloat(this.state.lowerRating)>5.0 ) && this.state.lowerRating!=='')
                this.setState({
                    ratingError:'the Rating must be bettween 0 and 5'
                })
        else
        {
            this.setState({
                ratingError:''
            })           
        }
      }
      if (prevState.upperNumberRating !== this.state.upperNumberRating || prevState.lowerNumberRating !== this.state.lowerNumberRating) {
        
        if( !digits_only(this.state.lowerNumberRating) &&  this.state.lowerNumberRating!=='')
                this.setState({
                    numberRatingError:'the upper and lower limits must be positive numbers'
                })        
        else if(!digits_only(this.state.upperNumberRating) && this.state.upperNumberRating!=='')
                this.setState({
                    numberRatingError:'the upper and lower limits must be numbers'
                })   
        else if(parseFloat(this.state.upperNumberRating)<parseFloat(this.state.lowerNumberRating))
                this.setState({
                    numberRatingError:'The lower limit must be smaller than the upper'
                })    
        else if((parseFloat(this.state.upperNumberRating)>100000000 || parseFloat(this.state.upperNumberRating)<0.0) && this.state.upperNumberRating!=='')
                this.setState({
                    numberRatingError:'the Rating must be bettween 0 and 100 Milions'
                })
        else if((parseFloat(this.state.lowerNumberRating)<0.0 || parseFloat(this.state.lowerNumberRating)>100000000 ) && this.state.lowerNumberRating!=='')
                this.setState({
                    numberRatingError:'the Rating must be bettween 0 and 100 Milions'
                })
        else
        {
            this.setState({
                numberRatingError:''
            })           
        }
      }

    }
    changeLowerRating(e) {
        e.preventDefault();

        this.setState({
            lowerRating: e.target.value
        });
    }
    changeUpperRating(e) {
        e.preventDefault();

        this.setState({
            upperRating: e.target.value
        });
    }

    changeLowerNumberRating(e) {
        e.preventDefault();

        this.setState({
            lowerNumberRating: e.target.value
        });
    }

    changeUpperNumberRating(e) {
        e.preventDefault();

        this.setState({
            upperNumberRating: e.target.value
        });
    }
    advancedHandler = () => {
        if(this.state.ratingError==='' && this.state.numberRatingError==='')
      {
          this.setState(initialState => ({
              showAdvanced: !initialState.showAdvanced,
            }));
      }
  }

      handleSliderR = sliderVal => {
        this.setState({
          lowerRating: sliderVal[0],
          upperRating: sliderVal[1]
        });
      };
      handleSliderNR = sliderVal => {
        this.setState({
          lowerNumberRating: sliderVal[0],
          upperNumberRating: sliderVal[1]
        });
      };

    render() {
        if(this.state.lowerRating!==lR)
        {
            lR=this.state.lowerRating             
        }
        if(this.state.upperRating!==uR)
        {
            uR=this.state.upperRating             
        }
        if(this.state.lowerNumberRating!==lNR)
        {
            lNR=this.state.lowerNumberRating             
        }
        if(this.state.upperNumberRating!==uNR)
        {
            uNR=this.state.upperNumberRating             
        }
        if(this.state.ratingError!==err)
        {
            err=this.state.ratingError             
        }
        if(this.state.numberRatingError!==Nerr)
        {
            Nerr=this.state.numberRatingError             
        }
        if(this.state.showAdvanced!==showA)
        {
            showA=this.state.showAdvanced             
        }
        return (
            <div>
                {!this.state.showAdvanced && 
                <Container>
                    <Row>
                        <Col style={{color:'grey',textAlign:'center',fontSize:'15px',fontWeight:'600'}}>
                            0&lt;Rating&lt;5
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{height:'5px'}}></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Nouislider
                                    accessibility
                                    range={{min: 0, max: 5}}
                                    start={[parseFloat(this.state.lowerRating), parseFloat(this.state.upperRating)]}
                                    onChange={this.handleSliderR}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{color:'grey',fontSize:'13px'}}>
                            min= {this.state.lowerRating}
                        </Col>
                        <Col style={{color:'grey',fontSize:'13px'}}>
                            max= {this.state.upperRating}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{height:'10px'}}></Col>
                    </Row>
                    <Row>
                        <Col style={{color:'grey',textAlign:'center',fontSize:'15px',fontWeight:'600'}}>
                            0&lt;Number of Rating&lt;100M
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{height:'7px'}}></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Nouislider
                                accessibility
                                range={{min: 0.00, max: 100000000.00}}
                                start={[parseFloat(this.state.lowerNumberRating), parseFloat(this.state.upperNumberRating)]}
                                onChange={this.handleSliderNR}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{color:'grey',fontSize:'13px'}}>
                            min= {this.state.lowerNumberRating}
                        </Col>
                        <Col style={{color:'grey',fontSize:'13px'}}>
                            max= {this.state.upperNumberRating}
                        </Col>
                    </Row>
                </Container>}
                
                {this.state.showAdvanced &&
                    <Container>
                        <Row>
                            <Col style={{color:'grey',marginLeft:'20px',fontSize:'15px',fontWeight:'600'}}>
                                0&lt;Rating&lt;5
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{height:'5px'}}></Col>
                        </Row>
                        <Row>
                            <Col sm={1} style={{color:'#4a4a4a'}}>
                                R&gt;
                            </Col>
                            <Col>
                            <FormControl type="text" placeholder="0.0"  className="mr-sm-2" style={{width:'60px'}} onChange={this.changeLowerRating} value={this.state.lowerRating}></FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{height:'5px'}}></Col>
                        </Row>
                        <Row>
                            <Col sm={1} style={{color:'#4a4a4a'}}>
                                R&lt;
                            </Col>
                            <Col>
                                <FormControl type="text" placeholder="5.0"  className="mr-sm-2" style={{width:'60px'}} onChange={this.changeUpperRating} value={this.state.upperRating}></FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{color:'red',fontSize:'13px'}}>
                                {this.state.ratingError}
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{height:'10px'}}></Col>
                        </Row>
                        <Row>
                            <Col style={{color:'grey',marginLeft:'20px',fontSize:'15px',fontWeight:'600'}}>
                                0&lt;Number of Rating&lt;100M
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{height:'5px'}}></Col>
                        </Row>
                        <Row>
                            <Col sm={1} style={{color:'#4a4a4a'}}>
                                NR&gt;
                            </Col>
                            <Col>
                                <FormControl type="text" placeholder="0"  className="mr-sm-2" style={{width:'120px'}} onChange={this.changeLowerNumberRating} value={this.state.lowerNumberRating}></FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={1} style={{color:'#4a4a4a'}}>
                                NR&lt;
                            </Col>
                            <Col>
                                <FormControl type="text" placeholder="100000000"  className="mr-sm-2" style={{width:'120px'}} onChange={this.changeUpperNumberRating} value={this.state.upperNumberRating}></FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{color:'red',fontSize:'13px'}}>
                                {this.state.numberRatingError}
                            </Col>
                        </Row>
                    </Container>
                }

                <Container>
                        <Row>
                            <Col style={{textAlign:'center'}}>
                                <Form.Check className="filters"
                                    type="checkbox"
                                    label="Advanced Filter"
                                    name="Adv"
                                    id="Adv"
                                    checked={this.state.showAdvanced}
                                    onChange={this.advancedHandler}
                                    custom
                                />
                            </Col>
                        </Row>
                </Container>
          </div>
         
        )
    }
}

export default Rating
