const express = require('express')
const router = express.Router()
const ipaddressController = require('../Controllers/ipaddressController')

router.post('/addIp', ipaddressController.addIp)

module.exports = router