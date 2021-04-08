const sequelize = require("../models/appCon").sequelize;
const { validationResult } = require('express-validator');



// statistics function
exports.stats = (req, res, next) => {
    const errors = validationResult(req);
    const QUERY="SELECT DISTINCT ON (rank.id,rank.packagename,rank.rank, application.title, application.developername, downloadinfo.downloadtraced, review_2.starrating)rank.packagename,rank.id,rank.rank, application.title, application.developername,image.imageurl, downloadinfo.downloadtraced, review_2.starrating ,review_2.ratingcount  FROM rank  inner join application on rank.packagename = application.packagename inner join downloadinfo on application.packagename=downloadinfo.packagename inner join review_2 on review_2.packagename=downloadinfo.packagename inner join image on image.packagename=rank.packagename ";
    const top={ 'Top New Free':'apps_topselling_new_free','Top Free':'apps_topselling_free','Top Grossing':'apps_topgrossing','Top Paid':'apps_topselling_paid','Top New Paid':'apps_topselling_new_paid'}
    const pays={ 'Morocco':'MA','France':'FR','Spain':'SP','Egypte':'EG'};
    var maintenant=new Date();
    var h=maintenant.toLocaleDateString()
    var Qcat, QUERY_STATS,Qcountry,Qlist,Qlogo,QorderBy ;
    
    const post={
        country: pays[req.body.country],//"MA"     
        category: (req.body.category).toUpperCase(),  //"GAME" 
        list: top[req.body.list] ,//"apps_topselling_new_free"   
        page: (req.body.page)*100    //100
    }

    if (post.category=="ALL APPS") {
        Qcat=``;
    } else {
        Qcat=`AND rank.category='${post.category}'`;
    }

    Qcountry=`AND rank.country='${post.country}'`;
    Qlist=`AND rank.subcategory='${post.list}'`;
    Qlogo=`image.imagetype='2'`;
    QorderBy=`AND rank.datecaptured='2020-09-13'  AND review_2.datetraced='2020-09-13' AND downloadinfo.datecaptured='2020-09-13' ORDER BY rank.rank `;
        
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        console.log('i am in statisticQuery')
        QUERY_STATS=QUERY + `WHERE ${Qlogo} ${Qcountry} ${Qcat} ${Qlist}  ${QorderBy} LIMIT ${post.page+1}`;
         sequelize.query(QUERY_STATS,{type: sequelize.QueryTypes.SELECT})
                .then((rank) =>{ res.status(200).json({data:rank.slice(post.page-100,post.page), nextpage:(rank.length>post.page)});
                                     console.log("len: "+rank.length) } ) 
                .catch((error) => { return next(error); }); 
    }


};