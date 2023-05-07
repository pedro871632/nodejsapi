const sqliteConnection = require("../database/sqlite")
const {hash,compare} = require("bcryptjs");
const appError = require("../utils/appError");


class usersController {
    async create(request,response){
        
        const {name,email,senha} = request.body;
        
        const database = await sqliteConnection();
        const checkUserExists = await database.get(`SELECT * FROM users WHERE email = (?)`,[email])
    
        if(checkUserExists){
            throw new appError("Este e-mail ja esta em uso")
        }

        const passwordCrypto = await hash(senha,8)
      
        await database.run("INSERT INTO users (name,email,password) VALUES(?, ?, ?)",[name,email, passwordCrypto])
        return response.status(201).json();
    
    }

    async update(request,response){
            const {name,email,password,oldpassword} = request.body;
            const {id} = request.params;

            const database = await sqliteConnection();
            const user = await database.get("SELECT * FROM users WHERE id = (?)",[id]);

            if(!user){
                throw new appError("usuario nao encontrado.")    
            }

            const emailVerify = await database.get("SELECT * FROM users WHERE email = (?)",[email]);
            if(emailVerify && emailVerify.id !== user.id){
                throw new appError("Este email ja esta em uso.")
            }

           
            if(password && !oldpassword){
                throw new appError("Precisa digitar a senha antiga.");
            }

            if (password && oldpassword){
                const checkOldPassword = await compare(oldpassword,user.password);
            
                if(!checkOldPassword){
                    throw new appError("A senha antiga nao confere.")
                }
                user.password = await hash(password,8)
            }

            user.name = name ?? user.name
            user.email = email ?? user.email
            
            

            await database.run(`UPDATE users SET
                name = ?,
                email = ?,
                password = ?,
                updated_at = DATETIME("now")

                WHERE id = ?;
                `,[user.name,user.email,user.password,user.id]);

            return response.status(201).json({})
        }

    async delete(request,response){
        const {id} = request.params;

        database = await sqliteConnection();

        database.run("DELETE FROM users WHERE id = (?)",[id]);

        response.status(200).json({
            message : "user deleted",
            status: "201"
        });
    }
}




module.exports = usersController

