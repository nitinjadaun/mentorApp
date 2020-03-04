const router  = require('express').Router();
var mentor = require('../controller/mentors/mentorController');
router.get('/',mentor.getMentors);
router.get('/countmentors',mentor.countMentors);
router.post('/addmentor', mentor.addMentor);
router.get('/getmentor', mentor.getMentorsByID);
router.put('/editmentor', mentor.editmentor);
router.delete('/deletementor', mentor.deleteMentor);
module.exports = router;