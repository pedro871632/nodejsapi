const knex = require("../database/knex");


class tagsController {

    async index(request,response){
        
        console.log("sdasd")

        const user_id = request.user.id;
        console.log(user_id);

        const tags = await knex("tags").where({user_id}).groupBy("name");
        console.log("sdasd")
        return response.json(tags);
    }


}

module.exports = tagsController;