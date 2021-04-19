import React, { Component } from 'react'
import Row from './Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'reactstrap'
import "../../../css/table.css"
import   {withRouter} from 'react-router-dom'




class Rows extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      headerColors:{
        Title:'#ff9333',
        Logo:'#ff9333',
        Category:'#ff9333',
        Rank:'#ff9333',
        Downloads:'orange',
        Review:'#ff9333',
        Rating:'#ff9333'
      },
      orderBy:'downloads',
    }
    this.handleHeaderColor=this.handleHeaderColor.bind(this)
  }
  
  findPrevOrderHeader(){
    for (const header in this.state.headerColors){
      if(this.state.headerColors[header]=="orange")
        return header
    }
    return null
  }

  async handleHeaderColor(header){   
    if(header==="Title" || header==="Logo" || header==="Category")
      return
    let newColor
    let prevOrderHeaderColor='#ff9333'
    let order='downloads'
    if(this.state.headerColors[header]==='#ff9333')  
      {
        newColor='orange'
        order=header
      }
    else
    {
      newColor='#ff9333'
      prevOrderHeaderColor='orange'
    }
    let prevOrderHeader=this.findPrevOrderHeader();
    this.state.headerColors[header]=newColor;
    this.state.headerColors[prevOrderHeader]=prevOrderHeaderColor;
    await this.setState({
      orderBy:order,
    })
    await this.props.data.ChangeOrderChoice(this.state.orderBy)
    await this.props.render()
  }

  render() {
    const {rows,theHeaders,showOrderByHeader}=this.props
    let {headerColors}=this.state
    return (
        <>
            <Table striped bordered hover responsive className="position" style={{width:'100 %'}} >
                <thead>
                  <tr style={{backgroundColor:"#ff9333"}}>
                    {!showOrderByHeader &&
                      theHeaders.map((header,index)=>{
                        return <th key={index}>{header}</th>
                      })
                    }
                    {showOrderByHeader &&
                      theHeaders.map((header,index)=>{
                        return <th key={index} style={{backgroundColor:headerColors[header]}} onClick={() => this.handleHeaderColor(header)}>{header}</th>
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                    {
                        rows.map((appObject,index)=>{
                          return <Row  key={index} category={appObject.category} packagename={appObject.packagename}  devName={appObject.developername}  rank={appObject.rank} logo={appObject.imageurl} title={appObject.title} download={appObject.downloadtraced} reviews={appObject.ratingcount} rating={appObject.starrating}></Row>
                        })
                    }
                </tbody>
            </Table>
        </>
    )
  }
}

export default withRouter(Rows)