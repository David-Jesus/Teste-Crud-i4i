const Router   = require("express");
const router   = Router();
const client = require("../database/client");


/**
 * return all people
 */
 router.get('/pessoas', async function(req, res){
    const pessoas = await client.pessoa.findMany();
    
    if(pessoas == "") {
      return res.status(404).json({"mesage": "Não há resgistros"});
    } 
    else {
      return res.status(200).json(pessoas);  
    }
});

/**
 * return a person by id
 */
router.get('/pessoa/:id', async function (req, res){
    const { id } = req.params;
    const pessoa = await client.pessoa.findUnique({
        where: {id: Number(id)}
    })

    if(!pessoa) {
      return res.status(404).json({"mesage": "Nenhum registro encontrado."});
    } 
    else {
      return res.status(200).json(pessoa);  
    }
});

/**
 * delete a person by id
 */
router.delete('/pessoa/:id', async function (req, res) {
    const { id } = req.params;
    const verify_id = await client.pessoa.findUnique({
        where: {id: Number(id)}
    })

    if(!verify_id) {
        res.status(404).json({"mesage": "Não foi possivel excluir o registro"});
    } 
    else {
    const result = await client.pessoa.delete({
        where: {id: Number(id)}
      })
         res.status(200).json({"mesage": "Registro excluido com sucesso!"});  
    }
});

/**
 * insert a person
 */
router.post('/pessoa', async function (req, res) {
    const {nome, telefone, cargo, idade } = req.body;

    const newPessoa = await client.pessoa.create({
        data: {
            nome,
            telefone,
            cargo,
            idade
            },
        });
    
    if (newPessoa != "") {
        return res.status(200).json(newPessoa);
    }
    else {
        console.log('erro')
        return res.status(401).json({});
    }
});

/**
 * Alter a person
 */
router.put('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const {nome, telefone, cargo, idade } = req.body;
    
    const verify_id = await client.pessoa.findUnique({
        where: {id: Number(id)}
    })

    if(!verify_id) {
        return res.status(404).json({"message": "Cadastro não localizado"});
    }
    else {
        const result = await client.pessoa.update({
            where: {
                id: Number(id)
             },
            data: {
                nome,
                telefone,
                cargo,
                idade
            }
        })
        return res.status(200).json({result})
    }

}) 

/**
 * router
 */
module.exports = router;