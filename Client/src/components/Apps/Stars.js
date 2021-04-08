import StarRatings from 'react-star-ratings';
import React, { Component } from 'react'

class Stars extends Component {
    constructor(props) {
        super(props)
    
    }
    

 
    render() {
      let starsData =this.props
      return (
          <table>
              <tbody>
                  <tr>
                      <th style={{color:'orange',fontSize:'30px'}}>{starsData.starsData.rating.toFixed(2)}</th>
                      <td>
                      <StarRatings
                        rating={starsData.starsData.rating}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name='rating'
                        />
                      </td>
                      <td style={{color:'grey'}}>{starsData.starsData.ratingNumber+' Ratings'}</td>
                  </tr>
              </tbody>
          </table>
      );
    }
}

export default Stars