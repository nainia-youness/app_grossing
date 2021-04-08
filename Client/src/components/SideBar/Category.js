import React, { Component } from 'react'
import {Row, Col,Form} from "react-bootstrap";
import '../../css/Filter.css'


let appChoice=true
let gameChoice=false



class Category extends Component {

    constructor(props) {
        super(props)
        this.state = {
             appChoice:appChoice,
             gameChoice:gameChoice,
            hist:[],    
             
             gamePlusMinus:'+',
             appPlusMinus:'+',
             showAppCategory:false,
             showGameCategory:false

        }
        this.changeGameChoice=this.changeGameChoice.bind(this)
        this.changeAppChoice=this.changeAppChoice.bind(this)
        this.AppCategoryChange = this.AppCategoryChange.bind(this);
        this.GameCategoryChange = this.GameCategoryChange.bind(this);
    }

    AppCategoryChange=(event)=> {
      if (this.state.appChoice===true){
        let appCategoryChoice = this.state.appCategoryChoice
        appCategoryChoice.forEach(appCategoryChoice => {
         if (appCategoryChoice.value === event.target.value)
            appCategoryChoice.isChecked =  event.target.checked
      })
      this.setState({appCategoryChoice: appCategoryChoice})
      }
    }

    GameCategoryChange(event) {
      if (this.state.gameChoice===true){
        let gameCategoryChoice = this.state.gameCategoryChoice
        gameCategoryChoice.forEach(gameCategoryChoice => {
         if (gameCategoryChoice.value === event.target.value)
            gameCategoryChoice.isChecked =  event.target.checked
      })
      this.setState({gameCategoryChoice: gameCategoryChoice})
      }
    }

        changeAppChoice = () => {
            this.setState(initialState => ({
              appChoice: !initialState.appChoice,
            }));
        }
        changeGameChoice = () => {
            this.setState(initialState => ({
              gameChoice: !initialState.gameChoice,
            }));
        }

      
    componentDidUpdate(prevProps, prevState) {
      if (prevState.appChoice !== this.state.appChoice) {
        this.setState({
          gameChoice:!this.state.appChoice
        })
        this.props.data.ChangeAppChoice(this.state.appChoice)
      }
      if (prevState.gameChoice !== this.state.gameChoice) {
        this.setState({
          appChoice:!this.state.gameChoice
        })
        this.props.data.ChangeGameChoice(this.state.gameChoice)
      }
    }
    changeAppPlusMinus(item)
    {
      let newItem=''
      if(item==='+')
          newItem='-'
      else if(item==='-')
          newItem='+'
        this.setState({
            appPlusMinus:newItem
        })
    }
    changeGamePlusMinus(item)
    {
      let newItem=''
      if(item==='+')
          newItem='-'
      else if(item==='-')
          newItem='+'
        this.setState({
            gamePlusMinus:newItem
        })
    }
    hideComponent(name) {
      switch (name) {
        case "showAppCategory":
          this.setState({ showAppCategory: !this.state.showAppCategory });
          break;
        case "showGameCategory":
          this.setState({ showGameCategory: !this.state.showGameCategory });
          break;
        default:
          return null
      
      }
    }

    render() {
        
            if(this.state.appChoice!==appChoice)
            {
                appChoice=this.state.appChoice             
            }
            if(this.state.gameChoice!==gameChoice)
            {
                gameChoice=this.state.gameChoice             
            }
                    
        
        return (
            <div style={{marginLeft:"8px"}}>
            <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
              </Form.Label>
              <Col></Col>
              <Col sm={10}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                <Form.Check  className="filters" 
                  value='apps'
                  type="checkbox"
                  label="All Apps"
                  name="apps"
                  id="apps"
                  checked={this.state.appChoice}
                  onChange={this.changeAppChoice}
                  custom
                /></td>
                <td style={{width:"5px"}}></td>
                </tr>
                </tbody>
                </table>

                
                <table>
                  <tbody>
                    <tr>
                      <td>
                <Form.Check className="filters" 
                  value='games'
                  type="checkbox"
                  label="Only Games"
                  name="games"
                  id="games"
                  checked={this.state.gameChoice}
                  onChange={this.changeGameChoice}
                  custom
                /></td>
                <td style={{width:"5px"}}></td>
                </tr>
                </tbody>
                </table>
              
              </Col>
            </Form.Group>
          </fieldset></div>
        )
    }
}
export default Category
