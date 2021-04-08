const { check } = require('express-validator');

const inCategory=['All Apps','Game Adventure','Game Casino','Game board','Game Arcade','Game Sports','Game Card','Game Casual',
'Game Puzzle','Game Trivia','Game','Game Racing','Game Role Playing','Game Educational','Game Word','Game Simulation','Game Music','Game Strategy','Game Action',
'Family Action','Communication','Events','Family Pretend','Business','Social','Tools','Lifestyle','Application','Personalization',
'Comics','Finance','News And Magazines','Shopping','Dating','Health And Fitness','Education','Maps And Navigation','Libraries And Demo',
'Food And Drink','Video And Players','Books And Reference','Family','Beauty','Android Wear','Photography','Parenting','Medical','Travel And Local',
'Music And Audio','Family Education','Art And Design','Family MusicVideo','Weather','Productivity','Sports','Entertainment',
'House And Home','Family BrainGames','Family','Auto And Vehicles'];

module.exports= () => {
  return [
    check('country')
        .not()
        .isEmpty()
        .withMessage('Country is required')
        .bail()
        .isLength({ min: 2 })
        .isIn(['Morocco','France','Spain','Egypte'])
        .withMessage('Country is not valid'),
    check('category')
        .not()
        .isEmpty()
        .withMessage('Category is required')
        .bail()
        .isIn(inCategory)
        .withMessage('Category is not valid'),
    check('searchChoice')
        .not()
        .isEmpty()
        .withMessage('searchChoice  is required')
        .bail()
        .isIn(['title','description','devName'])
        .withMessage('searchChoice is not valid'),
    check('search')
        .trim()
        .isLength({ min: 0 })
        .withMessage('search is not valid')
        .customSanitizer(value => {
            return value.replace(/'/g, "\\'");
          }),
    check('publishedChoice')
        .not()
        .isEmpty()
        .withMessage('publishedChoice  is required')
        .bail()
        .isIn(['published','unpublished','publishedAndUnpublished'])
        .withMessage('publishedChoice is not valid'),
    check('releasedDateChoice')
        .not()
        .isEmpty()
        .withMessage('releasedDateChoice  is required')
        .bail()
        .isIn(['any','lastDay','lastWeek','lastMonth'])
        .withMessage('releasedDateChoice is not valid'),
    check('upperRating')
        .not()
        .isEmpty()
        .withMessage('upperRating  is required')
        .bail()
        .isFloat()
        .withMessage('upperRating is not valid'),
    check('lowerRating')
        .not()
        .isEmpty()
        .withMessage('lowerRating  is required')
        .bail()
        .isFloat()
        .withMessage('lowerRating is not valid'),
    check('upperNumberRating')
        .not()
        .isEmpty()
        .withMessage('upperNumberRating is required')
        .bail()
        .isFloat()
        .withMessage('upperNumberRating is not valid'),
    check('lowerNumberRating')
        .not()
        .isEmpty()
        .withMessage('lowerNumberRating  is required')
        .bail()
        .isFloat()
        .withMessage('upperNumberRating is not valid'),
    check('upperDownload')
        .not()
        .isEmpty()
        .withMessage('upperDownload  is required')
        .bail()
        .isFloat()
        .withMessage('upperDownload is not valid'),
    check('lowerDownload')
        .not()
        .isEmpty()
        .withMessage('lowerDownload  is required')
        .bail()
        .isFloat()
        .withMessage('lowerDownload is not valid'),
    check('priceChoice')
        .not()
        .isEmpty()
        .withMessage('priceChoice is required')
        .bail()
        .isIn(['freeAndPaid','free','paid'])
        .withMessage('priceChoice is not valid'),
    check('upperRanking')
        .not()
        .isEmpty()
        .withMessage('upperRanking  is required')
        .bail()
        .isFloat()
        .withMessage('upperRanking is not valid'),
    check('lowerRanking')
        .not()
        .isEmpty()
        .withMessage('lowerRanking  is required')
        .bail()
        .isFloat()
        .withMessage('lowerRanking is not valid'),
    check('releasedDateChoice')
        .not()
        .isEmpty()
        .withMessage('releaseDate is required')
        .bail()
        .isIn(['any','lastDay','lastWeek','lastMonth'])
        .withMessage('releaseDate is not valid'),
    check('topChart')
        .not()
        .isEmpty()
        .withMessage('topChart is required')
        .bail()
        .isIn(['Top New Free','Top Free','Top Grossing','Top Paid','Top New Paid'])
        .withMessage('topChart is not valid'),
    check('orderBy')
        .not()
        .isEmpty()
        .withMessage('orderBy is required')
        .bail()
        .isIn(['downloads','title','review','rating'])
        .withMessage('orderBy is not valid'),
    check('page', 'number of pages is not valid')
        .not()
        .isEmpty()
        .withMessage('page is required')
        .bail()
        .isInt()
        .isLength({ min : 1 ,max : 2})
    ];
}