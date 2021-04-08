import React, { Component } from 'react'
import {FormControl, Container,Row, Col,Form,Dropdown,Nav} from "react-bootstrap";
import '../../css/Filter.css'
import '../../css/Forms.css'
import "nouislider/distribute/nouislider.css";
import Nouislider from 'react-nouislider';

const Country=[['Morocco','France'],['Egypte','Spain']]
const Top=['Top New Free','Top Free','Top Grossing','Top Paid','Top New Paid']

const Category=[
  ['All Apps'],
  ['Game Adventure',
  'Game Casino',
  'Game board'],
  ['Game Arcade',
  'Game Sports',
  'Game Card'],
  ['Game Casual',
  'Game Puzzle',
  'Game Trivia'],
  ['Game',
  'Game Racing',
  'Game Role Playing'],
  ['Game Educational',
  'Game Word',
  'Game Simulation'],
  ['Game Music',
  'Game Strategy',
  'Game Action'],
  ['Family Action',
  'Communication',
  'Events'],
  ['Family Pretend',
  'Business',
  'Social'],
  ['Tools',
  'Lifestyle',
  'Application'],
  ['Personalization',
  'Comics',
  'Finance'],
  ['News And Magazines',
  'Shopping',
  'Dating'],
  ['Health And Fitness',
  'Education',
  'Maps And Navigation'],
  ['Libraries And Demo',
  'Food And Drink',
  'Video And Players'],
  ['Books And Reference',
  'Family',
  ' Beauty'],
  ['Android Wear',
  'Photography',
  'Parenting'],
  ['Medical',
  'Travel And Local',
  'Music And Audio'],
  ['Family Education',
  'Art And Design',
  'Family MusicVideo'],
  ['Weather',
  'Productivity',
  'Sports'],
  ['Entertainment',
  'House And Home',
  'Family BrainGames'],
  ['Family',
  'Auto And Vehicles'],
]

let uR='600'
let lR='0'
let showA=false
let err=''
let tC='Top New Free'
let country='Morocco'
let category='All Apps'
class TopChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
             topChart:tC,
             country:country,
             category:category,
             upperRanking:uR,
             lowerRanking:lR,
             rankingError:err,
             showAdvanced:showA,
        }
        //this.changePublishedChoice=this.changePublishedChoice.bind(this)
        this.TopClickHandler=this.TopClickHandler.bind(this)
        this.changeLowerRanking=this.changeLowerRanking.bind(this)
        this.changeUpperRanking=this.changeUpperRanking.bind(this)
    }
 

componentDidUpdate(prevProps, prevState) {

  if (prevState.upperRanking !== this.state.upperRanking) {
    this.props.data.ChangeUpperRankingChoice(this.state.upperRanking)
  }
if (prevState.lowerRanking !== this.state.lowerRanking) {
    this.props.data.ChangeLowerRankingChoice(this.state.lowerRanking)
  }
if (prevState.rankingError !== this.state.rankingError) {
    this.props.data.ChangeRankingErrorChoice(this.state.rankingError)
  }
  if (prevState.topChart !== this.state.topChart) {
    this.props.data.ChangeTopChartChoice(this.state.topChart)
  }
  if (prevState.country !== this.state.country) {
    this.props.data.ChangeCountryChoice(this.state.country)
  }
  if (prevState.category !== this.state.category) {
    this.props.data.ChangeCategoryChoice(this.state.category)
  }





  const digits_only = string => [...string].every(c => '0123456789.'.includes(c));
  if (prevState.upperRanking !== this.state.upperRanking || prevState.lowerRanking !== this.state.lowerRanking) {
    
    if( !digits_only(this.state.lowerRanking) &&  this.state.lowerRanking!=='')
            this.setState({
              rankingError:'the upper and lower limits must be positive numbers'
            })        
    else if(!digits_only(this.state.upperRanking) && this.state.upperRanking!=='')
            this.setState({
              rankingError:'the upper and lower limits must be numbers'
            })   
    else if(parseFloat(this.state.upperRanking)<parseFloat(this.state.lowerRanking))
            this.setState({
              rankingError:'The lower limit must be smaller than the upper'
            })    
    else if((parseFloat(this.state.upperRanking)>600 || parseFloat(this.state.upperRanking)<0.0) && this.state.upperRanking!=='')
            this.setState({
              rankingError:'the Ranking must be bettween 0 and 600'
            })
    else if((parseFloat(this.state.lowerRanking)<0.0 || parseFloat(this.state.lowerRanking)>600 ) && this.state.lowerRanking!=='')
            this.setState({
                rankingError:'the Rating must be bettween 0 and 600'
            })
    else
    {
        this.setState({
          rankingError:''
        })           
    }
  }}


  TopClickHandler(TopName){
    this.setState({
        topChart:TopName
    })
  }

  CategoryClickHandler(CategoryName){
    this.setState({
        category:CategoryName
    })
  }

  CountryClickHandler(CountryName){
    this.setState({
        country:CountryName
    })
  }

  changeLowerRanking(e) {
    e.preventDefault();

    this.setState({
        lowerRanking: e.target.value
    });
  }
  changeUpperRanking(e) {
    e.preventDefault();

    this.setState({
        upperRanking: e.target.value
    });
  }
  handleSliderR = sliderVal => {
    this.setState({
      lowerRanking: sliderVal[0],
      upperRanking: sliderVal[1]
    });
  };
  advancedHandler = () => {
    if(this.state.rankingError==='')
  {
      this.setState(initialState => ({
          showAdvanced: !initialState.showAdvanced,
        }));
  }
}

    render() {
      if(this.state.topChart!==tC)
      {
          tC=this.state.topChart             
      }
      if(this.state.country!==country)
      {
          country=this.state.country             
      }
      if(this.state.category!==category)
      {
          category=this.state.category             
      }
      if(this.state.lowerRanking!==lR)
      {
          lR=this.state.lowerRanking             
      }
      if(this.state.upperRanking!==uR)
      {
          uR=this.state.upperRanking             
      }
      if(this.state.rankingError!==err)
      {
          err=this.state.rankingError             
      }
      if(this.state.showAdvanced!==showA)
      {
          showA=this.state.showAdvanced             
      }
        return (
          <>
            <div style={{marginLeft:"8px",width:'200px'}}>
            <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
              </Form.Label>
              <Col sm={10} style={{color:"grey", marginLeft:"20px",marginTop:'-5px',fontSize:'15px'}}>
                  List
              </Col>
              <Col sm={10}>
              <Nav.Item>
              <Dropdown style={{marginLeft:'15px'}}>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {this.state.topChart}
                        </Dropdown.Toggle>
                    
                        <Dropdown.Menu>
                        <table><tbody>
                          {
                            Top.map((item,index)=>(
                              <tr key={index}>
                                <td >
                              <Dropdown.Item className='formStyle' id={item===this.state.topChart ?'ChosenL':''}  onClick={() => this.TopClickHandler(item)}>{item}</Dropdown.Item>
                              </td>
                              </tr>
                            ))
                          }
                            </tbody></table>
                        </Dropdown.Menu>
                        </Dropdown>
              </Nav.Item>
              </Col>
              <Col sm={10} style={{color:"grey", marginLeft:"20px",marginTop:'-5px',fontSize:'15px'}}>
                  Category
              </Col>
              <Col sm={10}>
              <Nav.Item>
              <Dropdown style={{marginLeft:'15px'}}>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {this.state.category}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <table><tbody>
                            {
                                    Category.map((value,index,element)=>
                                        <tr key={index}>
                                            {value.map((value,index,element)=>
                                            <td  key={index}>
                                            <Dropdown.Item className='formStyle' id={element[index]===this.state.category ?'ChosenCat':''} onClick={() => this.CategoryClickHandler(element[index])}>{element[index]}</Dropdown.Item>
                                            </td>
                                        )}
                                        </tr>
                                    )
                            }
                                
                                </tbody></table>
                        </Dropdown.Menu>
                        </Dropdown>
              </Nav.Item>
              </Col>
              <Col sm={10} style={{color:"grey", marginLeft:"20px",marginTop:'-5px',fontSize:'15px'}}>
                  Country
              </Col>
              <Col sm={10}>
              <Nav.Item>
              <Dropdown style={{marginLeft:'15px'}}>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {this.state.country}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        {
                            <table>
                            <tbody>
                                {
                                    Country.map((value,index,element)=>
                                        <tr key={index}>
                                            {value.map((value,index,element)=>
                                            <td  key={index}>
                                            <Dropdown.Item className='formStyle' id={element[index]===this.state.country ?'ChosenC':''} onClick={() => this.CountryClickHandler(element[index])}>{element[index]}</Dropdown.Item>
                                            </td>
                                        )}
                                        </tr>
                                    )
                                    }
                                </tbody></table>
                          }
                            
                        </Dropdown.Menu>
                        </Dropdown>
              </Nav.Item>
              </Col>
              <Col sm={10} style={{color:"grey", marginLeft:"20px",marginTop:'-5px',fontSize:'15px'}}>
                  Rank
              </Col>
            </Form.Group>
          </fieldset>
          </div>
          <div>
          {!this.state.showAdvanced &&
          <Container>
            <Row>
              <Col>
                  <Nouislider
                      accessibility
                      range={{min: 0, max: 600}}
                      start={[parseFloat(this.state.lowerRanking), parseFloat(this.state.upperRanking)]}
                      onChange={this.handleSliderR}
                  />
              </Col>
            </Row>
            <Row>
              <Col style={{color:'grey',fontSize:'13px'}}>
                min= {this.state.lowerRanking}
              </Col>
              <Col style={{color:'grey',fontSize:'13px'}}>
                max= {this.state.upperRanking}
              </Col>
            </Row>            
          </Container>}

          {this.state.showAdvanced &&
            <Container>
                        <Row>
                            <Col sm={1} style={{color:'#4a4a4a'}}>
                              R&gt;
                            </Col>
                            <Col>
                              <FormControl type="text" placeholder="0"  className="mr-sm-2" style={{width:'73px'}} onChange={this.changeLowerRanking} value={this.state.lowerRanking}></FormControl>
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
                              <FormControl type="text" placeholder="600"  className="mr-sm-2" style={{width:'73px'}} onChange={this.changeUpperRanking} value={this.state.upperRanking}></FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{color:'red',fontSize:'13px'}}>
                                {this.state.rankingError}
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
                                    name="Advance"
                                    id="Advance"
                                    checked={this.state.showAdvanced}
                                    onChange={this.advancedHandler}
                                    custom
                                />
                            </Col>
                        </Row>
                    </Container>
          </div>
        </>
        )
    }
}

export default TopChart
