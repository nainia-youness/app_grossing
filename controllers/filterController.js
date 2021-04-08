const sequelize = require("../models/appCon").sequelize;
const { validationResult } = require('express-validator');




// Filter function
exports.filter = (req, res, next) => {

    const errors = validationResult(req);
    const QUERY="SELECT DISTINCT ON (rank.id,rank.packagename,rank.rank, application.title, application.developername,  downloadinfo.downloadtraced, review_2.starrating)rank.id,rank.packagename, application.title, application.developername, rank.category,image.imageurl, downloadinfo.downloadtraced, review_2.starrating ,review_2.ratingcount  FROM rank  inner join application on rank.packagename = application.packagename inner join downloadinfo on application.packagename=downloadinfo.packagename inner join review_2 on review_2.packagename=downloadinfo.packagename inner join image on image.packagename=rank.packagename "
    var QUERY_FILTER,QUERYF1,QorderBy,Qcat,Qsearch,Qpublished,Qreleasedate,Qprice,Qrating,Qdownload,Qtopchart,Qlogo;
    
    var maintenant=new Date();
    var jour=maintenant.getDate();
    var mois=maintenant.getMonth()+1;
    var an=maintenant.getFullYear();
    var h=maintenant.toLocaleDateString()
    
    const top={ 'Top New Free':'apps_topselling_new_free','Top Free':'apps_topselling_free','Top Grossing':'apps_topgrossing','Top Paid':'apps_topselling_paid','Top New Paid':'apps_topselling_new_paid'}
    const pays={ 'Morocco':'MA','France':'FR','Spain':'SP','Egypte':'EG'}
    const order={ 'downloads':'downloadinfo.downloadtraced','title':'application.title','review':'review_2.ratingcount','rating':'review_2.starrating'}
    const recherche={'title':'title','description':'shortdescription','devName':'developername'}
    const rdate={'lastDay':`${an}-${mois}-${jour-1}`,'lastWeek':`${an}-${mois}-${jour-7}`,'lastMonth':`${an}-${mois-1}-${jour}`}
    const post={

        showTopChart:req.body.showTopChart,
        showDownload:req.body.showDownload,
        showRating:req.body.showRating,
        showAdd:req.body.showAdd,
        showPrice:req.body.showPrice,
        showReleaseDate:req.body.showReleaseDate,
        showPublished:req.body.showPublished,
        showSearch:req.body.showSearch,
        /*showCategory:req.body.showCategory,*/


        Fsearch:{   
                    searchChoice:recherche[req.body.searchChoice], //'title'
                    search:(req.body.search).toLowerCase()  //''
                },

        Fpublished:{ 
                        publishedChoice:req.body.publishedChoice,//'published'
                        },
        /*            
        Fcategory:{
                    appChoice:req.body.appChoice,//true
                    gameChoice:req.body.searchChoice //true
                },*/
        
        FreleasedDate:{ 
                        releasedDateChoice:req.body.releasedDateChoice //'any'
                },

        Fprice:{ 
                priceChoice:req.body.priceChoice //'freeAndPaid'
                },

        FcontainsAds:{
                        addChoice:req.body.addChoice //'both'
                        },
        Frating:{
                upperRating:req.body.upperRating ,//'5.0'
                lowerRating:req.body.lowerRating ,//'0.0'
                upperNumberRating:req.body.upperNumberRating, //'100000000'
                lowerNumberRating:req.body.lowerNumberRating //'0'
                },

        Fdownloads:{
                    upperDownload:req.body.upperDownload ,//'10000000',
                    lowerDownload:req.body.lowerDownload //'0'
                },

        FtopChart:{
                    list:top[req.body.topChart],//'Top New Free',
                    country:pays[req.body.country] ,//'Morocco',
                    category:(req.body.category).toUpperCase() ,//'All Apps',
                    rank:{  
                            upperRanking:req.body.upperRanking ,//'600',
                            lowerRanking:req.body.lowerRanking //'0' 
                        } 
                    },


        page:(req.body.page)*100,
        orderBy:order[req.body.orderBy]//'downloads'
}



    if ( (post.Fsearch.search).trim()!=="") {
        Qsearch=`AND application.${post.Fsearch.searchChoice}  LIKE '%${post.Fsearch.search}%'`;
    }else {
        Qsearch=``;
    }



    if (post.showPublished) {
        if (post.Fpublished.publishedChoice=="published") {
            Qpublished=`AND application.available=true`;
        } else {
            if (post.Fpublished.publishedChoice=="unpublished") {
                Qpublished=`AND application.available=false`;
            }else{
                Qpublished=``;
            }
        }
        
    }else{
        Qpublished=``;
    }


/*
    if (post.showCategory) {
        if (post.Fcategory.appChoice) {
            Qcategory=" ";
        } else {
            Qcategory=`AND rank.category LIKE '%GAME%' `;
        }
    }else{
        Qcategory=` `;
    }*/



    if (post.showReleaseDate) {
        if (post.FreleasedDate.releasedDateChoice=="any") {
            Qreleasedate=``;
        } else {
            Qreleasedate=`AND application.releasedate='${rdate[post.FreleasedDate.releasedDateChoice]}'`;
        }
    }else{
        Qreleasedate=``;
    }



    if (post.showPrice) {
        if ((post.Fprice.priceChoice).toUpperCase()=="FREEANDPAID") {
            Qprice=`AND (rank.subcategory LIKE '%free%' or rank.subcategory LIKE '%paid%')`;
        } else {
            Qprice=`AND rank.subcategory LIKE '%${post.Fprice.priceChoice}%'`;
        }
    }else{
        Qprice=``;
    }



    if (post.showRating) {
        Qrating=`AND (review_2.starrating BETWEEN ${post.Frating.lowerRating} AND ${post.Frating.upperRating} ) AND (review_2.ratingcount BETWEEN ${post.Frating.lowerNumberRating} AND ${post.Frating.upperNumberRating})`;
    }else{
        Qrating=``;
    }




    if (post.showDownload) {
        Qdownload=`AND (downloadinfo.downloadtraced BETWEEN '${post.Fdownloads.lowerDownload}' AND '${post.Fdownloads.upperDownload}' )`;
    }else{
        Qdownload=``;
    }




    if (post.showTopChart) {
        if (post.FtopChart.category=="ALL APPS") {
            Qcat=``;
        } else {
            Qcat=`AND rank.category='${post.FtopChart.category}'`;
        }
        Qcountry=`AND rank.country='${post.FtopChart.country}'`;
        Qlist=`AND rank.subcategory='${post.FtopChart.list}'`;
        Qrank=`AND (rank.rank BETWEEN ${post.FtopChart.rank.lowerRanking} AND  ${post.FtopChart.rank.upperRanking})`;
        Qtopchart=`${Qcountry} ${Qcat} ${Qlist} ${Qrank}`;
    }else{
        Qtopchart=``;
    }


    Qlogo=`image.imagetype='2'`;
    QorderBy=`AND rank.datecaptured='2020-09-13'  AND review_2.datetraced='2020-09-13' AND downloadinfo.datecaptured='2020-09-13' ORDER BY ${post.orderBy} DESC`;
    QUERYF1=`${Qtopchart} ${Qsearch} ${Qpublished} ${Qreleasedate} ${Qprice} ${Qrating} ${Qdownload}`;
    if (!errors.isEmpty()) {
    console.log('hi: '+JSON.stringify(errors) )
        return res.status(422).jsonp(errors.array());
    }
    else {
            console.log('i am in filterQuery')
            if (!post.showTopChart && !post.showDownload && !post.showRating && !post.showAdd && !post.showPrice && !post.showReleaseDate && !post.showPublished && !post.showSearch && !post.showCategory) {
                QUERY_FILTER=QUERY + `WHERE ${Qlogo} AND rank.country='MA'  AND rank.subcategory='apps_topselling_new_free' ${QorderBy} LIMIT ${post.page+1}`;//
            } else {
                QUERY_FILTER=QUERY + `WHERE ${Qlogo} `+QUERYF1+` ${QorderBy} LIMIT ${post.page+1}`;

            }        
        
        sequelize.query(QUERY_FILTER,
          { type: sequelize.QueryTypes.SELECT})
                .then((rank) =>{ res.status(200).json({data:rank.slice(post.page-100,post.page), nextpage:(rank.length>post.page)});
                                        console.log("len: "+rank.length)} ) 
                .catch((error) => { return next(error); });
    }




};