const express = require('express')
const router = express.Router()

const inscricao_controller = require('../controllers/inscricao_controller')
router.get('/', inscricao_controller.get_inscricao)
router.post('/', inscricao_controller.add_inscricao)
router.put('/', inscricao_controller.cancel_inscricao)

module.exports = router