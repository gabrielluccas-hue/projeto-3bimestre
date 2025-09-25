# Exemplos de Teste para a API

## 🚀 Como Testar no Insomnia

### 1. Criar um Usuário
```
POST http://localhost:3000/usuarios
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456",
  "phone": "(11) 99999-9999"
}
```

### 2. Listar Usuários
```
GET http://localhost:3000/usuarios
```

### 3. Buscar Usuário por ID
```
GET http://localhost:3000/usuarios/1
```

### 4. Criar uma Loja (após criar usuário)
```
POST http://localhost:3000/lojas
Content-Type: application/json

{
  "name": "TechStore",
  "description": "Loja de tecnologia e eletrônicos",
  "address": "Rua das Flores, 123 - Centro",
  "phone": "(11) 88888-8888",
  "email": "contato@techstore.com",
  "userId": 1
}
```

### 5. Listar Lojas
```
GET http://localhost:3000/lojas
```

### 6. Criar um Produto (após criar loja)
```
POST http://localhost:3000/produtos
Content-Type: application/json

{
  "name": "Smartphone Samsung Galaxy S23",
  "description": "Celular top de linha com 256GB",
  "price": 2499.99,
  "category": "Eletrônicos",
  "inStock": true,
  "quantity": 15,
  "storeId": 1
}
```

### 7. Listar Produtos
```
GET http://localhost:3000/produtos
```

### 8. Atualizar um Produto
```
PUT http://localhost:3000/produtos/1
Content-Type: application/json

{
  "name": "Smartphone Samsung Galaxy S23 Ultra",
  "price": 2899.99,
  "quantity": 12
}
```

### 9. Deletar um Produto
```
DELETE http://localhost:3000/produtos/1
```

## 📊 Sequência de Testes Recomendada

1. **Testar Healthcheck**: `GET /`
2. **Criar 2-3 usuários** diferentes
3. **Criar lojas** para cada usuário
4. **Criar produtos** para as lojas
5. **Testar consultas com include**: 
   - `GET /usuarios/1` (mostra loja e produtos)
   - `GET /lojas/1` (mostra usuário e produtos)
   - `GET /produtos/1` (mostra loja e usuário)
6. **Testar atualizações** (PUT)
7. **Testar deleções** (DELETE)

## ✅ Pontos de Validação

- [ ] **Relacionamento 1-1**: Usuário só pode ter 1 loja
- [ ] **Relacionamento 1-N**: Loja pode ter vários produtos
- [ ] **Include funcionando**: Dados relacionados aparecem nas consultas
- [ ] **Validações**: Campos obrigatórios são verificados
- [ ] **Errors**: Retorna erros apropriados (404, 409, 400, 500)
- [ ] **CRUD completo**: Create, Read, Update, Delete para todas as tabelas

## 🎯 Para a Apresentação

1. **Abrir o Insomnia**
2. **Mostrar o banco vazio** (GET em todas as rotas)
3. **Criar dados em sequência** (usuário → loja → produto)
4. **Demonstrar os includes** funcionando
5. **Mostrar validações** (tentar criar usuário com email duplicado)
6. **Testar updates e deletes**
7. **Explicar o código** e relacionamentos