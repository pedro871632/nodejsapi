class  SessionsController {
    async create(request,response){
        const {email,senha} = request.body;
        
        console.log(email,senha)
        response.json({email,senha});
    }
    


}


module.exports = SessionsController;