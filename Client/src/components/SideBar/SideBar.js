import React,{Component} from "react";
import {Nav} from "react-bootstrap";
import {Container,FormControl, Row, Col, Card, Form, Button } from "react-bootstrap";
import Rows from '../Rows'
import Search from './Search'
import Published from './Published'
import Category from './Category'
import ReleasedDate from './ReleasedDate'
import Adds from './Adds'
import Price from './Price'
import Rating from './Rating'
import Downloads from './Downloads'
import TopChart from './TopChart'
import  '../../index.css'


class SideBar extends Component  {

    constructor(props) {
        super(props)
    
        this.state = {
            search:'',
            searchChoice:'title',
            publishedChoice:'published',
            appChoice:true,
            gameChoice:true,
            appCategoryChoice:[
                {isChecked:true,value:'Art and Design',id:0},
                {isChecked:true,value:'Auto and Vehicule',id:1},
                {isChecked:true,value:'Beauty',id:2},
                {isChecked:true,value:'Books and Reference',id:3},
              ],
            gameCategoryChoice:[
               {isChecked:true,value:'Art and Design',id:1},
               {isChecked:true,value:'Auto and Vehicule',id:2},
               {isChecked:true,value:'Beauty',id:3},
               {isChecked:true,value:'Books and Reference',id:4},
             ],
             releasedDateChoice:'any',
             priceChoice:'freeAndPaid',
             addChoice:'both',
             upperRating:'5.0',
             lowerRating:'0.0',
             upperNumberRating:'100000000',
             lowerNumberRating:'0',
             ratingError:'',
             numberRatingError:'',
             upperDownload:'10000000',
             lowerDownload:'0', 
             downloadError:'',
             topChart:'Any list',
             country:'anyCountry',
             category:'anyCategory',
             upperRanking:'600',
             lowerRanking:'0',
             errorRanking:'',
             numberApps:'12',

            showTopChart:false,
            showDownload:false,
            showRating:false,
            showAdd:false,
            showPrice:false,
            showReleaseDate:false,
            showPublished:false,
            showSearch:false,
            showCategory:false
        }
        this.changeSearch=this.changeSearch.bind(this)
    }
    
    
    changeSearchChoice(item)
    {
        this.setState({
            searchChoice:item
        })
    }

    changeAddChoice(item)
    {
        this.setState({
            addChoice:item
        })
    }

    changeTopChartChoice(item)
    {
        this.setState({
            topChart:item
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

    changeRankingErrorChoice(item)
    {
        this.setState({
            rankingError:item
        })
    }

    changeUpperRankingChoice(item)
    {
        this.setState({
            upperRanking:item
        })
    }
    changeLowerRankingChoice(item)
    {
        this.setState({
            lowerRanking:item
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
        this.setState({
            publishedChoice:item
        })
    }

    changeUpperRatingChoice(item)
    {
        this.setState({
            upperRating:item
        })
    }
    changeLowerRatingChoice(item)
    {
        this.setState({
            lowerRating:item
        })
    }

    changeUpperDownloadChoice(item)
    {
        this.setState({
            upperDownload:item
        })
    }
    changeLowerDownloadChoice(item)
    {
        this.setState({
            lowerDownload:item
        })
    }
    changeLowerNumberRatingChoice(item)
    {
        this.setState({
            lowerNumberRating:item
        })
    }
    changeUpperNumberRatingChoice(item)
    {
        this.setState({
            upperNumberRating:item
        })
    }

    changePriceChoice(item)
    {
        this.setState({
            priceChoice:item
        })
    }

    changeAppChoice(item)
    {
        this.setState({
            appChoice:item
        })
    }

    changeGameChoice(item)
    {
        this.setState({
            gameChoice:item
        })
    }

    changeReleasedDateChoice(item)
    {
        this.setState({
            releasedDateChoice:item
        })
    }

    changeCategoryGameChoice(item)
    {
        this.setState({
            gameCategoryChoice:item
        })
    }

    changeCategoryAppChoice(item)
    {
        this.setState({
            appCategoryChoice:item
        })
    }


    hideComponent(name) {
        switch (name) {
          case "showSearch":
            this.setState({ showSearch: !this.state.showSearch });
            break;
          case "showPublished":
            this.setState({ showPublished: !this.state.showPublished });
            break;
          case "showCategory":
                this.setState({ showCategory: !this.state.showCategory });
                break;
          case "showReleaseDate":
                this.setState({ showReleaseDate: !this.state.showReleaseDate });
                break;
          case "showPrice":
                this.setState({ showPrice: !this.state.showPrice });
                break;
          case "showAdd":
                this.setState({ showAdd: !this.state.showAdd });
                break;
          case "showRating":
                this.setState({ showRating: !this.state.showRating });
                break;
          case "showDownload":
                this.setState({ showDownload: !this.state.showDownload });
                break;
          case "showTopChart":
                this.setState({ showTopChart: !this.state.showTopChart });
                break;
        }
      }

    changeSearch(e) {
        e.preventDefault();

        this.setState({
            search: e.target.value
        });
    }

      

  render(){
    const { showTopChart,showSearch,showPublished,showCategory,showReleaseDate,showPrice,showAdd,showRating,showDownload} = this.state;
    
    return (
      <>
      <Container fluid>
             <Row>
                 <Col xs={2} id="sidebar-wrapper">      
                    <Nav className="col-md-12 d-none d-md-block sidebar" style={{backgroundColor:"#ffddbb"}}>
                    <div className="sidebar-sticky"></div>
                        <Nav.Item>
                              <FormControl type="text" placeholder="Search for apps" onChange={this.changeSearch} value={this.state.search} onClick={() => this.hideComponent("showSearch")} className="mr-sm-2" style={{position:"absolute",left: "0.7px",top:"5px"}}></FormControl>
                        </Nav.Item>

                        <Nav.Item>
                            {showSearch && <Search data={
                                {unit:this.state.searchChoice,ChangeSearchChoice:this.changeSearchChoice.bind(this)}}/>}
                        </Nav.Item>

                        <Nav.Item>

                        <a className="filters" onClick={() => this.hideComponent("showPublished")}>Published</a>
                        </Nav.Item>

                        <Nav.Item>
                            {showPublished && <Published data={
                                {app:this.state.publishedChoice,ChangePublishedChoice:this.changePublishedChoice.bind(this)}}/>}
                        </Nav.Item>
                        

                        <Nav.Item>
                            <a className="filters" onClick={() => this.hideComponent("showCategory")} >Category</a>
                        </Nav.Item>


                        <Nav.Item>
                            {showCategory && <Category data={
                                {appCategory:this.state.appCategoryChoice,gameCategory:this.state.gameCategoryChoice,app:this.state.appChoice,game:this.state.gameChoice,ChangeAppChoice:this.changeAppChoice.bind(this),ChangeGameChoice:this.changeGameChoice.bind(this),ChangeCategoryGameChoice:this.changeCategoryGameChoice.bind(this),ChangeCategoryAppChoice:this.changeCategoryAppChoice.bind(this)}}/>}
                        </Nav.Item>

                        <Nav.Item>
                            <a className="filters" onClick={() => this.hideComponent("showReleaseDate")} >Released Date</a>
                        </Nav.Item>

                        <Nav.Item>
                            {showReleaseDate && <ReleasedDate data={
                                {releaseDate:this.state.releasedDateChoice,ChangeReleasedDateChoice:this.changeReleasedDateChoice.bind(this)}}/>}
                        </Nav.Item>

                        <Nav.Item>
                            <a className="filters" onClick={() => this.hideComponent("showPrice")} >Price</a>
                        </Nav.Item>

                        <Nav.Item>
                            {showPrice && <Price data={
                                {price:this.state.priceChoice,ChangePriceChoice:this.changePriceChoice.bind(this)}}/>}
                        </Nav.Item>

                        <Nav.Item>
                            <a className="filters" onClick={() => this.hideComponent("showAdd")} >Contains Ads</a>
                        </Nav.Item>

                        <Nav.Item>
                            {showAdd && <Adds data={
                                {add:this.state.addChoice,ChangeAddChoice:this.changeAddChoice.bind(this)}}/>}
                        </Nav.Item>

                        <Nav.Item>
                            <a className="filters" onClick={() => this.hideComponent("showRating")} >Rating</a>
                        </Nav.Item>

                        <Nav.Item>
                            {showRating && <Rating data={
                                {Re:this.state.ratingError,ChangeRatingErrorChoice:this.changeRatingErrorChoice.bind(this),Nre:this.state.numberRatingError,ChangeNumberRatingErrorChoice:this.changeNumberRatingErrorChoice.bind(this),Ur:this.state.upperRating,ChangeUpperRatingChoice:this.changeUpperRatingChoice.bind(this),Lr:this.state.lowerRating,ChangeLowerRatingChoice:this.changeLowerRatingChoice.bind(this),Unr:this.state.upperNumberRating,ChangeUpperNumberRatingChoice:this.changeUpperNumberRatingChoice.bind(this),Lnr:this.state.lowerNumberRating,ChangeLowerNumberRatingChoice:this.changeLowerNumberRatingChoice.bind(this)}}/>}
                        </Nav.Item>

                        <Nav.Item>
                            <a className="filters" onClick={() => this.hideComponent("showDownload")} >Downloads</a>
                        </Nav.Item>

                        <Nav.Item>
                            {showDownload && <Downloads data={
                                {De:this.state.downloadError,ChangeDownloadErrorChoice:this.changeDownloadErrorChoice.bind(this),Ud:this.state.upperDownload,ChangeUpperDownloadChoice:this.changeUpperDownloadChoice.bind(this),Ld:this.state.lowerDownload,ChangeLowerDownloadChoice:this.changeLowerDownloadChoice.bind(this)}}/>}
                        </Nav.Item>

                        <Nav.Item>
                            <a className="filters" onClick={() => this.hideComponent("showTopChart")} >Top Charts</a>
                        </Nav.Item>

                        <Nav.Item>
                            {showTopChart && <TopChart data={
                                {er:this.state.rankingError,ChangeRankingErrorChoice:this.changeRankingErrorChoice.bind(this),Ur:this.state.upperRanking,ChangeUpperRankingChoice:this.changeUpperRankingChoice.bind(this),Ld:this.state.lowerRanking,ChangeLowerRankingChoice:this.changeLowerRankingChoice.bind(this),topC:this.state.topChart,ChangeTopChartChoice:this.changeTopChartChoice.bind(this),ca:this.state.category,ChangeCategoryChoice:this.changeCategoryChoice.bind(this),co:this.state.country,ChangeCountryChoice:this.changeCountryChoice.bind(this)}}/>}
                        </Nav.Item>
                        </Nav>
                 </Col>
                 <Col  xs={10} id="page-content-wrapper">
                 <Button variant="warning">Confirm</Button> <span style={{color:'grey',marginLeft:"30px"}}>{this.state.numberApps} Apps match</span>
                     <Rows></Rows>

                 </Col> 
             </Row>
         </Container>
     </>


  
                );}
              };

export default SideBar