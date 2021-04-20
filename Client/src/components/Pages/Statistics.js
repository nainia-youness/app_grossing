import React, { Component } from 'react'
import TheHeader from '../Header/TheHeader'
import Text from '../Other/Text'
import '../../css/SuperResponsiveTableStyle.css'
import Rows from '../Other/Table/Rows'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../css/table.css"
import Forms from '../Other/Forms'
import '../../css/Forms.css'
import ChoosePages from '../Other/ChoosePages'
import axios from 'axios'
import Auth from '../Auth/Auth'
import {reactLocalStorage} from 'reactjs-localstorage';
import ClipLoader from "react-spinners/ClipLoader";
import {Container,Row,Col} from 'react-bootstrap'
import   {withRouter} from 'react-router-dom'

class Statistics extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Top:'Top New Free',
            country:'Morocco',
            category:'Game',
            rows:[],
            numberApps:100,
            loading: true,
            page:'1',
            isNextPage:false,
            isAppFoundText:'',
            isCategoryChanged:false
        }
    }

      
    async componentDidMount(){
        console.log('stats mount')
        if(window.history.state===undefined || window.history.state===null)
        {
            console.log('history undefined')
            await this.props.history.push('/statistics',{ Top: 'Top New Free',page: '1',country: 'Morocco',category: 'Game' })
        }
        else
        {
            if(window.history.state.state===undefined || window.history.state.state===null)
            {
                console.log('history undefined')
                await this.props.history.push('/statistics',{ Top: 'Top New Free',page: '1',country: 'Morocco',category: 'Game' })
            }
            else{
                console.log('history defined')
                await this.setState({
                    Top:window.history.state.state.Top,
                    country:window.history.state.state.country,
                    category:window.history.state.state.category,
                    page:window.history.state.state.page
                })
            }
        }
        
        await Auth(reactLocalStorage.getObject('user').token)
        await axios.post(`/statistics`,{country:this.state.country,list:this.state.Top,category:this.state.category,page:this.state.page})//this get means getting the data
                .then(res=>{
                    console.log(res)
                    this.setState({
                        rows:res.data.data,
                        isNextPage:res.data.nextpage,
                        numberApps:res.data.data.length
                    })
                })
                .catch(err=>{
                    console.log(err)
                    if(err.response!==undefined){
                        if(err.response.status === 401)
                        {
                            if(err.response.data.message==='No valid token provided or expired')
                            {
                                localStorage.clear()
                                this.props.history.push('/login')
                            }
                        }
                        else
                        {
                            this.props.history.push('/PageNotFound')
                        }
                    }
                })
                .finally(()=>{
                    this.setState({
                        loading:false
                    }) // stop spinner (in response/error)
                    if(this.state.numberApps===0)
                    {
                        this.setState({
                            isAppFoundText:'NO APP FOUND'
                        })
                    }
                    else
                    {
                        this.setState({
                            isAppFoundText:''
                        })
                    }
                })
                await console.log(window.history)
    }


    changeTopChoice(item)
    {
        this.setState({
            Top:item
        })
    }

    changeCountryChoice(item)
    {
        this.setState({
            country:item
        })
    }

    changeCategoryChoice(item)
    {
        this.setState({
            category:item
        })
    }
    changeSubCategoryChoice(item)
    {
        this.setState({
            subCategory:item
        })
    }

    changeRows(item)
    {
        this.setState({
            rows:item
        })
    }
    changePage(item)
    {
        this.setState({
            page:item
        })
    }
    
    changeIsNextPage(item)
    {
        this.setState({
            isNextPage:item
        })
    }


    async nextPageButtonHandler(){
        await this.props.history.push('/statistics',{ page:this.state.page,Top: this.state.Top,country:this.state.country,category:this.state.category })
        await window.location.reload(false);
    }

    async choosePagesDidMount(){
        if(window.history.state===undefined || window.history.state===null)
        {
            await this.props.history.push('/statistics',{ Top: 'Top New Free',page: '1',country: 'Morocco',category: 'All Apps' })
        }
        else{
            if(window.history.state.state===undefined || window.history.state.state===null)
            {
                await this.props.history.push('/statistics',{ Top: 'Top New Free',page: '1',country: 'Morocco',category: 'All Apps' })
            }
        }
    }

    render() {
        const {numberApps}=this.state
        return (
                <React.Fragment>
                    <TheHeader/>
                        <Container>
                            <Row >
                                <Col style={{height:'90px'}}></Col>
                            </Row>
                            <Row>
                                <Col><Text list={this.state.Top} category={this.state.category} country={this.state.country} className="print"></Text></Col>
                            </Row>
                            <Row>
                                <Col style={{height:'20px'}}></Col>
                            </Row>
                            <Row >
                                <Forms page={this.state.page} data={
                                    {top:this.state.Top,ChangeTopChoice:this.changeTopChoice.bind(this),ca:this.state.category,ChangeCategoryChoice:this.changeCategoryChoice.bind(this),subCa:this.state.subCategory,ChangeSubCategoryChoice:this.changeSubCategoryChoice.bind(this),co:this.state.country,ChangeCountryChoice:this.changeCountryChoice.bind(this)}}/>
                            </Row>
                            <Row>
                                <Col style={{height:'20px'}}></Col>
                            </Row>
                            <Row>
                                <Col  md={{ span: 12}}>
                                    <Rows  page={this.state.page} rows={this.state.rows} showOrderByHeader={false} theHeaders={["Ranking","Logo","Title","Downloads","Review","Rating"]}/>
                                </Col>
                                <Col  md={{offset: 5 }}>
                                    <ClipLoader textAlign='center'
                                            size={100}
                                            color={"orange"}
                                            loading={this.state.loading}
                                        />
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{textAlign:'center',fontSize:'18px',color:'grey'}}>
                                             {this.state.isAppFoundText}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <ChoosePages 
                                    isCategoryChanged={this.state.isCategoryChanged}
                                    isNextPage={this.state.isNextPage}
                                    numberApps={numberApps}  data={
                                        {page:this.state.page,ChangePage:this.changePage.bind(this)}}
                                    nextPageButtonHandler={()=>this.nextPageButtonHandler()} 
                                    choosePagesDidMount={()=>this.choosePagesDidMount()} 
                                >
                                </ChoosePages>
                                </Col>
                            </Row>
                        </Container>
                </React.Fragment>
        )
    }
}

export default withRouter(Statistics)
