import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import '../../css/Forms.css'
import   {withRouter} from 'react-router-dom'



export class ChoosePages extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             numberApps:0,
             pages:[],
             showNext:false,
             showPrev:false,
             showChooseApps:true,
             page:'1',
             isNextPage:false
        }
    }

    async componentDidMount(){
        if(window.history.state.state===undefined || window.history.state.state===null)
        {
            this.props.history.push('/filter',{page:'1',showP: false,showCat:false,showTc:false,showD:false,showRat:false,showAd:false,showPr:false,showRd:false})
        }
        else{
            this.setState({
                page:window.history.state.state.page
            })
        }
    }

    componentDidUpdate(PrevState,PrevProps){
        if(this.state.isNextPage!==this.props.isNextPage){
                this.setState({
                    isNextPage:this.props.isNextPage
                })
                    this.setState({
                        showChooseApps:true
                    })
                    if(this.props.isNextPage===false)
                        {
                        this.setState({
                            pages:['1']
                        },()=>{
                            this.setState({ showPrev: false })
                            this.setState({ showNext: false })
                        })
                    }
                    else{
                        let page=this.state.page
                        this.setState({
                            pages:[page]
                        },()=>{
                            if(page==='1')
                            {
                                this.setState({ showPrev: false })
                                this.setState({ showNext: true })
                            }
                            else{
                                this.setState({ showPrev: true })
                                this.setState({ showNext: true })
                            }
                        })
                    }
                    }
        if(this.state.numberApps!==this.props.numberApps)
            {
                this.setState({
                    numberApps:this.props.numberApps
                },()=>{
                    if(this.props.numberApps===0)
                    {
                        this.setState({
                            showChooseApps:false
                        })
                    }
                })

            }
    }


    async ButHandler(page){
        await this.setState({
            page:page
        })
        await this.props.data.ChangePage(this.state.page)
        await this.props.history.push('/filter',{page:page,showP: this.props.showP,showCat:this.props.showCat,showTc:this.props.showTc,showD:this.props.showD,showRat:this.props.showRat,showAd:this.props.showAd,showPr:this.props.showPr,showRd:this.props.showRd})
        await window.location.reload(false);
    }


    
    render() {
        const { page} = this.state;
        const { showNext,showPrev,showChooseApps}=this.state
        return (
            <div>
                <table><tbody>
                        <tr>
                            <td width="940px"></td>
                            <td><ButtonToolbar aria-label="Toolbar with button groups">
                                    <ButtonGroup className="mr-2" aria-label="First group">
                                        {showPrev && showChooseApps && <Button variant="warning" onClick={() => this.ButHandler(String(parseInt(page)-1))}>Prev</Button>}                      
                                        {showChooseApps &&
                                            this.state.pages.map((element,index)=>
                                                <Button  onClick={() => this.ButHandler(element)} variant="warning"  key={index} active={ element === page ? true :false}>{element}</Button>
                                            )
                                        } 
                                        {showChooseApps && showNext && <Button variant="warning" onClick={() => this.ButHandler(String(parseInt(page)+1))}>Next</Button>}
                                    </ButtonGroup>
                            </ButtonToolbar></td>
                            <td width="18px"></td>
                        </tr>
                        </tbody></table>
            </div>
        )
    }
}

export default withRouter(ChoosePages)