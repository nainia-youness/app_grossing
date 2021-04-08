import React, { Component } from 'react'
import TheHeader from '../Header/TheHeader'
import '../../css/apps.css'
import Title from '../Apps/Title'
import MyCarousel from '../Apps/MyCarousel'
import Cards from '../Apps/Cards'
import HistoryChart from '../Apps/HistoryChart'
import RatingBar from '../Apps/RatingBar'
import DevInformation from '../Apps/DevInformation'
import Description from '../Apps/Description'
import Stars from '../Apps/Stars'
import DailyInstalls from '../Apps/DailyInstalls'
import axios from 'axios'
import {Container,Row, Col} from "react-bootstrap";
import Auth from '../Auth/Auth'
import {reactLocalStorage} from 'reactjs-localstorage';


class apps extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            //title
            title:{
                title:'',
                logoApp:'',
                subTitle:'',
                devName:''
            ,},
            //Cards
            cards:{
                downloads:'',
                rating:'',
                numberRating:'',
                rank:'',
            },
            //MyCarousel
            carouselImages: [
              ],
            //historyRatingData
            historyRatingData:{
                data:[],
                categories:[],
            },
            //RatingBar
            historyRatingBar:[],//5stars 4 stars ect... 
            //ranking history table
            rankingHistoryData:[],
            //stars
            starsData:{
                rating:0,
                ratingNumber:0
            }
        }
    }


    componentDidMount(){
        this.setState({
            isHistoryNull:false
        })
        Auth(reactLocalStorage.getObject('user').token)
        
        if(window.history.state===undefined || window.history.state===null)
        {
            this.props.history.push('/apps/'+this.props.match.params.title,{category: 'All Apps',subCategory:'Top New Free'})
        }
        else{
            if(window.history.state.state===undefined || window.history.state.state===null)
                this.props.history.push('/apps/'+this.props.match.params.title,{category: 'All Apps',subCategory:'Top New Free'})
        }

        axios.get(`/apps/${this.props.match.params.title}`,{
            params: {
              category:window.history.state.state.category,
              subCategory:window.history.state.state.subCategory
            }
        })
        .then(res=>{
            if(res.data.apps[0]===undefined)
                this.props.history.push('/PageNotFound')
            console.log(res.data)
            let RatingTable=[]
            let RatingDateTable=[]
            for(let i=0;i<res.data.historystarrating.length;i++)
            {
                RatingTable.push(res.data.historystarrating[i].starrating)
                RatingDateTable.push(res.data.historystarrating[i].datetraced)
            }
            let history5ratingTable=[]
            history5ratingTable.push(res.data.history5rating[0].onerating)
            history5ratingTable.push(res.data.history5rating[0].towrating)
            history5ratingTable.push(res.data.history5rating[0].threerating)
            history5ratingTable.push(res.data.history5rating[0].fourrating)
            history5ratingTable.push(res.data.history5rating[0].fiverating)
            let screenshotTable=[]
            for(let i=0;i<res.data.screenshot.length;i++)
            {
                if(res.data.screenshot[i].imageurl.substring(0,23)!=='https://www.youtube.com')
                    screenshotTable.push({imageurl:res.data.screenshot[i].imageurl})
            }
            this.setState({
                title: {
                  title: res.data.apps[0].title,
                  logoApp: res.data.apps[0].imageurl,
                  subTitle: res.data.apps[0].shortdescription,
                  devName:res.data.apps[0].developername
                },
                cards: {
                    ...this.state.cards,
                    downloads:res.data.apps[0].downloadtraced,
                    rating:res.data.apps[0].starrating,
                    rank:res.data.apps[0].rank,
                    numberRating:res.data.apps[0].ratingcount
                },
                carouselImages: screenshotTable,
                starsData:{
                    rating:res.data.apps[0].starrating,
                    ratingNumber:res.data.apps[0].ratingcount
                },
                historyRatingData:{
                    data:RatingTable.reverse(),
                    categories:RatingDateTable.reverse(),
                },
                historyRatingBar:history5ratingTable.reverse(),
              });
        })
        .catch(error=>{
            console.log(error)
            if(error.response!==undefined){
                if(error.response.status === 401)
                {
                    if(error.response.data.message==='No valid token provided or expired')
                    {
                        console.log('no token')
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
    }


    render() {
        const {starsData,title,cards,carouselImages,historyRatingData,historyRatingBar}=this.state
        return (
            <React.Fragment>
            <TheHeader></TheHeader>
            <Container >
                <Row>
                    <Col style={{height:'80px'}}>
                    </Col>
                </Row>
                <Row>
                    <Col style={{color:'grey',textAlign:'left'}}>
                        Android App: Category {!(window.history.state===null) && <span>{window.history.state.state.category}</span>}
                    </Col>
                </Row>
                <Row>
                    <Title title={title} ></Title>
                </Row>
                <Row>
                    <Col style={{height:'30px'}}></Col>
                </Row>
                <Row >
                    <Cards cards={cards}></Cards>
                </Row>
                <Row>
                    <Col style={{height:'30px'}}></Col>
                </Row>
                <Row>
                    <Col>
                        <MyCarousel carouselImages={carouselImages}></MyCarousel>
                    </Col>
                </Row>
                <Row>
                    <Col style={{height:'30px'}}></Col>
                </Row>
                <Row>
                    <Col style={{height:'30px'}}></Col>
                </Row>
                <Row>
                    <Col style={{color:'grey'}}>
                        Google play rating history
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Stars starsData={starsData}></Stars>
                    </Col>
                </Row>
                <Row>
                    <Col  lg={7}>
                        <Container >
                            <Row>
                                <Col>
                                    <HistoryChart historyRatingData={historyRatingData}></HistoryChart>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{fontSize:'12px'}}>
                                    {historyRatingData.categories[0]}   
                                </Col>
                                <Col style={{textAlign:'right',fontSize:'12px'}}>
                                    {historyRatingData.categories[historyRatingData.categories.length-1]}
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col lg={5} style={{height:'350px'}}>
                        <RatingBar historyRatingBar={historyRatingBar}></RatingBar>
                    </Col>
                </Row>
                <Row>
                    <Col style={{height:'30px'}}></Col>
                </Row>
                <Row>
                    <Col style={{height:'60px'}}></Col>
                </Row>
            </Container>
        </React.Fragment>
        )
    }
}

export default apps
