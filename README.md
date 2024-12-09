# API FamilyStore
# A fazer na API

----------------------------------------------------------------
### Fluxo produtos

- [ ] Receber ID do produto
- [ ] Verificar se a moedas suficiente
    - [ ] Se tiver
        - [ ] Remover produto da lista 
        - [ ] Notificar para os pais sopre a compra
        - [ ] Remover moedas do filho
    - [ ] Se não tiver 
        - [ ] Notificar o filho da compra recusado 

> [!NOTE]
>  Para a criação dos produtos existem duas possibilidade.
>  - Os produtos está ligado aos usuario porem iremos precisar criar a funcionalidade de upload de arquivo  ou utiliza serviços de terceiros.
>  - Os produtos ser criado pelo ADM isso pode ser melhor pelo fato que as imagen utilizadas  podem ser otimizadas .

### Carteira
 
<br/>

- [ ] Criar desconto nos produtos dependendo do nivel do filho

## Rotas de mãe 
| Rotas             | Metudo | Auteticação     | Description                  |
| ----------------- | ------ | --------------- | ---------------------------- |
| /user/signup      | POST   | Não             | Criar   conta dos pais.      | 
| /user/signin      | POST   | Não             | Login   conta dos pais.      | 
| /user/editProfile | PUT    | Sim token pais  | Editar  conta dos pais.      | 
| /user             | GET    | Sim token pais  | Buscar  conta dos pais.      |     

### Rotas de filhos 
| Rotas             | Metudo | Auteticação     | Description                  |
| ----------------- | ------ | --------------- | ---------------------------- |
| /children/signup  | POST   | Sim token pais  | Criar   conta  dos filho .   |
| /children/signin  | POST   | Não             | login   conta  dos filho .   | 
| /children         | PUT    | Sim token filho | Editar  conta  dos filho .   | 
| /childrenList     | GET    | Sim token pais  | Buscar  contas dos filhos.   | 
| /children/:id     | DELETE | Sim token pais  | Deletar conta  dos filho .   | 


### Rotas das tarefas
| Rotas             | Metudo | Auteticação     | Description                  | 
| ----------------- | ------ | --------------- | ---------------------------- | 
| /task             | POST   | Sim token pais  | Criar   tarefa  dos filho.   |
| /task/:taskId     | PUT    | Sim token pais  | Editar  tarefa  dos filho.   |
| /task/:childId    | GET    | Sim token filho | Buscar  tarefas dos filho.   |
| /task/status      | PUT    | Sim token pais  | Editar  status da tarefas.   |


### Rotas de Análise 
| Rotas                  | Metudo | Auteticação     | Description                  |
| ---------------------- | ------ | --------------- | ---------------------------- |
| /confirmedTask         | POST   | Não             | Finalisar tarefa  dos filho. | 
| /redoTask              | POST   | Não             | Refazer   tarefa  dos filho. | 
| /taskAnalysis/         | GET    | Sim token pais  | Buscar    tarefa  dos filho. | 
| /taskAnalysis/list/:id | GET    | Sim token pais  | Buscar    tarefas do  filho. |   
