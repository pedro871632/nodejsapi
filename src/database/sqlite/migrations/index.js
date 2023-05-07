const sqliteConnection = require("../../sqlite")
const createUsers = require("./createUsers")

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join("");

    sqliteConnection().then(db => db.exec(schemas))
}


module.exports  = migrationsRun;





// metodo exec e usado para retornar varias registros na consulta, ja  o metodo get retorna um unico registro da consulta.
// metodo exec usado para executar comandos sql que retornar dados, ja o metodo run e 
// usado para executar comandos sql que nao retornam dados
