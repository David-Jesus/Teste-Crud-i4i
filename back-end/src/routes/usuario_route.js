const Router = require("express");
const router = Router();
const client = require("../database/client");
const jwt    = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authConfig =  require("../config/auth.json");


/**
 * Verify Token
 */
function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        if(err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    })
}

/**
 * return all users
 */
 router.get('/usuarios', verifyJWT, async function(req, res){
    const usuarios = await client.usuario.findMany();
    
    if(usuarios == "") {
      return res.status(404).json({"mesage": "Não há resgistros"});
    } 
    else {
      return res.status(200).json(usuarios);  
    }
});

/**
 * return a user by id
 */
router.get('/usuario/:id', verifyJWT, async function (req, res){
    const { id } = req.params;
    const usuario = await client.usuario.findUnique({
        where: {id: Number(id)}
    })

    if(!usuario) {
      return res.status(404).json({"mesage": "Nenhum registro encontrado."});
    } 
    else {
      return res.status(200).json(usuario);  
    }
});


/**
 * insert a user
 */
router.post('/usuario', verifyJWT, async function (req, res) {
    const { id_pessoa, email} = req.body;
    const senha = bcrypt.hashSync(req.body.senha, 10);

    const verify_id = await client.pessoa.findUnique({
        where: {id: Number(id_pessoa)}
    })

    if(!verify_id) {
       return res.status(404).json({"mesage": "Não foi possivel cadastrar, não possui cadastro de pessoa!"});
    } 

    const verify_email = await client.usuario.findUnique({
        where: {email: String(email)}
    })

    if (verify_email) {
        return res.status(200).json({"mesage": "Usuário já possui cadastro com este e-mail!"})
    }
    else{
    const newUser = await client.usuario.create({
        data: {
            id_pessoa,
            email,
            senha
            },
        });

    if (newUser != "") {
        console.log(newUser)
        return res.status(200).json(newUser);
    }
    else {
        return res.status(401).json({"mesage": "Erro ao cadastrar"});
    }
}
});


/**
 * Verify login
 */
router.post('/login', async function(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    const verify_login = await client.usuario.findUnique({
        where: {
            email: String(email),
        }
    })

    if(!verify_login) {
        return res.status(401).json({"mesage": "Usuário não possui cadastro"});
    } 
    else {

        if(!bcrypt.compareSync(senha, verify_login.senha)){
            return res.status(401).json({"mesage": "Email ou senha incorretos!"});
        }
        else {
            const token = jwt.sign({id: verify_login.id}, authConfig.secret, {
                expiresIn: 15,
            })
            return res.json({auth: true, token: token});
        }
    }
});


/**
 * delete a user by id
 */
 router.delete('/usuario/:id', verifyJWT, async function (req, res) {
    const { id } = req.params;
    const verify_id = await client.usuario.findUnique({
        where: {id: Number(id)}
    })

    if(!verify_id) {
        res.status(404).json({"mesage": "Não foi possivel excluir o registro"});
    } 
    else {
    const result = await client.usuario.delete({
        where: {id: Number(id)}
      })
         res.status(200).json({"mesage": "Registro excluido com sucesso!"});  
    }
});

/**
 * Alter a user
 */
router.put('/usuario/:id', verifyJWT, async (req, res) => {
    const { id } = req.params;
    const {id_pessoa, email} = req.body;
    const senha = bcrypt.hashSync(req.body.senha, 10);

    const verify_id = await client.usuario.findUnique({
        where: {id: Number(id)}
    })

    if(!verify_id) {
        return res.status(404).json({"mesage": "Cadastro não localizado!"});
    }
    else {
        const result = await client.usuario.update({
            where: {
                id: Number(id)
             },
            data: {
                id_pessoa,
                email,
                senha
            }
        })
        return res.status(200).json({result})
    }
}) 

/**
 * router
 */
module.exports = app => app.use(router);