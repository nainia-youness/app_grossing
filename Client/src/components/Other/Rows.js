import React from 'react'
import Row from './Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'reactstrap'
import "../../css/table.css"
import   {withRouter} from 'react-router-dom'

function Rows(props) {
  const {rows}=props
  return (
    <>
        <Table striped bordered hover responsive className="position" style={{width:'100 %'}} >
            <thead>
              <tr style={{backgroundColor:"#ff9333"}}>
                <th>Ranking</th>
                <th>Logo</th>
                <th>Title</th>
                <th>Dowloads</th>
                <th>Review</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
                {//here it s better for the key to be the matricule of the app later
                    rows.map((appObject,index)=>{
                    return <Row  key={index} packagename={appObject.packagename}  devName={appObject.developername}  rank={appObject.rank} logo={appObject.imageurl} title={appObject.title} download={appObject.downloadtraced} reviews={appObject.ratingcount} rating={appObject.starrating}></Row>//Math.round(appObject.starrating*100)/100
                })}
            </tbody>
        </Table>
    </>
  )
}

export default withRouter(Rows)
