import React from 'react'
import Row from './Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'reactstrap'
import "../../../css/table.css"
import   {withRouter} from 'react-router-dom'


function Rows(props) {
  const {rows,theHeaders}=props
  return (
    <>
        <Table striped bordered hover responsive className="position" style={{width:'100 %'}} >
            <thead>
              <tr style={{backgroundColor:"#ff9333"}}>
                {
                  theHeaders.map((header,index)=>{
                    return <th key={index}>{header}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
                {
                    rows.map((appObject,index)=>{
                      return <Row  key={index} packagename={appObject.packagename}  devName={appObject.developername}  rank={appObject.rank} logo={appObject.imageurl} title={appObject.title} download={appObject.downloadtraced} reviews={appObject.ratingcount} rating={appObject.starrating}></Row>
                    })
                }
            </tbody>
        </Table>
    </>
  )
}

export default withRouter(Rows)
