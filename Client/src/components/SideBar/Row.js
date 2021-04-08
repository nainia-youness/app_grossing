import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../css/table.css"
import   {Link} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import { useHistory } from "react-router";

function Row(props) {
    const {logo,download,reviews,devName,showDev,packagename}=props
    let {category,title,rating}=props
    let isRatingNull=false
    let isDownloadNull=false
    let isReviewsNull=false
    const history = useHistory();

    function makeCapital(cat){
        const arr=cat.split('_')
        for(let i=0;i<arr.length;i++){
            arr[i]=arr[i].charAt(0).toUpperCase()+arr[i].slice(1).toLowerCase()
        }
        cat=arr.join(' ')
        return cat
    }

    function titleHandler(){
            category=makeCapital(category)
            history.push({
               pathname:  '/apps/'+encodeURIComponent(packagename),
               state: {
                category:category,
                subCategory:"Top New Free"
               }
            })
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
    if(title.length>46)
        title=title.slice(0,46)+'...'
    if(category.length>17)
        category=category.slice(0,17)+'...'
    return (//2.2vmin
        <>
            <tr style={{height:"10px"}}>
                <td className='logo'> <a className='apps' onClick={titleHandler}><img src={logo} className='logoImage' alt="logo"  width='55px' height='55px'></img></a></td>
                <td className='title' style={{width: "220px",textAlign:'left'}}>
                    <a className='apps' onClick={titleHandler}>{title}</a>
                    {showDev &&
                        <span><br/><span style={{fontSize:'12px',color:'grey'}}>By</span><Link style={{fontSize:'12px'}} to={'/developer/'+encodeURIComponent(devName)}> {devName}</Link></span>
                    }
                </td>
                <td className='category' style={{width:'100px'}}>{category}</td>
                <td className='download'>{!isDownloadNull && <span>{download}</span>}{isDownloadNull && <span>NaN</span>}</td>
                <td className='reviews'>{!isReviewsNull && <span>{reviews}</span>}{isReviewsNull && <span>NaN</span>}</td>
                <td className='rating' style={{width: "80px"}}>
                    
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

export default Row