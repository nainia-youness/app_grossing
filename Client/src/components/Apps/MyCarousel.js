import React from 'react';
import Carousel from 'react-elastic-carousel';

    const breakPoint=[
        {width:300,itemsToShow:1},
        {width:500,itemsToShow:2},
        {width:1300,itemsToShow:3},
        {width:1500,itemsToShow:4},
    ]
  
    class MyCarousel extends React.Component {

      constructor(props) {
        super(props)
        this.state={
          isvideo:false
        }
    }
     
      render () {
        
        
        let { carouselImages } = this.props;
        return (
            <>
          <Carousel breakPoints={breakPoint}>
        {carouselImages.map((item,index) => (<img style={{width:'300px',height:'200px'}} src={item.imageurl} key={index} alt={'App image'+index}></img>))}
          </Carousel>
          </>
        )
      }
    } 

export default MyCarousel