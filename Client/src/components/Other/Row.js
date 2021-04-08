import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../css/table.css"
import   {Link} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import { useHistory } from "react-router";
import   {withRouter} from 'react-router-dom'



function Row(props) {
    const {rank,logo,download,reviews,devName,packagename}=props
    let {rating}=props
    let isRatingNull=false
    let isDownloadNull=false
    let isReviewsNull=false
    let {title}=props
    const history = useHistory();
    function titleHandler(){
        if(window.history.state===undefined || window.history.state===null)
        {
            history.push('/apps/'+encodeURIComponent(packagename),{category: 'All Apps',subCategory:'Top New Free'})
        }
        else{
            if(window.history.state.state===undefined || window.history.state.state===null)
            {
                history.push('/apps/'+encodeURIComponent(packagename),{category: 'All Apps',subCategory:'Top New Free'})
            }
            else{
                history.push({
                    pathname:  '/apps/'+encodeURIComponent(packagename),
                    state: {
                     category:window.history.state.state.category,
                     subCategory:window.history.state.state.Top
                    }
                 })
            }
        }
    }
    if(title.length>46)
        title=title.slice(0,46)+'...'
    if(rating===null)
    {
        rating=0
    }     
    else
    {
        isRatingNull=false
    }
    if(reviews===null)
        isReviewsNull=true
    else
        isReviewsNull=false

    if(download==="")
        isDownloadNull=true
    else
        isDownloadNull=false
    return (
        <>
            <tr style={{height:"10px"}}>
                <td className='rank' style={{width:'20px'}}>
                    <span style={{fontSize:'17px',color:'#4a4a4a'}}>{rank}</span>
                       {/* <img className="down" src="https://cdn3.iconfinder.com/data/icons/musthave/256/Stock%20Index%20Down.png" alt="logo" ></img>//50
                    <span className="downNumb">2</span> <Link  to={'/apps/'+encodeURIComponent(packagename)}>*/}
                </td>
                <td className='logo'><a className='apps' onClick={titleHandler}> <img src={logo} className='logoImage' alt="logo" width='55px' height='55px'></img> </a></td>
    <td className='title' style={{width: "220px",textAlign:'left'}}><a className='apps' onClick={titleHandler}>{title}</a><br/><span style={{fontSize:'12px',color:'grey'}}>By</span><Link style={{fontSize:'12px'}} to={'/developer/'+encodeURIComponent(devName)}> {devName}</Link></td>
                <td className='download'>{!isDownloadNull && <span>{download}</span>}{isDownloadNull && <span>NaN</span>}</td>
                <td className='reviews'>{!isReviewsNull && <span>{reviews}</span>}{isReviewsNull && <span>NaN</span>}</td>
                <td className='rating' style={{width: "100px"}}>
                    
                    {!isRatingNull &&<StarRatings
                        rating={rating}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name='rating'
                        starDimension="20px"
                        starSpacing="0px"
                    />}
                    {isRatingNull && <span>0</span>}
                </td>
            </tr>
        </>
    )
}

export default withRouter(Row)