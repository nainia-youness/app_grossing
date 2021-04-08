import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

class OneCard extends Component {
    render() {
        return (
            <>
                <Alert style={{height:'6rem',textAlign:'center'}} variant='warning'><span style={{color:'#cc6600'}}>{this.props.name}: </span><br/><span style={{color:'grey'}}> {this.props.value}</span><br/><span style={{fontSize:'15px',color:'grey'}}>{this.props.plusValue}</span></Alert>
            </>
        )
    }
}

export default OneCard

