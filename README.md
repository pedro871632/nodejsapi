# nodejsapi
Api feita para um app de cadastro de notas.
A API desenvolvida para o app de notas foi criada utilizando o Node.js e tem como objetivo fornecer funcionalidades de cadastro de usuários e criação de notas que serão salvas no banco de dados.

Para o cadastro de usuários, a API recebe um objeto JSON contendo as informações necessárias, como nome, e-mail e senha. Essas informações são validadas no servidor para garantir que sejam válidas e que não haja conflito com informações já existentes no banco de dados. Caso as informações sejam válidas, o usuário é cadastrado no banco de dados e um token de autenticação é gerado para que ele possa acessar as funcionalidades protegidas da API.

Para a criação de notas, a API recebe um objeto JSON contendo as informações da nota, como título, conteúdo e tags. Essas informações são validadas e, se forem válidas, a nota é salva no banco de dados associada ao usuário que a criou. As notas também podem ser consultadas, editadas e excluídas, desde que o usuário esteja autenticado e seja o proprietário da nota em questão.
