const Alunos = require('../models/Aluno')

const get_alunos = async (req, res) => {
  try {    
    const aluno = await Alunos.findAll()       
    res.json(aluno)
    console.log(aluno) 
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
}

const add_aluno = async (req, res) => {
  const username = req.body.username
  const find_aluno = Alunos.findOne({where: {username: username}})
  if (find_aluno) res.json("Aluno já cadastrado!")
  if (!find_aluno){
    try {
      const { username, password, name, email, dt_birth, phone_number, country } = req.body
      const aluno = await Alunos.create({
        username,
        password,
        name,
        email,
        dt_birth,
        phone_number,
        country
      })
      res.json(aluno)
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
  }
}

module.exports = { get_alunos, add_aluno }