const express = require('express');
const router = express.Router();

// destructuring assignment 
const { data } = require('../data/flashcardData.json');
const { cards } =  data;    // const cards = data.cards; 

router.get('/', (req, res) => {
    const numberofCards = cards.length;
    const flashcardId = Math.floor(Math.random() * numberofCards);
    res.redirect(`/cards/${flashcardId}`);
});

// route parameter using :
// the value for route paramet would store in req.params
router.get('/:id', (req, res) => {

    const { side } = req.query;
    const { id } = req.params;

    // in case query string wasn't provided for a card
    if(!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }

    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];

    let templateData = { id, text, name };

    if( side === "question") {
        templateData.hint = hint;
        templateData.sideToShow = "answer";
        templateData.sideToShowDisplay = "Answer";
    } else if (side === "answer") {
        templateData.sideToShow = "question";
        templateData.sideToShowDisplay = "Question";
    }

    console.log("templateData", templateData);

    res.render('card', templateData);
});
module.exports = router;