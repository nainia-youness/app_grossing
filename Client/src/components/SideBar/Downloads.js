import React, { Component } from 'react'
import {FormControl, Container,Row, Col, Form } from "react-bootstrap";
import '../../css/Filter.css'
import "nouislider/distribute/nouislider.css";
import Nouislider from 'react-nouislider';

let lD='0'
let uD='10000000'
let err=''
let showA=false

class Downloads extends Component {

    constructor(props) {
        super(props)
        this.state = {
             upperDownload:uD,
             lowerDownload:lD,
             showAdvanced:showA,
             downloadError:err
        }
        this.changeLowerDownload=this.changeLowerDownload.bind(this)
        this.changeUpperDownload=this.changeUpperDownload.bind(this)
    }


    componentDidUpdate(prevProps, prevState) {
        const digits_only = string => [...string].every(c => '0123456789.'.includes(c));
        if (prevState.upperDownload !== this.state.upperDownload) {
            this.props.data.ChangeUpperDownloadChoice(this.state.upperDownload)
          }
        if (prevState.lowerDownload !== this.state.lowerDownload) {
            this.props.data.ChangeLowerDownloadChoice(this.state.lowerDownload)
          }
        if (prevState.downloadError !== this.state.downloadError) {
            this.props.data.ChangeDownloadErrorChoice(this.state.downloadError)
          }
          
      if (prevState.upperDownload !== this.state.upperDownload || prevState.lowerDownload !== this.state.lowerDownload) {
        
        if( !digits_only(this.state.lowerDownload) &&  this.state.lowerDownload!=='')
                this.setState({
                    downloadError:'the upper and lower limits must be positive numbers'
                })        
        else if(!digits_only(this.state.upperDownload) && this.state.upperDownload!=='')
                this.setState({
                    downloadError:'the upper and lower limits must be numbers'
                })   
        else if(parseFloat(this.state.upperDownload)<parseFloat(this.state.lowerDownload))
                this.setState({
                    downloadError:'The lower limit must be smaller than the upper'
                })    
        else if(((parseFloat(this.state.upperDownload)>10000000) || (parseFloat(this.state.upperDownload)<0.0)) && (this.state.upperDownload!==''))
                this.setState({
                    downloadError:'the Downloads must be bettween 0 and 10 Millions'
                })
        else if((parseFloat(this.state.lowerDownload)<0.0 || parseFloat(this.state.lowerDownload>10000000 )) && this.state.lowerDownload!=='')
                this.setState({
                    downloadError:'the Downloads must be bettween 0 and 10 Millions'
                })
    
        else
        {
            this.setState({
                downloadError:''
            })           
        }
      }


    }

    changeLowerDownload(e) {
        e.preventDefault();

        this.setState({
            lowerDownload: e.target.value
        });
    }
    changeUpperDownload(e) {
        e.preventDefault();

        this.setState({
            upperDownload: e.target.value
        });
    }
    handleSliderD = sliderVal => {
        this.setState({
          lowerDownload: sliderVal[0],
          upperDownload: sliderVal[1]
        });
      };

      advancedHandler = () => {
          if(this.state.downloadError==='')
        {
            this.setState(initialState => ({
                showAdvanced: !initialState.showAdvanced,
              }));
        }
    }

    render() {
        if(this.state.lowerDownload!==lD)
        {
            lD=this.state.lowerDownload             
        }
        if(this.state.upperDownload!==uD)
        {
            uD=this.state.upperDownload             
        }
        if(this.state.downloadError!==err)
        {
            err=this.state.downloadError             
        }
        if(this.state.showAdvanced!==showA)
        {
            showA=this.state.showAdvanced             
        }
        return (
            <div >
               {!this.state.showAdvanced && <Container>
                    <Row>
                        <Col style={{color:'grey',textAlign:'center',fontSize:'15px',fontWeight:'600'}}>
                            0&lt;Downloads&lt;10M
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{height:'5px'}}></Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Nouislider
                                    accessibility
                                    range={{min: 0, max: 10000000}}
                                    start={[parseFloat(this.state.lowerDownload), parseFloat(this.state.upperDownload)]}
                                    onChange={this.handleSliderD}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{color:'grey',fontSize:'13px'}}>
                            min= {this.state.lowerDownload}
                        </Col>
                        <Col style={{color:'grey',fontSize:'13px'}}>
                            max= {this.state.upperDownload}
                        </Col>
                    </Row>
                </Container>
                }
                {this.state.showAdvanced &&
                    <Container>
                        <Row>
                            <Col style={{color:'grey',marginLeft:'20px',fontSize:'15px',fontWeight:'600'}}>
                                0&lt;Downloads&lt;10M
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{height:'5px'}}></Col>
                        </Row>
                        <Row>
                            <Col sm={1} style={{color:'#4a4a4a'}}>
                                D&gt;
                            </Col>
                            <Col>
                                <FormControl type="text" placeholder="0.0"  className="mr-sm-2" style={{width:'110px'}} onChange={this.changeLowerDownload} value={this.state.lowerDownload}></FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{height:'5px'}}></Col>
                        </Row>
                        <Row>
                            <Col sm={1} style={{color:'#4a4a4a'}}>
                                D&lt;
                            </Col>
                            <Col>
                                <FormControl type="text" placeholder="10000000"  className="mr-sm-2" style={{width:'110px'}} onChange={this.changeUpperDownload} value={this.state.upperDownload}></FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{color:'red',fontSize:'13px'}}>
                                {this.state.downloadError}
                            </Col>
                        </Row>
                    </Container>
                }
                    <Container>
                        <Row>
                            <Col style={{textAlign:'center'}}>
                                <Form.Check className='filters'
                                    type="checkbox"
                                    label="Advanced Filter"
                                    name="Advanced"
                                    id="Advanced"
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

export default Downloads
