import React, { Component } from 'react'
import ChangeLogItem from './ChangeLogItem'
import {Container,Row, Col} from "react-bootstrap";
import '../../css/apps.css'

class ChangeLog extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            changeLogData:this.props.changeLogData.data,
            releasedDate:this.props.changeLogData.releasedDate,
            changeLogDataPlus:[],
            showPLus:false,
            showMinus:false,
        }
    }
    
    componentDidMount(){
        if(this.state.changeLogData.length>6)
        {
            this.setState({
                showPlus:true
            })
            this.setState({
                changeLogData:this.state.changeLogData.slice(0,6),
                changeLogDataPlus:this.state.changeLogData.slice(6,this.state.changeLogData.lenght),
            })
        }
    }

    addChangeLogDataPlus=()=>{
        this.setState({
            changeLogData:this.state.changeLogData.concat(this.state.changeLogDataPlus),
            showPlus:false,
            showMinus:true
        })
    }

    addChangeLogDataMinus=()=>{
        this.setState({
            changeLogData:this.state.changeLogData.slice(0, 6),
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
        const {showPlus,showMinus,releasedDate}=this.state
        return (
            <>
                <Container>
                    <Row>
                        <Col style={{color:'grey'}}>
                            {'Version History ('+releasedDate+')'}
                        </Col>
                    </Row>
                    {
                        this.state.changeLogData.map((item,index)=>
                                <Row key={index}>
                                        <Col><ChangeLogItem date={item.date} text={item.text} version={item.version}></ChangeLogItem></Col>
                                </Row>
                        )
                    }

                    <Row>
                        <Col >
                            {showPlus && <span style={{marginLeft:'50px'}} className='showHide' onClick={this.addChangeLogDataPlus}>show full Version History</span>}
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            {showMinus && <span style={{marginLeft:'50px'}} className='showHide' onClick={this.addChangeLogDataMinus}>Hide full Version History</span>}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default ChangeLog
