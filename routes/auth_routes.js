const express = require('express')
const router = express.Router()

const auth_controller = require('../controllers/auth_controller')

router.post('/', auth_controller.login)
router.get('/',auth_controller.logout)

module.exports= router