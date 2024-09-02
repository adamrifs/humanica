const express = require('express')
const router = express.Router()
const ipaddressController = require('../Controllers/ipaddressController')

router.post('/addIp', ipaddressController.addIp)
router.get('/getIp', ipaddressController.getIp)

module.exports = router