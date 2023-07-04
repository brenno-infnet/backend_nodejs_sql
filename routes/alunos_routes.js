const express = require('express')
const router = express.Router()

const alunos_controller = require('../controllers/alunos_controller')
router.get('/', alunos_controller.get_alunos)
router.post('/',alunos_controller.add_aluno)

module.exports = router