import React, { Component } from 'react'
import '../../css/Forms.css'
import {withRouter} from 'react-router-dom'

class Text extends Component {

    
    render() {
        const {list,category,country}=this.props
        return (
                <>
                    <span className="print">{'Playstore rank: '+list.replaceAll('_',' ')+', categorie:'+ category.replaceAll('_',' ')+', country:'+country.replaceAll('_',' ')}</span>
                </>
        )
    }
}

export default withRouter(Text)
