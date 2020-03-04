
const MentorHelper = require('./mentorHelper');
module.exports = {
    getMentors,
    countMentors,
    addMentor,
    getMentorsByID,
    editmentor,
    deleteMentor
}

function getMentors(req,res){
    MentorHelper.getMentors(req.query.page)
        .then((data)=> data.length > 0 ? res.json(data): res.json('No Data Found') )
        .catch(err => console.log(err));
}
function countMentors(req,res){
    MentorHelper.countAllMentors()
        .then((data)=> data ? res.json(data): res.json('No Data Found') )
        .catch(err => console.log(err));
}

function addMentor(req,res){
    MentorHelper.addMentor(req.body)
        .then(()=> res.json('Mentor Added'))
        .catch(err =>  res.json(err));
}

function getMentorsByID(req,res){
    MentorHelper.getMentorsByID(req.query.id)
        .then((data)=> data ? res.json(data): res.json('No Data Found for this id') )
        .catch(err => res.json(err));
}
function editmentor(req,res){
    MentorHelper.editmentor(req.body)
        .then((data)=> data ? res.json(data): res.json('No Data Found for this id') )
        .catch(err => res.json(err));
}

function deleteMentor(req,res){
    MentorHelper.deleteMentor(req.body.id)
        .then((data)=> data ? res.json(data): res.json('No Data Found for this id') )
        .catch(err => res.json(err));
}