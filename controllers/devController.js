const sequelize = require("../models/appCon").sequelize;
const { validationResult } = require('express-validator');




// developer function
exports.devApp = (req, res, next) => {
    const errors = validationResult(req);
    const QUERY="SELECT distinct on(application.packagename) image.imageurl, application.title,rank.category, downloadinfo.downloadtraced, review_2.ratingcount, review_2.starrating,  application.developername, application.devemail, application.devwebsite FROM application inner join rank on application.packagename = rank.packagename  inner join downloadinfo on application.packagename=downloadinfo.packagename inner join review_2 on review_2.packagename=application.packagename inner join image on image.packagename=application.packagename ";
    const devname=req.params.devname;
    console.log('developer name :'+devname)


    QUERY_DEV=QUERY +` WHERE image.imagetype = '2' AND application.developername='${devname}' AND review_2.datetraced='2020-09-13' `;// date must be dyanamic   
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        console.log('i am in devQuery')
         sequelize.query(QUERY_DEV,{type: sequelize.QueryTypes.SELECT})
                .then((info) =>{ res.status(200).json({Apps:info, AppNumber:(info.length), RatingCount:'4000', avrRating:'4,3' });
                                     console.log("len: "+info.length) } ) 
                .catch((error) => { return next(error); }); 
    }

};