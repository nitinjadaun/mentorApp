const Mentor = require('../../models/mentor/mentor.model');

module.exports= {
    getMentors,
    addMentor,
    getMentorsByID,
    editmentor,
    deleteMentor,
    countAllMentors
}
async function countAllMentors(){
    return await Mentor.countDocuments();
 }
async function getMentors(page){
    const limit = 10;
    const skip =  page > 1 ? ((page-1) * limit) : 0 ;
   return await Mentor.find().select('email name phone').skip(skip).limit(limit);
}
async function addMentor(data){
     // validate
     if (await Mentor.findOne({ email: data.email })) {
        throw 'Email "' + data.email + '" is already taken.';
    }
    const mentor = new Mentor(data);
    // save mentor
    await mentor.save();

 }

 async function getMentorsByID(id){
    return await Mentor.findById( ObjectId(id) ).select('-createdDate');
}

async function editmentor(data){
    // validate
    return await Mentor.findByIdAndUpdate({_id:ObjectId(data.id) },{ $set: { name: data.name,tasks: data.tasks,address:data.name,phone:data.phone }},{useFindAndModify:false});
}
async function deleteMentor(id){
    return await Mentor.deleteOne({_id:ObjectId(id)});
}