const Cursos = require('../models/Cursos')
const Matriculas = require('../models/Inscricao')
const Sequelize = require("sequelize")

const get_cursos = async (req, res) => {    
    const Op = Sequelize.Op
    try {
        const cursos = await Cursos.findAll({
            where: {
              [Op.and]: [                
              Sequelize.where(Sequelize.cast(Sequelize.col('dt_start_curso'), 'date'), '>', Date.now()),              
            ]
            }
          })      
        
        cursos.forEach(async (curso, index) => {
            const qtd_matriculas = await Matriculas.count({ where: {"curso_id": curso.dataValues.id}})          
            const update_curso = {...cursos[index], ...curso, vagas_disponiveis: qtd_matriculas}                 
            cursos[index] = update_curso            
        })                
        res.json(cursos)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
}

const add_cursos = async (req, res) => {
    try {
        const { name, qtd_vagas, dt_init_insc, dt_end_insc, dt_start_curso, dt_end_curso } = req.body
        const user = await Cursos.create({
            name,
            qtd_vagas,
            dt_init_insc,
            dt_end_insc,
            dt_start_curso,
            dt_end_curso
        })
        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
}

module.exports = { get_cursos, add_cursos }