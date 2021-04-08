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
    check('list')
        .not()
        .isEmpty()
        .withMessage('list is required')
        .bail()
        .isIn(['Top New Free','Top Free','Top Grossing','Top Paid','Top New Paid'])
        .withMessage('list not valid'),
    check('page', 'Number of pages is not valid')
        .not()
        .isEmpty()
        .withMessage('page is required')
        .bail()
        .isLength({ min : 1 ,max : 2})
    ];
}