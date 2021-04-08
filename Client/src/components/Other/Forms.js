import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import '../../css/Forms.css'
import   {withRouter,Redirect} from 'react-router-dom'
import {Col} from 'react-bootstrap'


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

class Forms extends Component {

    constructor(props) {
        super(props)
        this.state = {
             Top:'Top New Free',
             country:'Morocco',
             category:'All Apps',

        }
        this.TopClickHandler=this.TopClickHandler.bind(this)
        this.CountryClickHandler=this.CountryClickHandler.bind(this)
        this.CategoryClickHandler=this.CategoryClickHandler.bind(this)
    }

    async componentDidMount(){
        console.log('form mount')
        if(window.history.state===undefined || window.history.state===null)
        {
            await this.props.history.push('/statistics',{ Top: 'Top New Free',page: '1',country: 'Morocco',category: 'All Apps' })
        }
        else{
            if(window.history.state.state===undefined || window.history.state.state===null)
            {
                await this.props.history.push('/statistics',{ Top: 'Top New Free',page: '1',country: 'Morocco',category: 'All Apps' })
            }
            else{
                this.setState({
                    Top:window.history.state.state.Top,
                    country:window.history.state.state.country,
                    category:window.history.state.state.category,
                    page:window.history.state.state.page
                })
            }

        }
    }

    async TopClickHandler(TopName){
        await this.setState({
            Top:TopName
        })
        await this.props.data.ChangeTopChoice(this.state.Top)
        await this.props.history.push('/statistics',{ Top: TopName,page: '1',country: this.state.country,category: this.state.category });
        await window.location.reload(false);
    }

    async CountryClickHandler(CountryName){
        await this.setState({
            country:CountryName
        })
        await this.props.data.ChangeCountryChoice(this.state.country)
        await this.props.history.push('/statistics',{ Top: this.state.Top,page: '1',country: CountryName,category: this.state.category });
        await window.location.reload(false);
    }


    async CategoryClickHandler(CategoryName){
        await this.setState({
            category:CategoryName,
        })
        
        await this.props.data.ChangeCategoryChoice(this.state.category)
        await this.props.history.push('/statistics',{ Top:  this.state.Top,page: '1',country: this.state.country,category: CategoryName });
        await window.location.reload(false);
    }



    render() {
        return (
            <>
                {this.state.category==='Game' && <Redirect to='statistics'/>}
                <Col lg="auto" sm={6} >
                    <Dropdown style={{textAlign:'left'}}>
                            <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                                {this.state.Top}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            {
                                    Top.map((item,index)=>(
                                    <Dropdown.Item className='formStyle' id={item===this.state.Top ?'ChosenL':''}  key={index} onClick={() => this.TopClickHandler(item)}>{item}</Dropdown.Item>
                                    ))
                            }
                            </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col lg="auto" sm={6}>
                        <Dropdown style={{textAlign:'left'}}>
                                <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                                    {this.state.country}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <table>
                                    <tbody>
                                        {
                                            Country.map((value,index,element)=>
                                                <tr key={index}>
                                                    {value.map((value,index,element)=>
                                                    <td  key={index}>
                                                    <Dropdown.Item  className='formStyle' id={element[index]===this.state.country ?'ChosenC':''} onClick={() => this.CountryClickHandler(element[index])}>{element[index]}</Dropdown.Item>
                                                    </td>
                                                )}
                                                </tr>
                                            )
                                            }
                                        </tbody></table>
                                </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col lg="auto" sm={6} >
                    <Dropdown style={{textAlign:'left'}}>
                        <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
                            {this.state.category}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                                <table>
                                    <tbody>
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
                                    </tbody>
                                </table>
                            </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col style={{textAlign:'left'}}>
                    
                </Col>
            </>
        
        )
    }
}

export default withRouter(Forms)