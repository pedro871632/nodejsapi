const knex = require("../database/knex");
class notesController{
    async create(request,response){
        
        const { title,description,tags,links } = request.body;
        let user_id = request.user.id;
     
        
        const note_id =  await knex("notes").insert({
            title,
            description,
            user_id
        });   
            
            
            
        const linkInsert = links.map(link => {
            return {
                note_id:note_id[0],
                url: link
                }
            });
        
        await knex("links").insert(linkInsert);
            
        const tagInsert = tags.map(name => {
            return {
                    note_id: note_id[0],
                    name,
                    user_id
                }
            });
            
        await knex("tags").insert(tagInsert);
            response.json();   

    }


    async show(request,response){
        const {id} = request.params;

        const note = await knex("notes").where({id}).first();
        const tags = await knex("tags").where({note_id:id});
        const links = await knex("links").where({note_id:id});

        console.log(tags,links)
        response.json({
            ...note,
            tags,
            links
        }
        )

    }

    async delete(request,response){
        const {id} = request.params;

        await knex("notes").where({id}).delete();
        console.log(knex("notes").where({id}))
        return response.json();
    }

    async index(request,response){
       
        const user_id = request.user.id;
        const {title,tags} =    request.query;
        
        let notes;
        if (tags){
            const filterTags = tags.split(",").map( tag => tag.trim());
          
            notes = await knex("tags").select(["notes.id","notes.title","notes.user_id"]).where("notes.user_id",user_id).whereLike("notes.title",`%${title}%`)
            .whereIn("name",filterTags)
            .innerJoin("notes","notes.id","tags.note_id").orderBy("notes.title");

            // metodo whereIn recebe no primeiro parametro um valor de uma campo da tabela(coluna), e recebe no segundo parametro um array,
            // ele verifica se em cada posicao do array, temos um registro com esse valor que se encontra no array.

        }
        
        else {
            notes = await knex("notes").where({user_id}).whereLike("title",`%${title}%`).orderBy("title");
        }

        
        // whereLike permite vc consultar se na tabela possui em algum registro, um valor que usuario quer, independente da ordem em que ele aparece;

        const userTags = await knex("tags").where({user_id});
        const notesWithTags = notes.map(note => {
           let noteTags = userTags.filter(tag => tag.note_id ===  note.id);
        
            return {
                ...note,
                tags: noteTags
            }
        })
        
        return response.json(
            notesWithTags
        );
    }
}

module.exports = notesController