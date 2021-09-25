const Router   = require("express");
const router   = Router();
const client = require("../src/database/client");
const { encrypt, decrypt} = require("../routes/crypto/crypto");


/**
 * return all users
 */
 router.get('/usuarios', async function(req, res){
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
router.get('/usuario/:id', async function (req, res){
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
 * delete a user by id
 */
router.delete('/usuario/:id', async function (req, res) {
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
 * insert a user
 */
router.post('/usuario', async function (req, res) {
    const { id_pessoa, email} = req.body;
    const senha = encrypt(req.body.senha);

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

router.post('/login', async function(req, res) {
    const email = req.body.email;
    const senha = encrypt(req.body.senha);

    const verify_login = await client.usuario.findUnique({
        where: {
            email: String(email),
        }
    })

    if(!verify_login) {
        return res.status(404).json({"mesage": "Usuário não possui cadastro"});
    } 
    else {
  
        if(verify_login.senha == senha){
            return res.status(200).json({"mesage": "teste ok"});
        }
        else {
            return res.status(404).json({"mesage": "Email ou senha incorretos!"})
        }
    }
});


/**
 * router
 */
module.exports = router;