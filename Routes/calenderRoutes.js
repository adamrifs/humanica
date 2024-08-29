const express = require('express')
const router = express.Router()
const calenderController = require('../Controllers/calenderController')


router.post('/adddata',calenderController.adddata)
router.get('/getdata',calenderController.getdata)


module.exports = router