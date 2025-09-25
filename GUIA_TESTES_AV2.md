# API Marketplace Enxuto - AV2 - Guia de Testes

## 🚀 Como Testar no Insomnia

### ✅ Checklist de Entrega

- [x] Schema atualizado e aplicado no AlwaysData via db push
- [x] Criar Store vinculada a um User (1-1 funcionando)
- [x] Criar Products vinculados a uma Store (1-N funcionando)
- [x] CRUD completo implementado:
  - [x] POST e GET (exemplificados)
  - [x] PUT e DELETE (obrigatórios incluídos)
- [x] GET /stores/:id retorna dono (User) e produtos da loja
- [x] GET /products retorna loja e dono da loja
- [x] Código organizado, com tratamento básico de erros

## 📋 Sequência de Testes Recomendada

### 1. Criar Usuários
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "joao@email.com",
  "name": "João Silva"
}
```

```
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "maria@email.com", 
  "name": "Maria Santos"
}
```

### 2. Listar Usuários
```
GET http://localhost:3000/users
```

### 3. Criar Lojas (1-1 com User)
```
POST http://localhost:3000/stores
Content-Type: application/json

{
  "name": "TechStore",
  "userId": 1
}
```

```
POST http://localhost:3000/stores
Content-Type: application/json

{
  "name": "Fashion Store",
  "userId": 2
}
```

### 4. Buscar Loja com Include (User + Products)
```
GET http://localhost:3000/stores/1
```

### 5. Listar Todas as Lojas
```
GET http://localhost:3000/stores
```

### 6. Criar Produtos (1-N com Store)
```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Smartphone Samsung",
  "price": 1299.99,
  "storeId": 1
}
```

```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Notebook Dell",
  "price": 2499.99,
  "storeId": 1
}
```

```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Vestido Casual",
  "price": 89.99,
  "storeId": 2
}
```

### 7. Listar Produtos com Include (Store + User)
```
GET http://localhost:3000/products
```

### 8. Buscar Produto Específico
```
GET http://localhost:3000/products/1
```

### 9. Atualizar Loja (PUT)
```
PUT http://localhost:3000/stores/1
Content-Type: application/json

{
  "name": "TechStore Premium"
}
```

### 10. Atualizar Produto (PUT)
```
PUT http://localhost:3000/products/1
Content-Type: application/json

{
  "name": "Smartphone Samsung Galaxy S24",
  "price": 1399.99
}
```

### 11. Deletar Produto (DELETE)
```
DELETE http://localhost:3000/products/3
```

### 12. Deletar Loja (DELETE)
```
DELETE http://localhost:3000/stores/2
```

## 🎯 Pontos de Validação para Apresentação

### ✅ Relacionamento 1-1 (User → Store)
- Cada usuário pode ter apenas uma loja
- Quando consultar `/stores/1`, deve retornar o dono (user)

### ✅ Relacionamento 1-N (Store → Product)  
- Uma loja pode ter vários produtos
- Quando consultar `/stores/1`, deve retornar todos os produtos
- Quando consultar `/products`, deve retornar a loja e o dono de cada produto

### ✅ CRUD Completo
- **CREATE**: POST para users, stores e products
- **READ**: GET para listar e buscar por ID
- **UPDATE**: PUT para stores e products
- **DELETE**: DELETE para stores e products

### ✅ Include Funcionando
- `GET /stores/:id` → retorna user + products
- `GET /products` → retorna store + user
- `GET /products/:id` → retorna store + user

## 🔍 Critérios de Avaliação

- **Modelagem & Schema (2,0)**: ✅ Store (1-1 com User) e Product (1-N com Store) funcionando; db push aplicado
- **CRUD (4,0)**: ✅ Criação, listagem, atualização (PUT) e exclusão (DELETE) de lojas e produtos
- **Consultas com include (1,5)**: ✅ Retorno de dados relacionados (store + user, products + store + user)
- **Organização & Boas práticas (1,5)**: ✅ Código limpo, nomes claros, erros tratados
- **Apresentação Individual (1,0)**: ✅ Explicação rápida do código

## 🚀 Para a Apresentação

1. **Mostrar healthcheck**: `GET /` 
2. **Criar usuários**: POST `/users`
3. **Criar lojas**: POST `/stores` (demonstrar relacionamento 1-1)
4. **Criar produtos**: POST `/products` (demonstrar relacionamento 1-N)
5. **Mostrar includes**: 
   - `GET /stores/1` (user + products)
   - `GET /products` (store + user)
6. **Demonstrar PUT**: Atualizar loja e produto
7. **Demonstrar DELETE**: Deletar produto e loja
8. **Explicar relacionamentos** no código