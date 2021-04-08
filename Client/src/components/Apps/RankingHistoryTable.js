import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'reactstrap'
import RankingHistoryRow from './RankingHistoryRow'
import '../../css/apps.css'

class RankingHistoryTable extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            rankingHistoryData:this.props.rankingHistoryData,
            rankingHistoryDataPlus:[],
            showPLus:false,
            showMinus:false,
        }
    }
    
    componentDidMount(){
        if(this.state.rankingHistoryData.length>10)
        {
            this.setState({
                showPlus:true
            })
            this.setState({
                rankingHistoryData:this.state.rankingHistoryData.slice(0,10),
                rankingHistoryDataPlus:this.state.rankingHistoryData.slice(10,this.state.rankingHistoryData.lenght),
            })
        }
    }

    addRankingHistoryDataPlus=()=>{
        this.setState({
            rankingHistoryData:this.state.rankingHistoryData.concat(this.state.rankingHistoryDataPlus),
            showPlus:false,
            showMinus:true
        })
    }
    
    addRankingHistoryDataMinus=()=>{
        this.setState({
            rankingHistoryData:this.state.rankingHistoryData.slice(0, 10),
            showPlus:true,
            showMinus:false
        })
    }
    hideComponent(name) {
        switch (name) {
          case "showPlus":
            this.setState({ showPlus: !this.state.showPlus });
            break;
          case "showMinus":
            this.setState({ showMinus: !this.state.showMinus });
            break;
          default:
              return null
        }
    }

    render() {
        const {showPlus,showMinus}=this.state
        return (
           
                <table style={{width:'100%',height:'200px'}}><tbody>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{textAlign:'left',fontSize:'15px',color:'grey'}}>Top ranking</td>
                    </tr>
                    <tr>
                    <td>
                
                <Table striped bordered hover responsive >
                    <thead>
                    <tr style={{backgroundColor:"#ff8041"}}>
                        <th>Rank</th>
                        <th>Country</th>
                        <th>Category</th>
                        <th>List</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.rankingHistoryData.map((item,index)=>
                                <tr  key={index}>
                                    <RankingHistoryRow rank={item.rank} country={item.country} category={item.category} list={item.list}></RankingHistoryRow>
                                </tr> 
                            )
                        }
                    </tbody>
                </Table>
                </td></tr>
                <tr>
                            <td style={{textAlign:'left'}}>{showPlus && <span className='showHide' style={{marginLeft:'50px'}} onClick={this.addRankingHistoryDataPlus}>Show full Table</span>}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign:'left'}}>{showMinus && <span className='showHide' style={{marginLeft:'50px'}} onClick={this.addRankingHistoryDataMinus}>Hide full Table</span>}</td>
                        </tr>
                </tbody></table>
           
        )
    }
}

export default RankingHistoryTable
