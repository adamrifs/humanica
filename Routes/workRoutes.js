const express = require('express')
const router = express.Router()
const workController = require('../Controllers/workController')

router.post('/addwork',workController.addwork)
router.get('/getwork',workController.getwork)
router.put('/updatework/:id',workController.updatework)
router.delete('/deletework/:id',workController.deletework)

module.exports = router