const Poll= require('../models/polls')
const User = require('../models/userModel')


const home =(req, res) => {
    res.render('home')
}

const getPolls = async (req, res) => {
    
    
    let polls = await Poll.find().lean();
    // const polls = await Poll.find({}).lean();
    //pude haber sacado email con algún find?
    console.log('polls de getpolls: ',polls)
    polls=polls.map(p=> {
        return {
            ...p,user:p.user.toString()
        }
    })
    console.log(polls)
    const empty = polls.length==0
    
    const userId = res.locals.user
        res.render('polls', { polls, empty, userId });

        // console.log(polls)
} 


const newPoll = (req, res) => {
        res.render('newPoll')
}

const createPoll = async (req, res) => {
        //1.Imprimir la info que llega del formulario
        //2.Crear un modelo de poll con esa info
        //3.hacer el save
        //4.redireccionar a la raiz
        
        const poll = new Poll({
            name: req.body.name,
            description: req.body.description,
            optionOne: req.body.optionOne,
            optionTwo: req.body.optionTwo,
            user: res.locals.user,
            email: res.locals.email,
            // correctpassword: res.locals.correctpassword
        });

        await poll.save();
        res.redirect('/'); 
        // console.log(poll)
    } 

const deletePoll = async (req, res) => {

        const { id } = req.params;
        await Poll.findByIdAndDelete(id);
        res.redirect('/');
}

const  getPoll = async (req,res) => {
        const { id } = req.params;
        const task = await Poll.findById(id);
        res.render('editForm', task)


}

const editPoll = async (req, res) => {
        const { name, description, optionOne, optionTwo } = req.body
        const { id } = req.params;
        await Poll.findByIdAndUpdate(id, { name, description, optionOne, optionTwo});
        console.log(req.body)
        res.redirect('/');
}

const votePoll = async (req, res) => {

        const { id } = req.params;
        const votePoll = await Poll.findById(id);
        console.log(votePoll)
        res.render('voteForm', votePoll)
}

const voteCounted = async (req, res) => {
    //counts one vote on OptionOne
        const { id } = req.params;
        const poll = await Poll.findById(id);
        console.log('totalvotos', poll.totalVotes )
        // console.log(req.body.flexRadioDefault)
        if (req.body.flexRadioDefault === poll.optionOne.value ) {
            poll.optionOne.votes++
        }
        
        else if (req.body.flexRadioDefault === poll.optionTwo.value) {
            poll.optionTwo.votes++
        }
        poll.totalVotes = poll.optionOne.votes + poll.optionTwo.votes
        
        await poll.save();
        res.redirect(`/polls/${id}/results`); 
}
    
const getPollresults = async (req, res) => {
        const { id } = req.params;
        const resultsPoll = await Poll.findById(id);
        console.log('esto es totalVotes ', resultsPoll.totalVotes)
        console.log('optionOne', resultsPoll.optionOne.votes)
        
        let percenOptionOne = (resultsPoll.optionOne.votes / resultsPoll.totalVotes)*100
        let percenOptionTwo = (resultsPoll.optionTwo.votes / resultsPoll.totalVotes)*100

        res.render('voteResults', {resultsPoll: resultsPoll.toJSON(), percenOptionOne, percenOptionTwo}) //se pasa un objeto con dos llaves resultspolls y percenOptionOne
    
}

module.exports = {
    home, 
    getPolls,
    newPoll,
    createPoll,
    deletePoll,
    getPoll,
    editPoll,
    votePoll,
    voteCounted,
    getPollresults
}