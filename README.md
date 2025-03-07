# teste-pratico-backend-BeTalent
Teste prático para a vaga backend na BeTalent.

O teste consiste em estruturar uma API RESTful conectada a um banco de dados e a duas APIs de terceiros.

Trata-se de um sistema gerenciador de pagamentos multi-gateway. Ao realizar uma compra, deve-se tentar realizar a cobrança junto aos gateways, seguindo a ordem de prioridade definida. Caso o primeiro gateway resulte em erro, deve-se fazer a tentativa no segundo gateway. Se algum gateway retornar sucesso, não deve ser informado erro no retorno da API.

Deve ser levada em consideração a facilidade de adicionar novos gateways de forma simples e modular na API, no futuro.

### Nível 1 de implementação (com roles)
- Valor da compra vem direto pela API
- Gateways sem autenticação
- roles
  - ADMIN - Faz tudo
  - MANAGER - pode gerenciar produtos e usuários
  - FINANCE - pode gerenciar produtos e realizar reembolso
  - USER - pode o resto que não foi citado
## To-Do List

### Integração entre gateways 
- [ ] Redirecionamento em caso de inatividade

### Implementação do Banco de dados
- [x] Model e Migration de users
- [x] Model e Migration de clients
- [x] Model e Migration de products
- [x] Model e Migration de gateways
- [x] Model e Migration de transactions
- [x] Model e Migration de transaction_products

### Implementação do gateway 1
- [x]  CRUD de Users
- [x]  CRUD de Products
- [x]  Rota POST /login
- [x]  Autenticação de rotas
- [x]  Autorização de rotas
- [ ]  Rota GET /transactions
- [ ]  Rota POST /transactions
- [ ]  Rota POST /transactions/:id/charge_back
- [x]  Validação de dados
- [x]  Seeds de usuários com roles  
- [x]  Dockerização da aplicação
### Implementação do gateway 2
- [ ]  CRUD de Users
- [ ]  Rota GET /transacoes
- [ ]  Rota POST /transacoes
- [ ]  Rota POST /transacoes/reembolso
