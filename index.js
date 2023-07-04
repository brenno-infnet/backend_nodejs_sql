const express = require('express')
const conn = require('./database/conn')

const jwt = require('jsonwebtoken')

const alunos_routes = require('./routes/alunos_routes')
const cursos_routes = require('./routes/cursos_routes')
const inscricao_routes = require('./routes/inscricao_routes')
const authentication_routes = require('./routes/auth_routes')

const app = express()

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())


function VerifyJWT(req, res, next) {
  // Não exige autenticação para cadastro de novos alunos
  if (!(req.baseUrl == "/alunos" && req.method == "POST")){
    const token = req.body.token || req.query.token 
    const reftoken = req.body.reftoken || req.query.reftoken    
    if(!token){
      return res.status(403).json({auth:false, message: 'No token provided'})
    }
    jwt.verify(token, 'secret_key', (err, user) => {
      if (err) {      
        if (reftoken) {
          jwt.verify(reftoken, 'secret_key2', (err2, user2) => {
            if (err2) {            
              return res.status(403).json({ auth: false, message: 'Invalid refresh token' })
            }
            const newtoken = jwt.sign({ id: user2.userId, username:user.username }, 'secret_key')
            req.user = user2          
            next()
          })
        } else {        
          return res.status(403).json({ auth: false, message: 'Access token expired' })
        }
      } else {      
        req.user = user
        next()
      }
    })
  }else{
    next()
  }
}

app.use('/alunos', VerifyJWT, alunos_routes)
app.use('/cursos', VerifyJWT, cursos_routes)
app.use('/inscricao', VerifyJWT, inscricao_routes)

app.use('/login', authentication_routes)
app.use('/logout', authentication_routes)

conn.sync({ force: false }) 
  .then(() => {    
    console.log('sync OK')
    app.listen(3333,()=>{
      console.log('Server starting')
     })
  })
  .catch((error) => {    
    console.error('Error sync:', error)
  })



