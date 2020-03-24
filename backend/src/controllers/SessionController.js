

// index = criando método que irá retornar uma listagem de sessões
// show = listar uma unica sessão
// store = criar uma sessão
// update = alterar uma sessão
// destroy = deletar uma sessão

const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { email } = req.body;

        let user = await User.findOne({ email });

        if(!user){
            user = await User.create({email});
        }


        return res.json(user);
    }
};