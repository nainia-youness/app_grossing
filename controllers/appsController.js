const sequelize = require("../models/appCon").sequelize;
const { validationResult } = require('express-validator');




// statistics function
exports.appsContent = (req, res, next) => {
    const errors = validationResult(req);
    const QUERY="SELECT distinct on(rank.rank)rank.rank,rank.category,rank.subcategory, application.packagename, image.imageurl, application.title, application.developername, application.devemail, application.shortdescription, application.devwebsite, downloadinfo.downloadtraced, review_2.starrating ,review_2.ratingcount FROM application inner join rank on application.packagename = rank.packagename  inner join downloadinfo on application.packagename=downloadinfo.packagename inner join review_2 on review_2.packagename=application.packagename inner join image on image.packagename=application.packagename ";
    const top={ 'Top New Free':'apps_topselling_new_free','Top Free':'apps_topselling_free','Top Grossing':'apps_topgrossing','Top Paid':'apps_topselling_paid','Top New Paid':'apps_topselling_new_paid'}
    const pckge=req.params.pckge;
    const category =(req.query.category).toUpperCase();
    const subcat =top[req.query.subCategory];
    console.log('package :'+pckge)

    if (category=="ALL APPS") {
        Qcat=``;
    } else {
        Qcat=`AND rank.category='${category}'`;
    }


    QUERY_APPS=QUERY +` WHERE application.packagename='${pckge}' ${Qcat} AND rank.subcategory='${subcat}' AND image.imagetype = '2' AND review_2.datetraced='2020-10-16' ORDER BY rank.rank DESC LIMIT 1`;// date must be dyanamic
    QUERY_SCREENSHOT=`SELECT DISTINCT image.imageurl FROM image WHERE image.packagename='${pckge}' AND image.imagetype != '2' `;
    QUERY_HISTORYSTARRATING=`SELECT DISTINCT max(starrating) as starrating, datetraced FROM review_2 inner join rank on rank.packagename=review_2.packagename WHERE review_2.packagename='${pckge}' ${Qcat} AND rank.subcategory='${subcat}' GROUP BY datetraced ORDER BY datetraced DESC  `;
    QUERY_HISTORY5RATING=`SELECT DISTINCT starrating,onerating, towrating, threerating, fourrating, fiverating FROM review_2 inner join rank on rank.packagename=review_2.packagename WHERE datetraced='2020-10-16' AND review_2.packagename='${pckge}' ${Qcat} AND rank.subcategory='${subcat}' ORDER BY starrating DESC LIMIT 1  `;
    QUERY_HISTORYRANKS=`SELECT DISTINCT max(rank) as rank, datecaptured  FROM rank WHERE rank.packagename='${pckge}' ${Qcat} AND rank.subcategory='${subcat}' GROUP BY datecaptured ORDER BY datecaptured DESC `;
    /*SELECT DISTINCT max(starrating),onerating, towrating, threerating, fourrating, fiverating, datetraced from review_2 inner join rank on rank.packagename=review_2.packagename where datetraced='2020-10-16' AND review_2.packagename='com.squareenixmontreal.hitmansniperandroid' AND rank.category='GAME' AND rank.subcategory='apps_topselling_paid' group by onerating, towrating, threerating, fourrating, fiverating, datetraced */
    
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        console.log('i am in appsQuery')
        sequelize.query(QUERY_APPS,{type: sequelize.QueryTypes.SELECT})
        .then((apps) =>{    sequelize.query(QUERY_SCREENSHOT,{type: sequelize.QueryTypes.SELECT})
                                .then((screenshot) =>{ sequelize.query(QUERY_HISTORYSTARRATING,{type: sequelize.QueryTypes.SELECT})
                                                        .then((historystarrating) =>{ sequelize.query(QUERY_HISTORY5RATING,{type: sequelize.QueryTypes.SELECT})
                                                                                        .then((history5rating) =>{ sequelize.query(QUERY_HISTORYRANKS,{type: sequelize.QueryTypes.SELECT})
                                                                                                                    .then((historyranks) =>{ res.status(200).json({apps,screenshot,historystarrating,history5rating,historyranks}); } ) 
                                                                                                                    .catch((errr) => { return next(errr); }); } )

                                                                                        .catch((erreur) => { return next(erreur); }); } )
                                                        .catch((er) => { return next(er); }); } )
                                .catch((err) => { return next(err); });  } ) 
        .catch((error) => { return next(error); });
    }

};