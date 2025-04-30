const express = require('express');
const router = express.Router();
const { 
    User_Meetings, 
    Meetings_links, 
    Delete_links,
    Schedule_Meeting 
} = require('../Controllers/Meetings.js');

router.post('/meetings/create', User_Meetings);
router.get('/meetings/links', Meetings_links);
router.post('/meetings/delete', Delete_links);
router.post('/meetings/schedule', Schedule_Meeting);

module.exports = router;