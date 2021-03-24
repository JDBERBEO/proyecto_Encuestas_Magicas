const { Router } = require('express');
const router = Router();
const isAuth = require('../helpers/isAuth')

const {  
        getPolls, 
        newPoll, 
        createPoll, 
        deletePoll, 
        getPoll, 
        editPoll,
        votePoll,
        voteCounted,
        getPollresults

    } = require('../controllers/controllers')

router.get('/', getPolls)

router.get('/newPoll', isAuth, newPoll)

router.post('/newPoll', isAuth, createPoll) 

router.get('/editpoll/:id', isAuth, getPoll)

router.delete('/:id', isAuth, deletePoll);

router.put('/:id', isAuth, editPoll)

router.get('/polls/:id', votePoll)

router.post('/polls/:id', voteCounted)

router.get('/polls/:id/results', getPollresults)


module.exports = router