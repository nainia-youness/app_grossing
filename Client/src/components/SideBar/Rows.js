import React, { Component } from 'react'
import Row from './Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'reactstrap'
import "../../css/table.css"
import   {withRouter} from 'react-router-dom'


class Rows extends Component {

    constructor(props) {
      super(props)

      this.state = {
        titleColor:'#ff9333',
        logoColor:'#ff9333',
        categoryColor:'#ff9333',
        downloadsColor:'orange',
        reviewColor:'#ff9333',
        ratingColor:'#ff9333',
        orderBy:'downloads',
      }
      this.handleDownloads=this.handleDownloads.bind(this)
      this.handleReview=this.handleReview.bind(this)
      this.handleRating=this.handleRating.bind(this)
    }


    

    async handleDownloads(e) {    
      let savedEvent=e.currentTarget
      let newColor
      if(this.state.downloadsColor==='#ff9333')  
        newColor='orange'
      else
      {
        newColor='orange'
      }
      await this.setState({
        titleColor:'#ff9333',
        categoryColor:'#ff9333',
        downloadsColor:newColor,
        reviewColor:'#ff9333',
        ratingColor:'#ff9333',
        orderBy:'downloads'
      })
      await this.props.data.ChangeOrderChoice(this.state.orderBy)
      await this.props.render(savedEvent)
    }
    async handleReview(e) {    
      let dColor='#ff9333' 
      let newColor
      let order='downloads'
      let savedEvent=e.currentTarget
      if(this.state.reviewColor==='#ff9333')  
        {
          newColor='orange'
          order='review'
        }
      else
      {
        newColor='#ff9333'
        dColor='orange'
      }
      await this.setState({
        titleColor:'#ff9333',
        categoryColor:'#ff9333',
        downloadsColor:dColor,
        reviewColor:newColor,
        ratingColor:'#ff9333',
        orderBy:order
      })
      await this.props.data.ChangeOrderChoice(this.state.orderBy)
      await this.props.render(savedEvent)
    }

    async handleRating(e) {    
      let savedEvent=e.currentTarget
      let newColor
      let dColor='#ff9333'
      let order='downloads'
      if(this.state.ratingColor==='#ff9333')  
        {
          newColor='orange'
          order='rating'
        }
      else
      {
        newColor='#ff9333'
        dColor='orange'
      }
      await this.setState({
        titleColor:'#ff9333',
        categoryColor:'#ff9333',
        downloadsColor:dColor,
        reviewColor:'#ff9333',
        ratingColor:newColor,
        orderBy:order,
      })
      await this.props.data.ChangeOrderChoice(this.state.orderBy)
      await this.props.render(savedEvent)
    }

    render() {
        let rows=this.props.rows
        let {logoColor,titleColor,categoryColor,downloadsColor,reviewColor,ratingColor}=this.state
        let {showOrder}=this.props
        return (
            <Table striped bordered hover responsive className="position" style={{width:'100%',emptyCells: 'show'}}>
            <thead>
                {
                  showOrder &&
                  <tr >
                    <th style={{backgroundColor:logoColor}}>Logo</th>
                    <th style={{backgroundColor:titleColor}}>Title</th>
                    <th style={{backgroundColor:categoryColor}}>Category</th>
                    <th style={{backgroundColor:downloadsColor}} onClick={this.handleDownloads}>Dowloads</th>
                    <th style={{backgroundColor:reviewColor}} onClick={this.handleReview}>Review</th>
                    <th style={{backgroundColor:ratingColor}} onClick={this.handleRating}>Rating</th>
                  </tr>
                }
                {
                  !showOrder &&
                  <tr >
                    <th style={{backgroundColor:logoColor}}>Logo</th>
                    <th style={{backgroundColor:titleColor}}>Title</th>
                    <th style={{backgroundColor:categoryColor}}>Category</th>
                    <th style={{backgroundColor:downloadsColor}}>Dowloads</th>
                    <th style={{backgroundColor:reviewColor}}>Review</th>
                    <th style={{backgroundColor:ratingColor}}>Rating</th>
                  </tr>
                }
            </thead>
            <tbody>
                {
                    rows.map((appObject,index)=>{
                    return <Row  key={index} packagename={appObject.packagename}  showDev={this.props.showDev} devName={appObject.developername} category={appObject.category} logo={appObject.imageurl} title={appObject.title} download={appObject.downloadtraced} reviews={appObject.ratingcount} rating={appObject.starrating}></Row>
                })}
            </tbody>
          </Table>
        )
    }
}

export default withRouter(Rows)
