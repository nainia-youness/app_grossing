import React, { Component } from 'react'
import { TagCloud } from 'react-tagcloud'

const data = [
    { value: 'JavaScript', count: 38 },
    { value: 'React', count: 30 },
    { value: 'Nodejs', count: 28 },
    { value: 'Express.js', count: 25 },
    { value: 'HTML5', count: 33 },
    { value: 'MongoDB', count: 18 },
    { value: 'CSS3', count: 20 },
  ]

class DescriptionTagCloud extends Component {

  constructor(props) {
    super(props)

    this.state = {
      description:this.props.description,
      data:[]
    }
  }

  wordFrequency(txt) {
    var words = txt.split(/[ \.\?!,\*'"]+/),
        seen = [];
    for (var i = 0; i < words.length; i++) {
        var w = words[i],
            found = false;
        for (var j = 0; j < seen.length; j++) {
            if (w === seen[j].value) {
                seen[j].count++;
                found = true;
                break;
            }
        }
        if (!found) seen.push( { value: w, count: 1 } );
    }
    return seen.slice(0,20);
  }

  componentDidMount(){//this.is not right for now
    this.setState({
      data:this.wordFrequency(this.state.description)
    })
  }

  

    render() {
        return (
            <>
              <TagCloud
                minSize={12}
                maxSize={35}
                tags={this.state.data}
                disableRandomColor={true}
                style={{color:'orange',width:'300px',marginLeft:'-350px'}}
              />  
            </>
        )
    }
}

export default DescriptionTagCloud
