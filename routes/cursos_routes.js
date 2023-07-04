const express = require('express')
const router = express.Router()

const cursos_controller = require('../controllers/cursos_controller')
router.get('/', cursos_controller.get_cursos)
router.post('/', cursos_controller.add_cursos)

module.exports = router