const knex = require("../database/knex")
const AppError = require("../utils/appError")
const {compare} = require("bcryptjs")

const authConfig = require("../config/auth")
const {sign} = require("jsonwebtoken");


class  SessionsController {
    async create(request , response){
        const {email,password} = request.body
        
        const user = await knex("users").where({email}).first();

        if (!user){
            throw new AppError("Email ou senha incorreto.",401)
        }
        
        const verifyPassword = await compare(password,user.password);
        
        console.log(verifyPassword);
        
        if(!verifyPassword){
            throw new AppError("Email ou senha incorreto",401)
        }

        const {secret,expiresIn} = authConfig.jwt    

        const token = sign({},secret,{subject:String(user.id),expiresIn})
       
        response.json({user,
                        token});
    }

    // O JSON VAI SER CODIFICADO(MUDAR A FORMA QUE ELE E VISUALIZADO), OU SEJA VAI SER REPRESENTADO DE OUTRA FORMA, SENDO ELA A CODIFICACAO BASE64, QUE E UMA FORMA DIFERENTE DE 
    // REPRESENTAR UM DADO OU ESTRUTURA DE DADOS.
    


}


module.exports   = SessionsController;