# teste-pratico-backend-BeTalent
Teste prático para a vaga backend na BeTalent.

O teste consiste em estruturar uma API RESTful conectada a um banco de dados e a duas APIs de terceiros.

Trata-se de um sistema gerenciador de pagamentos multi-gateway. Ao realizar uma compra, deve-se tentar realizar a cobrança junto aos gateways, seguindo a ordem de prioridade definida. Caso o primeiro gateway resulte em erro, deve-se fazer a tentativa no segundo gateway. Se algum gateway retornar sucesso, não deve ser informado erro no retorno da API.

Deve ser levada em consideração a facilidade de adicionar novos gateways de forma simples e modular na API, no futuro.

### Nível 1 de implementação
- Valor da compra vem direto pela API
- Gateways sem autenticação

## To-Do List

### Implementação do Banco de dados
- [ ] Model e Migration de users
- [ ] Model e Migration de clients
- [ ] Model e Migration de products
- [ ] Model e Migration de gateways
- [ ] Model e Migration de transactions
- [ ] Model e Migration de transaction_products

### Implementação do gateway 1
- [ ]  Rota POST /login
- [ ]  Rota GET /transactions
- [ ]  Rota POST /transactions
- [ ]  Rota POST /transactions/:id/charge_back

### Implementação do gateway 2
- [ ]  Rota GET /transacoes
- [ ]  Rota POST /transacoes
- [ ]  Rota POST /transacoes/reembolso
