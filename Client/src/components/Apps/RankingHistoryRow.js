import React, { Component } from 'react'

class RankingHistoryRow extends Component {
    render() {
        return (

                <>
                        <td style={{fontSize:'15px'}}>{this.props.rank}</td>
                        <td style={{fontSize:'15px'}}> {this.props.country}</td>
                        <td style={{fontSize:'15px'}}>{this.props.category}</td>
                        <td style={{fontSize:'15px'}}>{this.props.list}</td>
                </>

        )
    }
}

export default RankingHistoryRow
