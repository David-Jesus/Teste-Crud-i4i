const Router   = require("express");
const router   = Router();
const client = require("./database/client");


/**
 * return all pessoa
 */
 router.get('/pessoas', async function(req, res){
    const pessoas = await client.pessoa.findMany();
    
    if(pessoas == "") {
        res.status(404).json({"mesage": "Não há resgistros"});
    } 
    else {
      res.status(200).json("teste");  
    }
});

/**
 * return a pessoa by id
 */
router.get('/pessoa/:id', async function (req, res){
    const { id } = req.params;
    const pessoa = await client.pessoa.findUnique({
        where: {id: Number(id)}
    })

    console.log(pessoa); // remover

    if(!pessoa) {
        res.status(404).json({"mesage": "Não há resgistros"});
    } 
    else {
      res.status(200).json("teste");  
    }
});

/**
 * delete a pessoa by id
 */
router.delete('/pessoa/:id', async function (req, res) {
    deletePessoa(req.params.id);
    return res.json([{mesage: "Registro excluído com sucesso"}]);
});

/**
 * insert a pessoa
 */
router.put('/pessoa', async function (req, res) {
    const {nome, telefone, data_nascimento, cargo } = req.body;

    return res.json({});
    const newPessoa = await client.pessoa.create({
        data: {
            nome,
            telefone,
            data_nascimento,
            cargo
            },
        });
    
    
    if (newPessoa != "") {
        console.log(newPessoa)
        return res.status(200).json(newPessoa);
    }
    else {
        console.log('erro')
        return res.status(401).json({});
    }
});

/**
 * router
 */
module.exports = router;