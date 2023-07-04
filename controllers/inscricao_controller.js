const Alunos = require('../models/Aluno')
const Cursos = require('../models/Cursos')
const Inscricao = require('../models/Inscricao')

const get_inscricao = async (aluno_id, curso_id) => {    
    if (aluno_id && curso_id){
        const clause = { where: {aluno_id: aluno_id, curso_id: curso_id, canceled_at: null}}        
        if (clause){
            inscricao = await Inscricao.findAll(clause)
        } else {
            inscricao = await Inscricao.findAll()
        }        
        if (inscricao.length > 0) 
            return true
    }
    return false    
}

const add_inscricao = async (req, res) => {
    try {
        const { aluno_id, curso_id } = req.body
        
        const find_inscricao = await get_inscricao(aluno_id, curso_id)
        if (find_inscricao) res.json("Aluno já inscrito neste curso")
        
        const find_aluno =  await Alunos.findOne({ where: { id: aluno_id }}) 
        if (!find_aluno) res.json("Aluno não existe")

        const find_curso =  await Cursos.findOne({ where: { id: curso_id }}) 
        if (!find_curso) res.json("Curso não existe")
        if (!find_inscricao && find_aluno && find_curso){
            const inscricao = await Inscricao.create({
                aluno_id,
                curso_id
            })
            res.json(inscricao) 
    }              
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
}


const cancel_inscricao = async (req, res) => {
    try {
        const { aluno_id, curso_id } = req.body
        
        const find_inscricao = await get_inscricao(aluno_id, curso_id)
        if (!find_inscricao) res.json("O Aluno não está inscrito neste curso")
        
        if (find_inscricao){
            const inscricao = await Inscricao.update(
                { canceled_at: Date.now() },
                { where: {aluno_id: aluno_id, curso_id: curso_id}}
            )
            res.json("Operation performe successfuly!")
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
}

module.exports = { get_inscricao, add_inscricao, cancel_inscricao }