const knex = require("../database/knex");
const appError = require("../utils/appError");
const DiskStorage = require("../providers/diskStorage");





class userAvatarController {

    async update(request,response){
        const user_id = request.user.id;
        const avatarFilename = request.file.filename;
        const diskStorage= new DiskStorage();

        const user = await knex("users").where({id:user_id}).first();

        if(!user){
            throw new appError("Somente usuarios autenticados podem mudar a foto.",401);

        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar);
        }

        
        const filename = await diskStorage.saveFile(avatarFilename);

        user.avatar = filename;

        await  knex("users").update(user).where({id:user_id});

        console.log(user)

        return response.json(user)
    }



}


module.exports = userAvatarController;