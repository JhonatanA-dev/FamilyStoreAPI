# API FamilyStore

Esta é a documentação de requisitos para a API de loja para faminha. Esta API permite aos usuários gerenciar 

## Funcionalidade
 

## Requisitos Funcionais

- [] text

## Requisitos de Autenticação e Autorização

- [X] Autenticação de Usuários
- [X] Autorização de Acesso às Operações
- [X] Criação de usuário


## Regras de Negócios

- text
## Rotas da API
|   Rotas         | Metudo | Description                    |
| ----------      | ------ | ------------------------------ |
| /user           | POST   | Criar   conta dos pais.        | 
| /user/:userID   | PUT    | Editar  conta dos pais.        | 
| /user/:userID   | GET    | Buscar  conta dos pais.        | 
| /child          | POST   | Criar   conta dos filho.       | 
| /child/:childId | PUT    | Editar  conta dos filho.       | 
| /child/:userID  | GET    | Buscar  conta dos filho.       | 
| /child/:childId | DELETE | Deletar conta dos filho.       | 
| /task           | POST   | Criar   tarefas para os filho. |
| /task/:taskId   | PUT    | Editar  tarefas para os filho. |
| /task/:childId  | GET    | Buscar  tarefas para os filho. |
| /task/:taskId   | DELETE | Deletar tarefas para os filho. |

- text
## Rotas da API
|   Rotas         | Metudo | Description                    |
| ----------      | ------ | ------------------------------ | 
| /task           | POST   | Criar   tarefas para os filho. |
| /task/:taskId   | PUT    | Editar  tarefas para os filho. |
| /task/:childId  | GET    | Buscar  tarefas para os filho. |
| /task/:taskId   | DELETE | Deletar tarefas para os filho. |

## Tarefas
verificar se a data limite que esta sendo registrada no banco esta sendo registrada corretamente
formato = 12:00-02/09/2023
correto = 23:59-02/09/23 incorreto = 00:00-02/09/2023

verificar se o usuario vai subir de livel
atualisar o nivel  xp do usuario 