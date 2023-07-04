# Projeto ClockIn - Back-end Node.JS com SQL

## Sobre
API desenvolvida por [Brenno Fernandes](https://github.com/tecbrenno) para a disciplina Back-end Node.JS com SQL.

## Pré-Requsitos
    - Postman
    - MariaDB

## Utilização
Instale o mariaDB, instale as dependências do projeto e em seguida utilize o arquivo de [rotas do postman]https://github.com/brenno-infnet/backend_nodejs_sql/blob/master/rotas_postaman/projeto_node_sql.postman_collection.json)

# Nome do schema: dbfilantropia


## Descrição das Rotas

1. Cadastro do aluno

* **[Post]** alunos/ -> Permitir qualquer pessoa que tenha interesse em participar do programa de capacitação através do seu cadastro

Obs.:   O cadastro de alunos deverá salvar os dados do cadastro em banco relacional.

2. Autenticação

* **[Post]** login/ Permitir ao usuário realizar o login com seu usuário e senha

Obs.:   Ao logar, as informações deverão ser consumidas da base de dados.


3. Cursos

* **[Get]** cursos/ Permitir ao usuário logado exibir todos os cursos disponíveis (Necessário passar o token no body)

Obs.:   Os cursos ser consumidos da base de dados da tabela de cursos;
        Apenas cursos disponíveis que não foram iniciados ainda deverão ser apresentados; 
        Nesta consulta o serviço deverá devolver informação da quantidade de alunos inscritos.

3. Realizar Inscrição

* **[Post]** inscricao/ Permitir ao usuário logado realizar uma inscrição no curso selecionado.

Obs.:   Validar se aluno já está inscrito no curso; 
        Criar inscrição na tabela de inscrição.

4. Cancelar Inscrição

* **[Put]** inscricao/ Permitir ao usuário logado realizar uma inscrição no curso selecionado.

Obs.:   A exclusão deve lógica o registro deve continuar na tabela porém com uma coluna de data de cancelamento.

