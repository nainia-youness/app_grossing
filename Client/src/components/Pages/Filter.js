import React,{Component} from "react";
import {Container,FormControl, Row, Col,Button,Form } from "react-bootstrap";
import Rows from '../Other/Table/Rows'
import Search from '../SideBar/Search'
import Published from '../SideBar/Published'
//import Category from '../SideBar/Category'
import ReleasedDate from '../SideBar/ReleasedDate'
import Adds from '../SideBar/Adds'
import Price from '../SideBar/Price'
import Rating from '../SideBar/Rating'
import Downloads from '../SideBar/Downloads'
import TopChart from '../SideBar/TopChart'
import  '../../index.css'
import TheHeader from '../Header/TheHeader'
import ChoosePages from '../SideBar/ChoosePages'
import axios from 'axios'
import Auth from '../Auth/Auth'
import {reactLocalStorage} from 'reactjs-localstorage';
import ClipLoader from "react-spinners/ClipLoader";


class Filter extends Component  {

    constructor(props) {
        super(props)
        this.state = {
            
            post:{
                searchChoice:'title',
                search:'',
                publishedChoice:'published',
                //appChoice:true,
                //gameChoice:true,
                releasedDateChoice:'any',
                priceChoice:'freeAndPaid',
                addChoice:'both',
                upperRating:'5.0',
                lowerRating:'0.0',
                upperNumberRating:'100000000',
                lowerNumberRating:'0',
                upperDownload:'10000000',
                lowerDownload:'0', 
                topChart:'Top New Free',
                country:'Morocco',
                category:'All Apps',
                upperRanking:'600',
                lowerRanking:'0',
                showTopChart:false,
                showDownload:false,
                showRating:false,
                showAdd:false,
                showPrice:false,
                showReleaseDate:false,
                showPublished:false,
                showSearch:false,
                //showCategory:showCat,
                page:'1',
                orderBy:'downloads'
        },
        numberRatingError:'',
        downloadError:'',
        ratingError:'',
        errorRanking:'',
        error:'',
        isNextPage:false,

             rows:[],
             numberApps:100,//this and row you ll get tehm from server
             h:'',
             isAppFound:'',

            loading: true,

        }
        this.changeSearch=this.changeSearch.bind(this)
    }
    
    async componentDidMount(){

            if(window.history.state===undefined || window.history.state===null)
            {
                console.log('reseting state')
                await this.props.history.push('/filter',{page: '1',showP: false,showCat:false,showTc:false,showD:false,showRat:false,showAd:false,showPr:false,showRd:false})
            }
            else{
                if(window.history.state.state===undefined || window.history.state.state===null)
                    await this.props.history.push('/filter',{page: '1',showP: false,showCat:false,showTc:false,showD:false,showRat:false,showAd:false,showPr:false,showRd:false})
                    else
                    {
                        console.log('changing states')
                        await this.setState({
                            post:{
                                page:window.history.state.state.page,
                                showPublished: window.history.state.state.showP,
                                showCategory:window.history.state.state.showCat,
                                showTopChart:window.history.state.state.showTc,
                                showDownload:window.history.state.state.showD,
                                showRating:window.history.state.state.showRat,
                                showAdd:window.history.state.state.showAd,
                                showPrice:window.history.state.state.showPr,
                                showReleaseDate:window.history.state.state.showRd,
                                searchChoice:'title',
                                search:'',
                                publishedChoice:'published',
                                releasedDateChoice:'any',
                                priceChoice:'freeAndPaid',
                                addChoice:'both',
                                upperRating:'5.0',
                                lowerRating:'0.0',
                                upperNumberRating:'100000000',
                                lowerNumberRating:'0',
                                upperDownload:'10000000',
                                lowerDownload:'0', 
                                topChart:'Top New Free',
                                country:'Morocco',
                                category:'All Apps',
                                upperRanking:'600',
                                lowerRanking:'0',
                                showSearch:false,
                                orderBy:'downloads'
                            }
                        })
                    }
            }

            await Auth(reactLocalStorage.getObject('user').token)
            await axios.post('/filter',this.state.post)
                .then(res=>{
                    //console.log(res)
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
                .finally(()=>
                {
                    this.setState({
                        loading:false
                    })
                    if(this.state.rows.length<8)
                    {
                        this.setState({
                            h:'1500px'
                        })
                    }
                    else
                    {
                        this.setState({
                            h:''
                        })
                    }
                    if(this.state.rows.length===0)
                    {
                        this.setState({
                            isAppFound:'NO APP FOUND'
                        })
                    }
                    else{
                        this.setState({
                            isAppFound:''
                        })
                    }
                }
                )
               
 
    }

    submitHandler=()=>{
        this.setState({
            loading:true
        })
        if(((this.state.numberRatingError!=='' || this.state.ratingError!=='') && this.state.post.showRating) ||  ((this.state.downloadError!=='') && (this.state.post.showDownload))  || ((this.state.errorRanking!=='')&&(this.state.post.showTopChart)))
        {
            this.setState({
                error:'there is an error, try to solve it',
                loading:false
            })
        }
        else{
            this.setState({
                error:'',
            })
            Auth(reactLocalStorage.getObject('user').token)
            axios.post('/filter',this.state.post)
            .then(res=>{
                //console.log(res)
                this.setState({
                    rows:res.data.data
                })

            })
            .catch(err=>{
                console.log(err)
                if(err.response!==undefined){
                    if(err.response.status === 401)
                    {
                        if(err.response.data.message==='No valid token provided or expired')
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
            .finally(()=>
            {
                this.setState({
                    loading:false
                }) // stop spinner (in response/error)
                if(this.state.rows.length<8)
                {
                    this.setState({
                        h:'1500px'
                    })
                }
                else
                {
                    this.setState({
                        h:''
                    })
                }
                if(this.state.rows.length===0)
                {
                    this.setState({
                        isAppFound:'NO APP FOUND'
                    })
                }
                else{
                    this.setState({
                        isAppFound:''
                    })
                }
            }
            )
            
            this.setState({
                error:'',
            })

        }
      }

    changeSearchChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.searchChoice = item;                                     
            return { post };                                
          })
    }

    changeAddChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.addChoice = item;                                     
            return { post };                                
          })
    }

    changeTopChartChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.topChart = item;                                     
            return { post };                                
          })
    }

    changeCountryChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.country = item;                                     
            return { post };                                
        })
    }

    changeCategoryChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.category = item;                                     
            return { post };                                
        })
    }

    changeRankingErrorChoice(item)
    {
        this.setState({
            errorRanking:item
        })
    }

    changeUpperRankingChoice(item)
    {
        if(item==="")
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.upperRanking = "600";                                     
                return { post };                                
            })
        else
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.upperRanking = item;                                     
                return { post };                                
            })       
    }
    changeLowerRankingChoice(item)
    {
        if(item==="")
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.lowerRanking = "0";                                     
                return { post };                                
            })
        else
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.lowerRanking = item;                                     
                return { post };                                
            })
    }

    changeRatingErrorChoice(item)
    {
        this.setState({
            ratingError:item
        })
    }

    changeDownloadErrorChoice(item)
    {
        this.setState({
            downloadError:item
        })
    }

    changeNumberRatingErrorChoice(item)
    {
        this.setState({
            numberRatingError:item
        })
    }

    changePublishedChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.publishedChoice = item;                                     
            return { post };                                
        })
    }

    changeUpperRatingChoice(item)
    {
        if(item==="")
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.upperRating = "5.0";                                     
                return { post };                                
            })
        else
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.upperRating = item;                                     
                return { post };                                
            })
    }
    changeLowerRatingChoice(item)
    {
        if(item==="")
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.lowerRating = "0";                                     
                return { post };                                
            })
        else
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.lowerRating = item;                                     
                return { post };                                
            })        
    }

    changeUpperDownloadChoice(item)
    {
        if(item==='')
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.upperDownload = "10000000";                                     
                return { post };                                
            })
        else
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.upperDownload = item;                                     
                return { post };                                
            })
    }
    changeLowerDownloadChoice(item)
    {
        if(item==="")
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.lowerDownload = "0";                                     
                return { post };                                
            })
        else
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.lowerDownload = item;                                     
                return { post };                                
            })
    }
    changeLowerNumberRatingChoice(item)
    {
        if(item==='')
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.lowerNumberRating = "0";                                     
                return { post };                                
            })
        else
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.lowerNumberRating = item;                                     
                return { post };                                
            })
    }
    changeUpperNumberRatingChoice(item)
    {
        if(item==="")
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.upperNumberRating = "100000000";                                     
                return { post };                                
            })
        else
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.upperNumberRating = item;                                     
                return { post };   })
    }

    changePriceChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.priceChoice = item;                                     
            return { post };                                
        })
    }

    changeAppChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.appChoice = item;                                     
            return { post };                                
        })
    }

    changeGameChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.gameChoice = item;                                     
            return { post };                                
        })
    }
    changeOrderChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.orderBy = item;                                     
            return { post };                                
        })
    }

    changeReleasedDateChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.releasedDateChoice = item;                                     
            return { post };                                
        })
    }

    changeCategoryGameChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.gameCategoryChoice = item;                                     
            return { post };                                
        })
    }

    changeCategoryAppChoice(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.appCategoryChoice = item;                                     
            return { post };                                
        })
    }


    hideComponent(name) {
        switch (name) {
          case "showSearch":
            this.setState(prevState => {
                let post = Object.assign({}, prevState.post); 
                post.showSearch = !prevState.post.showSearch;                                     
                return { post };                                
            })
            break;
          default:
              return null
        }
      }

    changeSearch(e) {
        e.preventDefault();
        let a=e.target.value
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.search = a;                                     
            return { post };                                
        })
    }

    showPublishedHandler=() =>{
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.showPublished= !prevState.post.showPublished;                                     
            return { post };                                
          })
    }
    showCategoryHandler=() =>{
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.showCategory= !prevState.post.showCategory;                                     
            return { post };                                
          })
    }
    showReleaseDateHandler=() =>{
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.showReleaseDate= !prevState.post.showReleaseDate;                                     
            return { post };                                
          })
    }
    showPriceHandler=() =>{
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.showPrice= !prevState.post.showPrice;                                     
            return { post };                                
          })
    }
    showAddHandler=() =>{
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.showAdd= !prevState.post.showAdd;                                     
            return { post };                                
          })
    }
    showRatingHandler=() =>{
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.showRating= !prevState.post.showRating;                                     
            return { post };                                
          })
    }
    showDownloadHandler=() =>{
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.showDownload= !prevState.post.showDownload;                                     
            return { post };                                
          })
    }
    showTopChartHandler=() =>{
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.showTopChart= !prevState.post.showTopChart;                                     
            return { post };                                
          })

    }
    changePage(item)
    {
        this.setState(prevState => {
            let post = Object.assign({}, prevState.post); 
            post.page = item;                                     
            return { post };                                
        })
    }

  render(){
    const { showTopChart,showSearch,showPublished,showReleaseDate,showPrice,showAdd,showRating,showDownload} = this.state.post;
    return (
      <>

                    <Container fluid>
                        <Row>
                            <Col><TheHeader></TheHeader></Col>
                        </Row>
                        <Container fluid>
                            <Row>
                                <Col style={{height:'57px'}}></Col>
                            </Row>
                            <Row>
                                <Col lg={12} md={12} xl={2} style={{backgroundColor:"#ffddbb",height:this.state.h}}>
                                    <Container fluid>
                                    <Row>
                                        <Col style={{height:'10px'}}></Col>
                                    </Row>
                                        <Row>
                                            <Col>
                                                <FormControl type="text" onClick={() => this.hideComponent("showSearch")} placeholder="Search for apps" onChange={this.changeSearch} value={this.state.post.search}  className="mr-sm-2" ></FormControl>
                                            </Col>                                            
                                        </Row>
                                        <Row>
                                        <Col>
                                                {showSearch && <Search data={
                                                {unit:this.state.searchChoice,ChangeSearchChoice:this.changeSearchChoice.bind(this)}}/>}
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Container fluid >
                                                <Row>
                                                    <Col style={{height:'3px'}}></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Check className="radio"  style={{fontSize:'15px',color:'orangered'}}
                                                        value="Fpublished"
                                                        checked={showPublished}
                                                        onChange={this.showPublishedHandler}
                                                        type="checkbox"
                                                        label='Published'
                                                        name="Fpublished"
                                                        id="Fpublished"
                                                        custom
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row>

                                        <Row>
                                            <Col>
                                                {showPublished && <Published data={
                                                {app:this.state.publishedChoice,ChangePublishedChoice:this.changePublishedChoice.bind(this)}}/>}
                                            </Col>
                                        </Row>    

                                        <Row>
                                            <Container fluid >
                                                <Row>
                                                    <Col style={{height:'3px'}}></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Check className="radio"  style={{fontSize:'15px',color:'orangered'}}
                                                        value="FreleaseDate"
                                                        checked={showReleaseDate}
                                                        onChange={this.showReleaseDateHandler}
                                                        type="checkbox"
                                                        label='Released Date'
                                                        name="FreleaseDate"
                                                        id="FreleaseDate"
                                                        custom
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row> 

                                        <Row>
                                            <Col>
                                                {showReleaseDate && <ReleasedDate data={
                                                {releaseDate:this.state.releasedDateChoice,ChangeReleasedDateChoice:this.changeReleasedDateChoice.bind(this)}}/>}
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Container fluid >
                                                <Row>
                                                    <Col style={{height:'3px'}}></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Check className="radio"  style={{fontSize:'15px',color:'orangered'}}
                                                        value="FPrice"
                                                        checked={showPrice}
                                                        onChange={this.showPriceHandler}
                                                        type="checkbox"
                                                        label='Price'
                                                        name="FPrice"
                                                        id="FPrice"
                                                        custom
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row> 
                                     <Row>
                                            <Col>
                                                {showPrice && <Price data={
                                                {price:this.state.priceChoice,ChangePriceChoice:this.changePriceChoice.bind(this)}}/>}
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Container fluid >
                                                <Row>
                                                    <Col style={{height:'3px'}}></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Check className="radio"  style={{fontSize:'15px',color:'orangered'}}
                                                        value="FAdd"
                                                        checked={showAdd}
                                                        onChange={this.showAddHandler}
                                                        type="checkbox"
                                                        label='Contains Ads'
                                                        name="Fadd"
                                                        id="Fadd"
                                                        custom
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row> 
                                     <Row>
                                     </Row>
                                      
                                        <Row>
                                            <Col>
                                                {showAdd && <Adds data={
                                                {add:this.state.addChoice,ChangeAddChoice:this.changeAddChoice.bind(this)}}/>}
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Container fluid >
                                                <Row>
                                                    <Col style={{height:'3px'}}></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Check className="radio"  style={{fontSize:'15px',color:'orangered'}}
                                                        value="FRating"
                                                        checked={showRating}
                                                        onChange={this.showRatingHandler}
                                                        type="checkbox"
                                                        label='Rating'
                                                        name="FRating"
                                                        id="FRating"
                                                        custom
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row> 
                                        <Row>
                                            <Col>
                                                {showRating && <Rating data={
                                                {Re:this.state.ratingError,ChangeRatingErrorChoice:this.changeRatingErrorChoice.bind(this),Nre:this.state.numberRatingError,ChangeNumberRatingErrorChoice:this.changeNumberRatingErrorChoice.bind(this),Ur:this.state.upperRating,ChangeUpperRatingChoice:this.changeUpperRatingChoice.bind(this),Lr:this.state.lowerRating,ChangeLowerRatingChoice:this.changeLowerRatingChoice.bind(this),Unr:this.state.upperNumberRating,ChangeUpperNumberRatingChoice:this.changeUpperNumberRatingChoice.bind(this),Lnr:this.state.lowerNumberRating,ChangeLowerNumberRatingChoice:this.changeLowerNumberRatingChoice.bind(this)}}/>}
                                            </Col>
                                        </Row>
                                        
                                        <Row>
                                            <Container fluid >
                                                <Row>
                                                    <Col style={{height:'3px'}}></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Check className="radio"  style={{fontSize:'15px',color:'orangered'}}
                                                        value="FDownload"
                                                        checked={showDownload}
                                                        onChange={this.showDownloadHandler}
                                                        type="checkbox"
                                                        label='Downloads'
                                                        name="FDownload"
                                                        id="FDownload"
                                                        custom
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row> 
                                        <Row>
                                            <Col>
                                                {showDownload && <Downloads data={
                                                {De:this.state.downloadError,ChangeDownloadErrorChoice:this.changeDownloadErrorChoice.bind(this),Ud:this.state.upperDownload,ChangeUpperDownloadChoice:this.changeUpperDownloadChoice.bind(this),Ld:this.state.lowerDownload,ChangeLowerDownloadChoice:this.changeLowerDownloadChoice.bind(this)}}/>}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Container fluid >
                                                <Row>
                                                    <Col style={{height:'3px'}}></Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Form.Check className="radio"  style={{fontSize:'15px',color:'orangered'}}
                                                        value="FTopChart"
                                                        checked={showTopChart}
                                                        onChange={this.showTopChartHandler}
                                                        type="checkbox"
                                                        label='Top Charts'
                                                        name="FTopChart"
                                                        id="FTopChart"
                                                        custom
                                                        />
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Row> 

                                        <Row>
                                            <Col>
                                                {showTopChart && <TopChart data={
                                                {er:this.state.rankingError,ChangeRankingErrorChoice:this.changeRankingErrorChoice.bind(this),Ur:this.state.upperRanking,ChangeUpperRankingChoice:this.changeUpperRankingChoice.bind(this),Ld:this.state.lowerRanking,ChangeLowerRankingChoice:this.changeLowerRankingChoice.bind(this),topC:this.state.topChart,ChangeTopChartChoice:this.changeTopChartChoice.bind(this),ca:this.state.category,ChangeCategoryChoice:this.changeCategoryChoice.bind(this),co:this.state.country,ChangeCountryChoice:this.changeCountryChoice.bind(this)}}/>}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col lg={12} md={12} xl={10}>
                                    <Container  fluid >
                                        <Row>
                                            <Col>
                                                <Button variant="warning" onClick={this.submitHandler}>Confirm</Button> <span style={{color:'grey',marginLeft:"30px"}}>{this.state.numberApps} Apps match</span><span style={{color:'red',marginLeft:'100px'}}>{this.state.error}</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col  md={{offset: 5 }}>
                                                    <ClipLoader textAlign='center'
                                                            size={100}
                                                            color={"orange"}
                                                            loading={this.state.loading}
                                                        />
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col>
                                                <Rows showOrderByHeader={true} showDev={true} rows={this.state.rows}  render={this.submitHandler} theHeaders={["Logo","Title","Category","Downloads","Review","Rating"]}
                                                data={{order:this.state.post.orderBy,ChangeOrderChoice:this.changeOrderChoice.bind(this)}}></Rows>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{textAlign:'center',fontSize:'18px',color:'grey'}}>
                                                {this.state.isAppFound}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <ChoosePages 
                                                    showP= {this.state.post.showPublished}
                                                    showCat={this.state.post.showCategory}
                                                    showTc={this.state.post.showTopChart}
                                                    showD={this.state.post.showDownload}
                                                    showRat={this.state.post.showRating}
                                                    showAd={this.state.post.showAdd}
                                                    showPr={this.state.post.showPrice}
                                                    showRd={this.state.post.showReleaseDate}
                                                    isNextPage={this.state.isNextPage}
                                                    numberApps={this.state.numberApps}  data={
                                                        {page:this.state.post.page,ChangePage:this.changePage.bind(this)}}></ChoosePages>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
         
        </>
                );}
              };

export default Filter
